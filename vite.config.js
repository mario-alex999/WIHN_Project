import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const membershipRoles = new Set(['Student', 'Professional', 'Executive', 'Entrepreneur']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function validatePayload(payload) {
  const errors = {};

  if (!payload.name) {
    errors.name = 'Name is required.';
  } else if (payload.name.length < 2) {
    errors.name = 'Enter at least 2 characters for name.';
  } else if (payload.name.length > 80) {
    errors.name = 'Name should be 80 characters or fewer.';
  }

  if (!payload.email) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(payload.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!payload.role) {
    errors.role = 'Please choose your role.';
  } else if (!membershipRoles.has(payload.role)) {
    errors.role = 'Please select a valid membership tier.';
  }

  if (!payload.location) {
    errors.location = 'Location is required.';
  } else if (payload.location.length < 2) {
    errors.location = 'Enter at least 2 characters for location.';
  } else if (payload.location.length > 120) {
    errors.location = 'Location should be 120 characters or fewer.';
  }

  return errors;
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Request body is too large.'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('Invalid JSON payload.'));
      }
    });
    req.on('error', reject);
  });
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'wihn-membership-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const pathname = req.url ? req.url.split('?')[0] : '';

          if (pathname !== '/api/membership') {
            next();
            return;
          }

          if (req.method !== 'POST') {
            sendJson(res, 405, { message: 'Method not allowed.' });
            return;
          }

          try {
            const body = await readJsonBody(req);
            const payload = {
              name: typeof body.name === 'string' ? body.name.trim() : '',
              email: typeof body.email === 'string' ? body.email.trim() : '',
              role: typeof body.role === 'string' ? body.role.trim() : '',
              location: typeof body.location === 'string' ? body.location.trim() : ''
            };

            const errors = validatePayload(payload);
            if (Object.keys(errors).length > 0) {
              sendJson(res, 400, {
                message: 'Please fix the highlighted fields and try again.',
                errors
              });
              return;
            }

            const submission = {
              ...payload,
              submittedAt: new Date().toISOString()
            };

            const outputPath = join(server.config.root, 'data', 'membership-submissions.jsonl');
            await mkdir(dirname(outputPath), { recursive: true });
            await appendFile(outputPath, `${JSON.stringify(submission)}\n`, 'utf8');

            sendJson(res, 201, {
              message: 'Membership submission received.',
              submission
            });
          } catch (error) {
            sendJson(res, 400, {
              message: error instanceof Error ? error.message : 'Unable to process request.'
            });
          }
        });
      }
    }
  ]
});
