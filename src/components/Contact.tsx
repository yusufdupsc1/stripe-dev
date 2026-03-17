import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useInView } from '../hooks/useInView';
import { PROFILE } from '../data/profile';

type Tab = 'message' | 'hire';

// ── Stripe payment helper ──────────────────────────────────────────────
async function createCheckoutSession(amount: number, description: string) {
  const res = await fetch('/api/stripe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'create-checkout-session',
      amount,                              // in cents
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

export default function Contact() {
  const { ref, visible } = useInView();
  const [tab, setTab]               = useState<Tab>('message');
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [message, setMessage]       = useState('');
  const [service, setService]       = useState(SERVICES[0].id);
  const [status, setStatus]         = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [payStatus, setPayStatus]   = useState<'idle' | 'loading' | 'error'>('idle');
  const [payMsg, setPayMsg]         = useState('');

  // Handle post-Stripe redirect feedback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') setPayMsg('✅ Payment successful! I\'ll reach out within 24 hours.');
    if (params.get('payment') === 'cancelled') setPayMsg('Payment cancelled — no worries, you can try again anytime.');
  }, []);

  const handleMessage = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Encode as mailto (no server needed for a simple contact form)
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
    <section
      id="contact"
      ref={ref}
      className={`py-24 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left – info */}
          <div>
            <p className="text-violet-400 font-mono text-sm mb-3 uppercase tracking-widest">Contact</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Let's build<br />
              <span className="text-shimmer">something real.</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-8">
              Whether you need a Stripe integration that handles edge cases, a backend API built to scale, or a code review — I can help. Response time within 24 hours.
            </p>

            {/* Contact cards */}
            <div className="space-y-3 mb-8">
              <a href="mailto:yusufdupsc1@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-[#0e0e14] border border-white/[0.07] hover:border-violet-500/30 transition-all group">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="text-xs text-white/40 font-mono">Email</p>
                  <p className="text-white/80 group-hover:text-white transition-colors">yusufdupsc1@gmail.com</p>
                </div>
              </a>
              <a href="https://linkedin.com/in/yusuf-ali-backend-engineer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-[#0e0e14] border border-white/[0.07] hover:border-violet-500/30 transition-all group">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="text-xs text-white/40 font-mono">LinkedIn</p>
                  <p className="text-white/80 group-hover:text-white transition-colors">${PROFILE.name} — Backend Engineer</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0e0e14] border border-white/[0.07]">
                <span className="text-2xl">📍</span>
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
          </div>

          {/* Right – form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0e0e14] border border-white/[0.08]">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              {(['message', 'hire'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    tab === t ? 'bg-violet-600 text-white shadow' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {t === 'message' ? '💬 Send Message' : '💳 Hire Me (Stripe)'}
                </button>
              ))}
            </div>

            {tab === 'message' ? (
              /* ── Contact form ── */
              <form onSubmit={handleMessage} className="space-y-4">
                <div>
                  <label className="block text-xs text-white/50 font-mono mb-1.5">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 font-mono mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 font-mono mb-1.5">Message</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe your project or ask a question..."
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/60 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <label key={s.id} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all ${
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
                  <span>🔒</span>
                  Stripe test mode · No real charge · Card: 4242 4242 4242 4242
                </div>

                {payStatus === 'error' && (
                  <p className="text-red-400 text-xs">Payment error. Check console or try again.</p>
                )}

                <button
                  onClick={handleHire}
                  disabled={payStatus === 'loading'}
                  className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {payStatus === 'loading'
                    ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Redirecting to Stripe...</>
                    : <>Pay with Stripe →</>
                  }
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
