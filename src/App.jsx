import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const sitePages = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Membership', path: '/membership' },
  { label: 'Events & Initiatives', path: '/events-initiatives' },
  { label: 'Partnerships and Sponsorships', path: '/partnerships-sponsorships' },
  { label: 'Media & Stories', path: '/media-stories' },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
  { label: 'Join', path: '/join' }
];

const highlights = [
  {
    title: 'Nationwide Network',
    text: 'A dynamic community of women across Nigerian hospitality and tourism ecosystems.'
  },
  {
    title: 'Leadership Development',
    text: 'Practical pathways that prepare women for executive, managerial, and board-level roles.'
  },
  {
    title: 'Strategic Partnerships',
    text: 'Collaboration with institutions, employers, and sponsors for measurable gender inclusion.'
  },
  {
    title: 'Career Growth',
    text: 'Mentorship, industry access, and visibility that accelerate sustainable career advancement.'
  }
];

const sectors = [
  'Hotels',
  'Restaurants',
  'Tourism',
  'Event Management',
  'Service Operations',
  'Hospitality Entrepreneurship'
];

const programs = [
  {
    title: 'Mentorship Program',
    text: 'Connecting emerging professionals with experienced leaders for focused growth.'
  },
  {
    title: 'Leadership Development',
    text: 'Building confident and capable women ready to lead high-performing teams.'
  },
  {
    title: 'Training & Capacity Building',
    text: 'Workshops and seminars designed for professional excellence in modern hospitality.'
  },
  {
    title: 'Networking & Engagement',
    text: 'Meaningful peer and stakeholder relationships that open doors to opportunity.'
  }
];

const eventTypes = ['Networking Events', 'Workshops', 'Panel Discussions', 'Industry Meetups'];

const partnerships = [
  {
    title: 'Program Sponsorship',
    text: 'Support mentorship and leadership pathways that strengthen women in hospitality.'
  },
  {
    title: 'Event Sponsorship',
    text: 'Increase visibility while investing in high-impact WIHN initiatives nationwide.'
  },
  {
    title: 'Training Collaborations',
    text: 'Co-create practical skill-building sessions for emerging and established professionals.'
  }
];

const mediaStories = [
  'Member spotlights featuring women transforming hospitality leadership.',
  'Articles and industry insights focused on inclusion and professional excellence.',
  'News updates and WIHN announcements for members, partners, and stakeholders.'
];

const leadershipTeams = ['Founder', 'Core Team', 'Advisory Board', 'Regional Leads'];

const galleryCategories = ['Events', 'Trainings', 'Networking Sessions'];

const challenges = [
  'Persistent gender bias in hiring and promotion pipelines.',
  'Limited access to leadership pathways and decision-making spaces.',
  'Career progression barriers linked to unequal visibility and support structures.',
  'Competing social pressures that disproportionately affect women in the sector.'
];

const goals = [
  'Inspire women to pursue and sustain leadership careers in hospitality.',
  'Unite professionals, students, entrepreneurs, and executives in one active network.',
  'Advance representation through mentorship, training, and strategic partnerships.',
  'Promote professional excellence, integrity, and gender diversity across the industry.'
];

const joinBenefits = ['Grow your career', 'Expand your network', 'Access opportunities'];

const membershipRoles = ['Student', 'Professional', 'Executive', 'Entrepreneur'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function normalizePath(pathname) {
  if (!pathname) {
    return '/';
  }

  const cleanPath = pathname.split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
  if (cleanPath === '/home') {
    return '/';
  }

  return cleanPath;
}

function getCurrentPath() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return normalizePath(window.location.pathname);
}

function validateMembership(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const role = values.role.trim();
  const location = values.location.trim();

  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Enter at least 2 characters for name.';
  } else if (name.length > 80) {
    errors.name = 'Name should be 80 characters or fewer.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!role) {
    errors.role = 'Please choose your role.';
  } else if (!membershipRoles.includes(role)) {
    errors.role = 'Please select a valid membership tier.';
  }

  if (!location) {
    errors.location = 'Location is required.';
  } else if (location.length < 2) {
    errors.location = 'Enter at least 2 characters for location.';
  } else if (location.length > 120) {
    errors.location = 'Location should be 120 characters or fewer.';
  }

  return errors;
}

