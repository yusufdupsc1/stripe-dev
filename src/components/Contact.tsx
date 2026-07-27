import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { PROFILE } from '../data/profile';


type Tab = 'message' | 'hire';

async function createCheckoutSession(amount: number, description: string) {
  const res = await fetch('/api/stripe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'create-checkout-session',
      amount,
      productName: description,
      currency: 'usd',
    }),
  });
  if (!res.ok) throw new Error('Failed to create session');
  const { url } = await res.json();
  return url as string;
}

const SERVICES = [
  { id: 'stripe', label: 'Stripe Integration', price: 49900, display: '$499' },
  { id: 'api',    label: 'API Development',     price: 29900, display: '$299' },
  { id: 'audit',  label: 'Code Audit',           price: 14900, display: '$149' },
  { id: 'consult',label: '1-Hour Consultation',  price: 4900,  display: '$49'  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { stiffness: 300, damping: 24 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { stiffness: 300, damping: 24 },
  },
};

export default function Contact() {
  const [tab, setTab]               = useState<Tab>('message');
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [message, setMessage]       = useState('');
  const [service, setService]       = useState(SERVICES[0].id);
  const [status, setStatus]         = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [payStatus, setPayStatus]   = useState<'idle' | 'loading' | 'error'>('idle');
  const [payMsg, setPayMsg]         = useState('');
  const shouldReduce = useReducedMotion() ?? false;

  const reducedItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  };
  const activeItemVariants = shouldReduce ? reducedItemVariants : itemVariants;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') setPayMsg('✅ Payment successful! I\'ll reach out within 24 hours.');
    if (params.get('payment') === 'cancelled') setPayMsg('Payment cancelled — no worries, you can try again anytime.');
  }, []);

  const handleMessage = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:yusufdupsc1@gmail.com?subject=Portfolio enquiry from ${encodeURIComponent(name)}&body=${body}`;
    setStatus('done');
  }, [name, email, message]);

  const handleHire = useCallback(async () => {
    const svc = SERVICES.find(s => s.id === service)!;
    setPayStatus('loading');
    try {
      const url = await createCheckoutSession(svc.price, `Hire ${PROFILE.name} – ${svc.label}`);
      window.location.href = url;
    } catch {
      setPayStatus('error');
    }
  }, [service]);

  return (
    <motion.section
      id="contact"

      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left – info */}
          <motion.div variants={activeItemVariants}>
            <p className="text-violet-400 font-mono text-sm mb-3 uppercase tracking-widest">Contact</p>
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
              Let's build<br />
              <span className="text-shimmer">something real.</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-8 max-w-measure">
              Whether you need a Stripe integration that handles edge cases, a backend API built to scale, or a code review — I can help. Response time within 24 hours.
            </p>

            {/* Contact cards */}
            <div className="space-y-3 mb-8">
              <a href="mailto:yusufdupsc1@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-[var(--c-neutral-900)] border border-white/[0.07] hover:border-violet-500/30 interact-card group">
                <span className="text-violet-400"><svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
                <div>
                  <p className="text-xs text-white/40 font-mono">Email</p>
                  <p className="text-white/80 group-hover:text-white interact-link">yusufdupsc1@gmail.com</p>
                </div>
              </a>
              <a href="https://linkedin.com/in/yusuf-ali-backend-engineer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-[var(--c-neutral-900)] border border-white/[0.07] hover:border-violet-500/30 interact-card group">
                <span className="text-cyan-400"><svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></span>
                <div>
                  <p className="text-xs text-white/40 font-mono">LinkedIn</p>
                  <p className="text-white/80 group-hover:text-white interact-link">{PROFILE.name} — Backend Engineer</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--c-neutral-900)] border border-white/[0.07]">
                <span className="text-emerald-400"><svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></span>
                <div>
                  <p className="text-xs text-white/40 font-mono">Location</p>
                  <p className="text-white/80">Rajshahi, Bangladesh 🇧🇩 · Remote OK</p>
                </div>
              </div>
            </div>

            {/* Available banner */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <p className="text-emerald-400 text-sm font-medium">Available for freelance & full-time opportunities</p>
            </div>

            {payMsg && (
              <div className="mt-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white/70">
                {payMsg}
              </div>
            )}
          </motion.div>

          {/* Right – form */}
          <motion.div variants={activeItemVariants} className="p-6 sm:p-8 rounded-2xl bg-[var(--c-neutral-900)] border border-white/[0.08]">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              {(['message', 'hire'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 rounded-md text-sm font-medium interact-card min-w-[44px] min-h-[44px] ${
                    tab === t ? 'bg-violet-600 text-white shadow' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {t === 'message' ? <><svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Send Message</> : <><svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Hire Me (Stripe)</>}
                </button>
              ))}
            </div>

            {tab === 'message' ? (
              /* ── Contact form ── */
              <form onSubmit={handleMessage} className="space-y-4">
                <div>
                  <label className="block text-xs text-white/70 font-mono mb-1.5">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 interact-input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 font-mono mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 interact-input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 font-mono mb-1.5">Message</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe your project or ask a question..."
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 interact-input resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm interact-card active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Opening email...' : status === 'done' ? '✓ Message sent!' : 'Send Message →'}
                </button>
              </form>
            ) : (
              /* ── Hire / Stripe checkout ── */
              <div className="space-y-4">
                <p className="text-white/50 text-sm">
                  Select a service and pay securely via Stripe. I'll reach out within 24 hours to kick off the project.
                </p>

                <div className="space-y-2">
                  {SERVICES.map(s => (
                    <label key={s.id} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border interact-card ${
                      service === s.id
                        ? 'bg-violet-600/15 border-violet-500/50 text-white'
                        : 'bg-white/[0.03] border-white/[0.07] text-white/60 hover:border-white/15 hover:text-white/80'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="service"
                          value={s.id}
                          checked={service === s.id}
                          onChange={() => setService(s.id)}
                          className="accent-violet-500 w-4 h-4"
                        />
                        <span className="text-sm font-medium">{s.label}</span>
                      </div>
                      <span className="font-mono text-sm font-bold text-violet-400">{s.display}</span>
                    </label>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white/40 font-mono flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Stripe test mode · No real charge · Card: 4242 4242 4242 4242
                </div>

                {payStatus === 'error' && (
                  <p className="text-red-400 text-xs">Payment error. Check console or try again.</p>
                )}

                <button
                  onClick={handleHire}
                  disabled={payStatus === 'loading'}
                  className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm interact-card active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {payStatus === 'loading'
                    ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Redirecting to Stripe...</>
                    : <>Pay with Stripe →</>
                  }
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}