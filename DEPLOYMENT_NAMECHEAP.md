# Deploy WIHN to Namecheap (`wihninitiative.live`)

## Upload Package
1. Log in to Namecheap cPanel for the hosting account attached to `wihninitiative.live`.
2. Open `File Manager`.
3. Go to `public_html/` (or the document root configured for `wihninitiative.live`).
4. Remove old site files in that root (keep backups if needed).
5. Upload `/home/mario/WIHN/wihninitiative-live-deploy.zip`.
6. Extract the ZIP in the same root so these paths exist:
   - `index.html`
   - `.htaccess`
   - `assets/*`
   - `api/membership.php`

## DNS Check
1. In Namecheap Domain List, open `wihninitiative.live`.
2. Ensure the domain points to the same hosting account (Nameservers or A record as configured by your plan).

## Post-Deploy Smoke Test
1. Open:
   - `/`
   - `/about`
   - `/programs`
   - `/membership`
   - `/contact`
2. Submit Membership form once and confirm API response is successful.
3. Confirm server writes submissions to `public_html/data/membership-submissions.jsonl`.

## Notes
- `.htaccess` includes SPA fallback and API rewrite for `/api/membership`.
- If file writes fail on submit, set permissions:
  - `public_html/data` to writable by PHP runtime (typical `775` on shared hosting).