function LogoLockup() {
  return (
    <div className="mx-auto flex w-fit flex-col items-center" role="img" aria-label="Women in Hospitality Nigeria official centered logo lockup">
      <div className="logo-protect rounded-2xl border border-pure-white/35 bg-pure-white/10 backdrop-blur-sm">
        <div className="logo-symbol" aria-hidden="true">
          <img src="/assets/wihn-logo-palm.png" alt="" className="logo-symbol-image" />
        </div>
      </div>
      <p className="mt-7 text-center font-heading text-[clamp(0.76rem,1vw,0.92rem)] font-bold tracking-[0.08em] text-pure-white">
        WOMEN IN HOSPITALITY
        <span className="block">NIGERIA</span>
      </p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="font-heading text-sm uppercase tracking-[0.22em] text-accent-turquoise">{eyebrow}</p>
      <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-deep-plum sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-deep-plum/80 sm:text-lg">{text}</p>
    </div>
  );
}

function PageLogoBackdrop({ tone = 'light', layout = 'default', mood = 'balanced' }) {
  const isDark = tone === 'dark';
  const sources = {
    hand: isDark ? '/assets/logos/wihn-logo-white-hand-alone.png' : '/assets/logos/wihn-logo-black-hand-alone.png',
    lockup: isDark ? '/assets/logos/wihn-logo-white-text.png' : '/assets/logos/wihn-logo-black-black-text.png',
    full: isDark ? '/assets/logos/wihn-logo-white-text.png' : '/assets/logos/wihn-logo-black-text.png'
  };
  const layouts = {
    default: [
      { kind: 'hand', className: '-right-28 -top-24 w-[18rem] rotate-[18deg] sm:w-[24rem]', opacityLight: 'opacity-[0.055]', opacityDark: 'opacity-[0.14]' },
      { kind: 'lockup', className: '-bottom-24 -left-24 w-[15rem] -rotate-[14deg] sm:w-[20rem]', opacityLight: 'opacity-[0.048]', opacityDark: 'opacity-[0.11]' },
      { kind: 'full', className: 'left-[9%] top-[26%] hidden w-[9rem] -rotate-[24deg] sm:block sm:w-[12rem]', opacityLight: 'opacity-[0.032]', opacityDark: 'opacity-[0.075]' },
      { kind: 'hand', className: 'right-[10%] bottom-[16%] hidden w-[8rem] rotate-[33deg] lg:block lg:w-[10rem]', opacityLight: 'opacity-[0.028]', opacityDark: 'opacity-[0.07]' }
    ],
    reverse: [
      { kind: 'hand', className: '-left-24 -top-24 w-[16rem] -rotate-[20deg] sm:w-[22rem]', opacityLight: 'opacity-[0.055]', opacityDark: 'opacity-[0.14]' },
      { kind: 'lockup', className: '-bottom-24 -right-24 w-[17rem] rotate-[16deg] sm:w-[22rem]', opacityLight: 'opacity-[0.05]', opacityDark: 'opacity-[0.11]' },
      { kind: 'full', className: 'right-[8%] top-[24%] hidden w-[10rem] rotate-[26deg] sm:block sm:w-[13rem]', opacityLight: 'opacity-[0.03]', opacityDark: 'opacity-[0.075]' },
      { kind: 'hand', className: 'left-[12%] bottom-[14%] hidden w-[8rem] -rotate-[30deg] lg:block lg:w-[10rem]', opacityLight: 'opacity-[0.028]', opacityDark: 'opacity-[0.07]' }
    ],
    wide: [
      { kind: 'hand', className: 'right-[8%] -top-28 w-[15rem] rotate-[8deg] sm:w-[21rem]', opacityLight: 'opacity-[0.055]', opacityDark: 'opacity-[0.14]' },
      { kind: 'lockup', className: 'left-[4%] -bottom-24 w-[15rem] -rotate-[26deg] sm:w-[20rem]', opacityLight: 'opacity-[0.05]', opacityDark: 'opacity-[0.11]' },
      { kind: 'full', className: 'left-[18%] top-[18%] hidden w-[8rem] -rotate-[12deg] md:block md:w-[11rem]', opacityLight: 'opacity-[0.028]', opacityDark: 'opacity-[0.07]' },
      { kind: 'full', className: 'right-[16%] bottom-[14%] hidden w-[10rem] rotate-[24deg] lg:block lg:w-[13rem]', opacityLight: 'opacity-[0.03]', opacityDark: 'opacity-[0.075]' }
    ]
  };
  const selectedLayout = layouts[layout] || layouts.default;
  const blendMode = isDark ? 'mix-blend-screen' : 'mix-blend-multiply';
  const moodClasses = {
    bold: {
      light: ['opacity-[0.072]', 'opacity-[0.062]', 'opacity-[0.043]', 'opacity-[0.04]'],
      dark: ['opacity-[0.17]', 'opacity-[0.13]', 'opacity-[0.09]', 'opacity-[0.085]']
    },
    balanced: {
      light: ['opacity-[0.055]', 'opacity-[0.05]', 'opacity-[0.032]', 'opacity-[0.03]'],
      dark: ['opacity-[0.14]', 'opacity-[0.11]', 'opacity-[0.075]', 'opacity-[0.07]']
    },
    calm: {
      light: ['opacity-[0.038]', 'opacity-[0.033]', 'opacity-[0.02]', 'opacity-[0.018]'],
      dark: ['opacity-[0.1]', 'opacity-[0.082]', 'opacity-[0.05]', 'opacity-[0.045]']
    }
  };
  const activeMood = moodClasses[mood] || moodClasses.balanced;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {selectedLayout.map((item, index) => (
        <img
          key={`${layout}-${item.kind}-${index}`}
          src={sources[item.kind]}
          alt=""
          className={`absolute ${item.className} ${blendMode} select-none ${
            isDark ? activeMood.dark[index] : activeMood.light[index]
          }`}
        />
      ))}
    </div>
  );
}

