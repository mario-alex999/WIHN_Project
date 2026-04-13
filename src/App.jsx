import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Impact', href: '#impact' },
  { label: 'Programs', href: '#programs' },
  { label: 'Goals', href: '#goals' },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact', href: '#contact' }
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

const membershipRoles = ['Student', 'Professional', 'Executive', 'Entrepreneur'];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
    <div className="logo-protect mx-auto w-fit rounded-2xl bg-pure-white/10 backdrop-blur-sm" role="img" aria-label="Women in Hospitality Nigeria official centered logo lockup">
      <div className="logo-symbol" aria-hidden="true" />
      <p className="mt-3 text-center font-heading text-[clamp(0.76rem,1vw,0.92rem)] font-bold tracking-[0.08em] text-pure-white">
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
      <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-deep-plum sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-deep-plum/80 sm:text-lg">{text}</p>
    </div>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.56, delay }
    },
    viewport: { once: true, amount: 0.2 }
  });

  const closeMobileMenu = () => setMobileMenuOpen(false);

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
    <div className="min-h-screen bg-mist-gray font-body text-ink-black antialiased">
      <header className="sticky top-0 z-40 border-b border-pure-white/15 bg-deep-plum/95 backdrop-blur-sm">
        <div className="mx-auto flex w-[min(100%,92rem)] items-center justify-between px-4 py-3 sm:px-8">
          <p className="font-heading text-xs uppercase tracking-[0.18em] text-pure-white/80">Women in Hospitality Nigeria</p>
          <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className="font-heading text-sm text-pure-white transition hover:text-accent-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-deep-plum">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#membership"
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
              onClick={closeMobileMenu}
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
                <p className="font-heading text-xs uppercase tracking-[0.18em] text-pure-white/80">WIHN</p>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="inline-flex rounded-md border border-pure-white/50 p-2 text-pure-white transition hover:text-accent-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-deep-plum"
                >
                  <span className="sr-only">Close navigation menu</span>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-3 py-2 font-heading text-sm uppercase tracking-[0.08em] text-pure-white transition hover:bg-pure-white/10 hover:text-accent-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-turquoise"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#membership"
                onClick={closeMobileMenu}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent-orange px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-black transition hover:bg-pure-white"
              >
                Join WIHN
              </a>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>

      <main id="main-content">
        <section className="relative isolate overflow-hidden bg-deep-plum text-pure-white">
          <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
            aria-hidden="true"
            style={{ backgroundImage: "url('/assets/wihn-brand-wave.jpg')", backgroundSize: 'cover', backgroundPosition: 'center bottom' }}
          />
          <div className="relative mx-auto flex min-h-[82svh] w-[min(100%,92rem)] flex-col justify-center px-4 py-16 text-center sm:px-8 lg:py-20">
            <motion.div {...reveal()}>
              <LogoLockup />
            </motion.div>

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
                href="#membership"
                className="rounded-full bg-accent-orange px-7 py-3 text-sm font-semibold uppercase tracking-wide text-ink-black transition hover:bg-pure-white"
              >
                Join WIHN
              </a>
              <a
                href="#programs"
                className="rounded-full border border-pure-white px-7 py-3 text-sm font-semibold uppercase tracking-wide text-pure-white transition hover:bg-pure-white hover:text-deep-plum"
              >
                Partner With Us
              </a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto w-[min(100%,92rem)] px-4 py-16 sm:px-8 lg:py-20">
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
                <h3 className="font-heading text-lg font-bold text-deep-plum">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-deep-plum/80">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="impact" className="bg-pure-white py-16 lg:py-20">
          <div className="mx-auto w-[min(100%,92rem)] px-4 sm:px-8">
            <motion.div {...reveal()}>
              <SectionHeading
                eyebrow="Industry Impact"
                title="Nigerian Women Are Reshaping Hospitality"
                text="From hotels and restaurants to tourism and event management, women across Nigeria are driving innovation, customer excellence, and economic growth in hospitality."
              />
            </motion.div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((sector, index) => (
                <motion.div
                  key={sector}
                  {...reveal(index * 0.05)}
                  className="rounded-xl border border-deep-plum/12 bg-mist-gray px-5 py-4 font-heading text-sm uppercase tracking-[0.08em] text-deep-plum"
                >
                  {sector}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="mx-auto w-[min(100%,92rem)] px-4 py-16 sm:px-8 lg:py-20">
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
                <h3 className="font-heading text-xl font-bold">{program.title}</h3>
                <p className="mt-3 leading-relaxed text-pure-white/90">{program.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="goals" className="bg-pure-white py-16 lg:py-20">
          <div className="mx-auto grid w-[min(100%,92rem)] gap-8 px-4 sm:px-8 lg:grid-cols-2 lg:gap-10">
            <motion.article {...reveal()} className="rounded-2xl border border-accent-dark-orange/20 bg-pure-white p-7 shadow-soft-xl">
              <h3 className="font-heading text-2xl font-bold text-deep-plum">Challenges We Are Solving</h3>
              <ul className="mt-5 space-y-3 text-deep-plum/85">
                {challenges.map((challenge) => (
                  <li key={challenge} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-accent-dark-orange" aria-hidden="true" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article {...reveal(0.08)} className="rounded-2xl bg-deep-plum p-7 text-pure-white shadow-soft-xl">
              <h3 className="font-heading text-2xl font-bold">Our Goals for 2026 and Beyond</h3>
              <ul className="mt-5 space-y-3 text-pure-white/92">
                {goals.map((goal) => (
                  <li key={goal} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-accent-turquoise" aria-hidden="true" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </section>

        <section className="mx-auto w-[min(100%,92rem)] px-4 py-16 sm:px-8 lg:py-20">
          <motion.div
            {...reveal()}
            className="rounded-3xl bg-gradient-to-r from-deep-plum to-ink-black px-6 py-10 text-center text-pure-white shadow-soft-xl sm:px-10"
          >
            <p className="font-heading text-sm uppercase tracking-[0.2em] text-accent-pink">Final Call To Action</p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">Join a Movement Redefining Hospitality Leadership in Nigeria</h2>
            <p className="mx-auto mt-4 max-w-2xl text-pure-white/90">
              Students, professionals, executives, and entrepreneurs are welcome to join the WIHN community and shape the future.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex rounded-full bg-accent-orange px-8 py-3 text-sm font-semibold uppercase tracking-wide text-ink-black transition hover:bg-pure-white"
            >
              Join Now
            </a>
          </motion.div>
        </section>

        <section id="membership" className="bg-pure-white py-16 lg:py-20">
          <div className="mx-auto w-[min(100%,92rem)] px-4 sm:px-8">
            <motion.div {...reveal()}>
              <SectionHeading
                eyebrow="Membership"
                title="Join a Community That Is Changing the Narrative"
                text="Submit your membership details and our team will connect you to the right WIHN pathway for mentorship, leadership development, events, and growth."
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
                <p className="text-sm text-deep-plum/70">Submission endpoint: <code>/api/membership</code></p>
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
      </main>

      <footer id="contact" className="border-t border-deep-plum/15 bg-mist-gray">
        <div className="mx-auto grid w-[min(100%,92rem)] gap-8 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-deep-plum/70">Women In Hospitality Nigeria</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-deep-plum/80">
              Empowering women through mentorship, leadership, collaboration, and industry-wide professional excellence.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-deep-plum">Corporate Address</h3>
            <p className="mt-3 text-sm leading-relaxed text-deep-plum/80">AV 22 Lagos street, 1203 P.O. Box 4234-Lagos.</p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-deep-plum">Contact</h3>
            <p className="mt-3 text-sm text-deep-plum/80">
              <a className="underline decoration-deep-plum/40 underline-offset-4 hover:text-deep-plum" href="mailto:hello@womeninhospitalitynigeria.com">
                hello@womeninhospitalitynigeria.com
              </a>
            </p>
            <p className="mt-2 text-sm text-deep-plum/70">Website: womeninhospitalitynigeria.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