function HomePage({ reveal, onNavigate }) {
  return (
    <section className="relative isolate overflow-hidden bg-deep-plum text-pure-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/assets/wihn-logo-palm.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'min(58vw, 38rem)'
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
        aria-hidden="true"
        style={{ backgroundImage: "url('/assets/wihn-brand-wave.jpg')", backgroundSize: 'cover', backgroundPosition: 'center bottom' }}
      />
      <div className="relative mx-auto flex min-h-[82svh] w-[min(100%,92rem)] flex-col px-4 pb-16 pt-4 text-center sm:px-8 sm:pt-5 lg:pb-20 lg:pt-6">
        <motion.div {...reveal()} className="mx-auto w-fit">
          <LogoLockup />
        </motion.div>

        <div className="flex flex-1 flex-col justify-center">
          <motion.h1
            {...reveal(0.08)}
            className="mx-auto mt-8 max-w-5xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            Inspiring, Uniting, and Advancing Women in Hospitality
          </motion.h1>

          <motion.p {...reveal(0.14)} className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-pure-white/90 sm:text-lg">
            WIHN is dedicated to inspiring, uniting, and advancing women in the hospitality industry through leadership,
            professional excellence, and gender diversity.
          </motion.p>

          <motion.div {...reveal(0.2)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/join"
              onClick={onNavigate('/join')}
              className="rounded-full bg-accent-orange px-7 py-3 text-sm font-semibold uppercase tracking-wide text-ink-black transition hover:bg-pure-white"
            >
              Join WIHN
            </a>
            <a
              href="/partnerships-sponsorships"
              onClick={onNavigate('/partnerships-sponsorships')}
              className="rounded-full border border-pure-white px-7 py-3 text-sm font-semibold uppercase tracking-wide text-pure-white transition hover:bg-pure-white hover:text-deep-plum"
            >
              Partner With Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutPage({ reveal }) {
  return (
    <section className="relative isolate mx-auto w-[min(100%,92rem)] overflow-hidden px-4 py-16 sm:px-8 lg:py-20">
      <PageLogoBackdrop tone="light" layout="wide" mood="bold" />
      <motion.div {...reveal()}>
        <SectionHeading
          eyebrow="About WIHN"
          title="A Strategic Framework for Gender Diversity and Professional Excellence"
          text="Women in Hospitality Nigeria (WIHN) is a network of ambitious women across hospitality, tourism, and service industries. Our framework aligns leadership development, mentorship, collaboration, and opportunity access to build long-term, equitable growth."
        />
      </motion.div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, index) => (
          <motion.article
            key={item.title}
            {...reveal(index * 0.06)}
            className="rounded-2xl border border-deep-plum/10 bg-pure-white p-6 shadow-soft-xl"
          >
            <h2 className="font-heading text-lg font-bold text-deep-plum">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-deep-plum/80">{item.text}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <motion.article {...reveal(0.06)} className="rounded-2xl bg-deep-plum p-7 text-pure-white shadow-soft-xl">
          <h2 className="font-heading text-2xl font-bold">Industry Impact</h2>
          <p className="mt-3 text-pure-white/88">
            Nigerian women are reshaping hospitality sectors with innovation, leadership, and operational excellence.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {sectors.map((sector) => (
              <li key={sector} className="rounded-xl border border-pure-white/20 bg-pure-white/10 px-4 py-3 text-sm font-semibold">
                {sector}
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article {...reveal(0.12)} className="rounded-2xl border border-deep-plum/12 bg-pure-white p-7 shadow-soft-xl">
          <h2 className="font-heading text-2xl font-bold text-deep-plum">Challenges & Goals</h2>
          <p className="mt-3 text-deep-plum/80">
            We are committed to breaking barriers like gender bias and limited leadership access while accelerating professional growth.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-deep-plum/85">
            {challenges.slice(0, 3).map((challenge) => (
              <li key={challenge} className="flex gap-3">
                <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-accent-dark-orange" aria-hidden="true" />
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-2 text-sm text-deep-plum/85">
            {goals.slice(0, 2).map((goal) => (
              <li key={goal} className="flex gap-3">
                <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-accent-turquoise" aria-hidden="true" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </section>
  );
}

function ProgramsPage({ reveal }) {
  return (
    <section className="relative isolate mx-auto w-[min(100%,92rem)] overflow-hidden px-4 py-16 sm:px-8 lg:py-20">
      <PageLogoBackdrop tone="light" layout="reverse" mood="balanced" />
      <motion.div {...reveal()}>
        <SectionHeading
          eyebrow="Programs"
          title="Modern Excellence Through Practical Programs"
          text="Our programs combine mentorship, leadership readiness, and skills development to create measurable professional outcomes for women in hospitality."
        />
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {programs.map((program, index) => (
          <motion.article
            key={program.title}
            {...reveal(index * 0.06)}
            className="rounded-2xl bg-deep-plum p-7 text-pure-white shadow-soft-xl"
          >
            <h2 className="font-heading text-xl font-bold">{program.title}</h2>
            <p className="mt-3 leading-relaxed text-pure-white/90">{program.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function MembershipPage({ reveal }) {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    role: '',
    location: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitState, setSubmitState] = useState({
    type: 'idle',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((previous) => {
        const next = { ...previous };
        delete next[name];
        return next;
      });
    }
  };

  const onInputBlur = (event) => {
    const { name, value } = event.target;
    const fieldError = validateMembership({
      ...formValues,
      [name]: value
    })[name];

    if (fieldError) {
      setFormErrors((previous) => ({ ...previous, [name]: fieldError }));
    }
  };

  const onMembershipSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ type: 'idle', message: '' });

    const errors = validateMembership(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitState({
        type: 'error',
        message: 'Please fix the highlighted fields and try again.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (payload?.errors && typeof payload.errors === 'object') {
          setFormErrors(payload.errors);
        }

        setSubmitState({
          type: 'error',
          message: payload?.message || 'Submission failed. Please try again.'
        });
        return;
      }

      setFormValues({
        name: '',
        email: '',
        role: '',
        location: ''
      });
      setFormErrors({});
      setSubmitState({
        type: 'success',
        message: 'Membership request received. WIHN will contact you shortly.'
      });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: 'Network error while submitting the form. Please retry.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-pure-white py-16 lg:py-20">
      <PageLogoBackdrop tone="light" layout="wide" mood="calm" />
      <div className="mx-auto w-[min(100%,92rem)] px-4 sm:px-8">
        <motion.div {...reveal()}>
          <SectionHeading
            eyebrow="Membership"
            title="Membership Pathways for Students, Professionals, Executives, and Entrepreneurs"
            text="Choose your role and submit your details. WIHN will connect you to the right mentorship, events, leadership development, and growth opportunities."
          />
        </motion.div>

        <motion.form
          {...reveal(0.07)}
          onSubmit={onMembershipSubmit}
          noValidate
          className="mt-10 rounded-3xl border border-deep-plum/12 bg-mist-gray p-6 shadow-soft-xl sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="font-heading text-sm uppercase tracking-[0.08em] text-deep-plum">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formValues.name}
                onChange={onInputChange}
                onBlur={onInputBlur}
                aria-invalid={Boolean(formErrors.name)}
                aria-describedby={formErrors.name ? 'name-error' : undefined}
                className="mt-2 w-full rounded-xl border border-deep-plum/20 bg-pure-white px-4 py-3 text-deep-plum outline-none transition focus-visible:border-accent-turquoise focus-visible:ring-2 focus-visible:ring-accent-turquoise/45"
                placeholder="Enter your full name"
              />
              {formErrors.name ? (
                <p id="name-error" className="mt-2 text-sm text-accent-dark-orange">
                  {formErrors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="font-heading text-sm uppercase tracking-[0.08em] text-deep-plum">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formValues.email}
                onChange={onInputChange}
                onBlur={onInputBlur}
                aria-invalid={Boolean(formErrors.email)}
                aria-describedby={formErrors.email ? 'email-error' : undefined}
                className="mt-2 w-full rounded-xl border border-deep-plum/20 bg-pure-white px-4 py-3 text-deep-plum outline-none transition focus-visible:border-accent-turquoise focus-visible:ring-2 focus-visible:ring-accent-turquoise/45"
                placeholder="you@example.com"
              />
              {formErrors.email ? (
                <p id="email-error" className="mt-2 text-sm text-accent-dark-orange">
                  {formErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="role" className="font-heading text-sm uppercase tracking-[0.08em] text-deep-plum">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formValues.role}
                onChange={onInputChange}
                onBlur={onInputBlur}
                aria-invalid={Boolean(formErrors.role)}
                aria-describedby={formErrors.role ? 'role-error' : undefined}
                className="mt-2 w-full rounded-xl border border-deep-plum/20 bg-pure-white px-4 py-3 text-deep-plum outline-none transition focus-visible:border-accent-turquoise focus-visible:ring-2 focus-visible:ring-accent-turquoise/45"
              >
                <option value="">Select your role</option>
                {membershipRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {formErrors.role ? (
                <p id="role-error" className="mt-2 text-sm text-accent-dark-orange">
                  {formErrors.role}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="location" className="font-heading text-sm uppercase tracking-[0.08em] text-deep-plum">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                autoComplete="address-level2"
                value={formValues.location}
                onChange={onInputChange}
                onBlur={onInputBlur}
                aria-invalid={Boolean(formErrors.location)}
                aria-describedby={formErrors.location ? 'location-error' : undefined}
                className="mt-2 w-full rounded-xl border border-deep-plum/20 bg-pure-white px-4 py-3 text-deep-plum outline-none transition focus-visible:border-accent-turquoise focus-visible:ring-2 focus-visible:ring-accent-turquoise/45"
                placeholder="City / State"
              />
              {formErrors.location ? (
                <p id="location-error" className="mt-2 text-sm text-accent-dark-orange">
                  {formErrors.location}
                </p>
              ) : null}
            </div>
          </div>

          {submitState.message ? (
            <p
              role="status"
              className={`mt-5 text-sm ${
                submitState.type === 'success' ? 'text-deep-plum' : 'text-accent-dark-orange'
              }`}
            >
              {submitState.message}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-deep-plum/70">
              Submission endpoint: <code>/api/membership</code>
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-accent-orange px-8 py-3 text-sm font-semibold uppercase tracking-wide text-ink-black transition hover:bg-deep-plum hover:text-pure-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Join Now'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function EventsPage({ reveal }) {
  return (
    <section className="relative isolate mx-auto w-[min(100%,92rem)] overflow-hidden px-4 py-16 sm:px-8 lg:py-20">
      <PageLogoBackdrop tone="light" layout="default" mood="balanced" />
      <motion.div {...reveal()}>
        <SectionHeading
          eyebrow="Events & Initiatives"
          title="High-Value Events That Build Industry Momentum"
          text="WIHN curates networking events, workshops, panel discussions, and meetups that connect women to insights, opportunities, and visibility."
        />
      </motion.div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {eventTypes.map((eventType, index) => (
          <motion.article
            key={eventType}
            {...reveal(index * 0.06)}
            className="rounded-2xl border border-deep-plum/12 bg-pure-white p-6 shadow-soft-xl"
          >
            <h2 className="font-heading text-lg font-bold text-deep-plum">{eventType}</h2>
            <p className="mt-2 text-sm text-deep-plum/75">Upcoming schedules and gallery previews are updated by initiative.</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function PartnershipsPage({ reveal }) {
  return (
    <section className="relative isolate overflow-hidden bg-pure-white py-16 lg:py-20">
      <PageLogoBackdrop tone="light" layout="reverse" mood="bold" />
      <div className="mx-auto w-[min(100%,92rem)] px-4 sm:px-8">
        <motion.div {...reveal()}>
          <SectionHeading
            eyebrow="Partnerships & Sponsorships"
            title="Partner With a Platform Shaping the Future of Hospitality"
            text="Partners gain brand visibility and access to an engaged, professional audience while helping WIHN accelerate impact."
          />
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {partnerships.map((item, index) => (
            <motion.article
              key={item.title}
              {...reveal(index * 0.07)}
              className="rounded-2xl bg-deep-plum p-7 text-pure-white shadow-soft-xl"
            >
              <h2 className="font-heading text-xl font-bold">{item.title}</h2>
              <p className="mt-3 text-pure-white/90">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaPage({ reveal }) {
  return (
    <section className="relative isolate mx-auto w-[min(100%,92rem)] overflow-hidden px-4 py-16 sm:px-8 lg:py-20">
      <PageLogoBackdrop tone="light" layout="wide" mood="balanced" />
      <motion.div {...reveal()}>
        <SectionHeading
          eyebrow="Media & Stories"
          title="Stories, Insights, and Visibility for Women in Hospitality"
          text="A dedicated space for WIHN stories, member achievements, practical industry perspectives, and current updates."
        />
      </motion.div>

      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {mediaStories.map((item, index) => (
          <motion.article
            key={item}
            {...reveal(index * 0.07)}
            className="rounded-2xl border border-deep-plum/12 bg-pure-white p-6 shadow-soft-xl"
          >
            <p className="leading-relaxed text-deep-plum/85">{item}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function LeadershipPage({ reveal }) {
  return (
    <section className="relative isolate overflow-hidden bg-pure-white py-16 lg:py-20">
      <PageLogoBackdrop tone="light" layout="default" mood="calm" />
      <div className="mx-auto w-[min(100%,92rem)] px-4 sm:px-8">
        <motion.div {...reveal()}>
          <SectionHeading
            eyebrow="Leadership"
            title="Leadership Structure"
            text="WIHN leadership combines strategic direction, operational delivery, and local influence to sustain growth across regions."
          />
        </motion.div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadershipTeams.map((team, index) => (
            <motion.div
              key={team}
              {...reveal(index * 0.06)}
              className="rounded-xl border border-deep-plum/12 bg-mist-gray px-5 py-4 font-heading text-sm uppercase tracking-[0.08em] text-deep-plum"
            >
              {team}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPage({ reveal }) {
  return (
    <section className="relative isolate mx-auto w-[min(100%,92rem)] overflow-hidden px-4 py-16 sm:px-8 lg:py-20">
      <PageLogoBackdrop tone="light" layout="reverse" mood="balanced" />
      <motion.div {...reveal()}>
        <SectionHeading
          eyebrow="Gallery"
          title="Curated Moments From WIHN Programs and Community Activities"
          text="Browse visual highlights from events, training sessions, and strategic networking experiences."
        />
      </motion.div>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {galleryCategories.map((category, index) => (
          <motion.article
            key={category}
            {...reveal(index * 0.07)}
            className="rounded-2xl bg-deep-plum p-7 text-pure-white shadow-soft-xl"
          >
            <h2 className="font-heading text-2xl font-bold">{category}</h2>
            <p className="mt-3 text-pure-white/90">Organized collections for easier browsing and storytelling.</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ContactPage({ reveal }) {
  return (
    <section className="relative isolate mx-auto w-[min(100%,92rem)] overflow-hidden px-4 py-16 sm:px-8 lg:py-20">
      <PageLogoBackdrop tone="light" layout="wide" mood="calm" />
      <motion.div {...reveal()}>
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch With WIHN"
          text="Connect with Women in Hospitality Nigeria for membership, partnerships, media requests, and collaboration opportunities."
        />
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <motion.article {...reveal(0.06)} className="rounded-2xl bg-deep-plum p-7 text-pure-white shadow-soft-xl">
          <h2 className="font-heading text-xl font-bold">Corporate Address</h2>
          <p className="mt-3 text-pure-white/90">AV 22 Lagos street, 1203 P.O. Box 4234-Lagos.</p>
        </motion.article>

        <motion.article {...reveal(0.12)} className="rounded-2xl border border-deep-plum/12 bg-pure-white p-7 shadow-soft-xl">
          <h2 className="font-heading text-xl font-bold text-deep-plum">Contact Channels</h2>
          <p className="mt-3 text-deep-plum/80">
            <a className="underline decoration-deep-plum/40 underline-offset-4 hover:text-deep-plum" href="mailto:hello@womeninhospitalitynigeria.com">
              hello@womeninhospitalitynigeria.com
            </a>
          </p>
          <p className="mt-2 text-sm text-deep-plum/70">Website: womeninhospitalitynigeria.com</p>
        </motion.article>
      </div>
    </section>
  );
}

function JoinPage({ reveal, onNavigate }) {
  return (
    <section className="relative isolate mx-auto w-[min(100%,92rem)] overflow-hidden px-4 py-16 sm:px-8 lg:py-20">
      <PageLogoBackdrop tone="light" layout="reverse" mood="bold" />
      <motion.div
        {...reveal()}
        className="rounded-3xl bg-gradient-to-r from-deep-plum to-ink-black px-6 py-10 text-center text-pure-white shadow-soft-xl sm:px-10"
      >
        <p className="font-heading text-sm uppercase tracking-[0.2em] text-accent-pink">Join</p>
        <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">Join a Community That Is Changing the Narrative</h1>
        <p className="mx-auto mt-4 max-w-2xl text-pure-white/90">
          Join WIHN to build leadership confidence, strengthen your network, and access new professional opportunities.
        </p>
        <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.07em]">
          {joinBenefits.map((benefit) => (
            <li key={benefit} className="rounded-full border border-pure-white/25 bg-pure-white/10 px-4 py-2">
              {benefit}
            </li>
          ))}
        </ul>
        <a
          href="/membership"
          onClick={onNavigate('/membership')}
          className="mt-8 inline-flex rounded-full bg-accent-orange px-8 py-3 text-sm font-semibold uppercase tracking-wide text-ink-black transition hover:bg-pure-white"
        >
          Start Membership
        </a>
      </motion.div>
    </section>
  );
}

function NotFoundPage({ onNavigate }) {
  return (
    <section className="mx-auto flex min-h-[65svh] w-[min(100%,92rem)] flex-col items-center justify-center px-4 py-16 text-center sm:px-8">
      <p className="font-heading text-sm uppercase tracking-[0.22em] text-accent-turquoise">Page Not Found</p>
      <h1 className="mt-3 font-heading text-4xl font-bold text-deep-plum">This page does not exist.</h1>
      <p className="mt-4 max-w-xl text-deep-plum/80">Use the page menu to continue browsing WIHN content.</p>
      <a
        href="/"
        onClick={onNavigate('/')}
        className="mt-8 inline-flex rounded-full bg-deep-plum px-8 py-3 text-sm font-semibold uppercase tracking-wide text-pure-white transition hover:bg-accent-pink"
      >
        Return Home
      </a>
    </section>
  );
}

function MainFooter({ onNavigate }) {
  return (
    <footer className="border-t border-deep-plum/15 bg-mist-gray">
      <div className="mx-auto grid w-[min(100%,92rem)] gap-8 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.18em] text-deep-plum/70">Women In Hospitality Nigeria</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-deep-plum/80">
            Empowering women through mentorship, leadership, collaboration, and industry-wide professional excellence.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-deep-plum">Corporate Address</h2>
          <p className="mt-3 text-sm leading-relaxed text-deep-plum/80">AV 22 Lagos street, 1203 P.O. Box 4234-Lagos.</p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-deep-plum">Quick Navigation</h2>
          <ul className="mt-3 space-y-2 text-sm text-deep-plum/80">
            {sitePages.slice(0, 6).map((item) => (
              <li key={item.path}>
                <a href={item.path} onClick={onNavigate(item.path)} className="hover:text-deep-plum hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const pageMenuRef = useRef(null);
  const [pageMenuOpen, setPageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!pageMenuRef.current || pageMenuRef.current.contains(event.target)) {
        return;
      }

      setPageMenuOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.56, delay }
    },
    viewport: { once: true, amount: 0.2 }
  });

  const navigateTo = (path) => {
    const nextPath = normalizePath(path);
    setPageMenuOpen(false);
    setMobileMenuOpen(false);

    if (nextPath === currentPath) {
      return;
    }

    window.history.pushState({}, '', nextPath);
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const onNavigate = (path) => (event) => {
    const isPrimaryButton = event.button === undefined || event.button === 0;
    const isModified = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

    if (!isPrimaryButton || isModified) {
      return;
    }

    event.preventDefault();
    navigateTo(path);
  };

  const getMenuItemClassName = (path, mobile = false) => {
    const isActive = currentPath === path;

    if (mobile) {
      return `block rounded-lg px-3 py-2 font-heading text-sm uppercase tracking-[0.08em] transition ${
        isActive ? 'bg-pure-white/20 text-accent-pink' : 'text-pure-white hover:bg-pure-white/10 hover:text-accent-pink'
      }`;
    }

    return `block rounded-xl px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-mist-gray text-accent-pink' : 'text-deep-plum hover:bg-mist-gray hover:text-accent-pink'
    }`;
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage reveal={reveal} onNavigate={onNavigate} />;
      case '/about':
        return <AboutPage reveal={reveal} />;
      case '/programs':
        return <ProgramsPage reveal={reveal} />;
      case '/membership':
        return <MembershipPage reveal={reveal} />;
      case '/events-initiatives':
        return <EventsPage reveal={reveal} />;
      case '/partnerships-sponsorships':
        return <PartnershipsPage reveal={reveal} />;
      case '/media-stories':
        return <MediaPage reveal={reveal} />;
      case '/leadership':
        return <LeadershipPage reveal={reveal} />;
      case '/gallery':
        return <GalleryPage reveal={reveal} />;
      case '/contact':
        return <ContactPage reveal={reveal} />;
      case '/join':
        return <JoinPage reveal={reveal} onNavigate={onNavigate} />;
      default:
        return <NotFoundPage onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-mist-gray font-body text-ink-black antialiased">
      {currentPath !== '/' ? (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-[1] opacity-[0.14]"
            aria-hidden="true"
            style={{
              backgroundImage: "url('/assets/wihn-global-bg.jfif')",
              backgroundRepeat: 'repeat',
              backgroundPosition: 'center',
              backgroundSize: '360px auto'
            }}
          />
          <div
            className="pointer-events-none fixed inset-0 z-[1] opacity-[0.065] mix-blend-multiply"
            aria-hidden="true"
            style={{
              backgroundImage: "url('/assets/wihn-logo-palm.png')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center 9rem',
              backgroundSize: 'min(42vw, 20rem)'
            }}
          />
        </>
      ) : null}
      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-pure-white/15 bg-deep-plum/95 backdrop-blur-sm">
        <div className="mx-auto flex w-[min(100%,92rem)] items-center justify-between px-4 py-3 sm:px-8">
          <a
            href="/"
            onClick={onNavigate('/')}
            className="header-brand-title"
          >
            <img src="/assets/wihn-logo-palm.png" alt="" className="header-brand-mark" aria-hidden="true" />
            <span>Women in Hospitality Nigeria</span>
            <img src="/assets/wihn-logo-palm.png" alt="" className="header-brand-mark" aria-hidden="true" />
          </a>

          <div className="flex items-center gap-2">
            <div ref={pageMenuRef} className="relative hidden sm:block">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={pageMenuOpen}
                onClick={() => setPageMenuOpen((open) => !open)}
                className="inline-flex items-center gap-2 rounded-full border border-pure-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-pure-white transition hover:border-accent-pink hover:text-accent-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-deep-plum"
              >
                Menu
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {pageMenuOpen ? (
                  <motion.ul
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-3 max-h-[70vh] w-[22rem] overflow-auto rounded-2xl border border-deep-plum/10 bg-pure-white p-2 shadow-soft-xl"
                  >
                    {sitePages.map((item) => (
                      <li key={item.path}>
                        <a
                          role="menuitem"
                          aria-current={currentPath === item.path ? 'page' : undefined}
                          href={item.path}
                          onClick={onNavigate(item.path)}
                          className={getMenuItemClassName(item.path)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </div>

            <a
              href="/join"
              onClick={onNavigate('/join')}
              className="hidden rounded-full border border-accent-orange px-4 py-2 text-xs font-semibold uppercase tracking-wide text-pure-white transition hover:bg-accent-orange hover:text-ink-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-deep-plum sm:inline-flex"
            >
              Join WIHN
            </a>

            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="inline-flex rounded-lg border border-pure-white/50 p-2 text-pure-white transition hover:border-accent-pink hover:text-accent-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-deep-plum md:hidden"
            >
              <span className="sr-only">Toggle navigation menu</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.button
              key="mobile-menu-overlay"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-ink-black/65 md:hidden"
            />
            <motion.nav
              key="mobile-menu-drawer"
              id="mobile-nav-drawer"
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
              className="fixed right-0 top-0 z-50 flex h-svh w-[min(80vw,23rem)] flex-col bg-deep-plum p-6 md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-pure-white/80">Page Menu</p>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex rounded-md border border-pure-white/50 p-2 text-pure-white transition hover:text-accent-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-deep-plum"
                >
                  <span className="sr-only">Close navigation menu</span>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <ul className="space-y-3 overflow-auto">
                {sitePages.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      aria-current={currentPath === item.path ? 'page' : undefined}
                      onClick={onNavigate(item.path)}
                      className={getMenuItemClassName(item.path, true)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>

        <main id="main-content">{renderPage()}</main>
        <MainFooter onNavigate={onNavigate} />
      </div>
    </div>
  );
}
