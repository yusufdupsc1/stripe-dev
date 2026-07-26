const NODES = [
  { id: 'stripe',      label: 'Stripe',            tip: 'Stripe emits an event (e.g. payment_intent.succeeded) and POSTs it to your endpoint' },
  { id: 'https',       label: 'HTTPS POST',        tip: 'Stripe sends an HTTPS POST to your webhook endpoint with JSON body and Stripe-Signature header' },
  { id: 'verify',      label: 'Signature Verify',  tip: 'stripe.webhooks.constructEvent() rejects the request if the signature does not match — stops replay attacks' },
  { id: 'idempotency', label: 'Idempotency',       tip: 'Store event.id to skip duplicates — prevents double-processing on retries' },
  { id: 'queue',       label: 'Queue',             tip: 'Push to durable queue for async processing and retry safety' },
  { id: 'handler',     label: 'Handler',           tip: 'Business logic: update order, notify user, trigger follow-up actions' },
  { id: 'response',    label: 'Response',          tip: 'DB transaction commits and 200 OK is returned to Stripe' },
];

const PATH = 'M 80 60 L 230 60 L 420 60 L 600 60 L 780 60 L 780 220 L 620 220';

const cx = [80, 230, 420, 600, 780, 780, 620];
const cy = [60, 60, 60, 60, 60, 220, 220];

const toLeft  = (x: number) => `${(x / 860) * 100}%`;
const toTop   = (y: number) => `${(y / 280) * 100}%`;

export default function WebhookTrace() {
  return (
    <section id="webhook-trace" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-violet-400 font-mono text-sm mb-3 uppercase tracking-widest">Webhook Flow</p>
          <h2 className="text-3xl font-bold text-white mb-4">
            How a webhook <span className="text-shimmer">survives</span> the internet
          </h2>
          <p className="text-white/65 max-w-2xl mx-auto text-base">
            Every Stripe event passes through these steps before touching your database. Hover or tab to explore.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto overflow-x-auto pb-4">
          <svg viewBox="0 0 860 280" className="w-full h-auto pointer-events-none" aria-hidden>
            <path
              d={PATH}
              fill="none"
              stroke="var(--c-border)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d={PATH}
              fill="none"
              stroke="var(--c-accent2)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="6 2000"
              className="wt-pulse-path"
              opacity="0.85"
            />
          </svg>

          <div className="absolute inset-0" style={{ paddingBottom: '32%' }}>
            <button
              className="wt-node-btn"
              style={{ left: toLeft(cx[0]), top: toTop(cy[0]) }}
              aria-describedby="wt-tip-stripe"
            >
              <span className="wt-node-label">{NODES[0].label}</span>
              <span id="wt-tip-stripe" role="tooltip" className="wt-tooltip">{NODES[0].tip}</span>
            </button>
            <button
              className="wt-node-btn"
              style={{ left: toLeft(cx[1]), top: toTop(cy[1]) }}
              aria-describedby="wt-tip-https"
            >
              <span className="wt-node-label">{NODES[1].label}</span>
              <span id="wt-tip-https" role="tooltip" className="wt-tooltip">{NODES[1].tip}</span>
            </button>
            <button
              className="wt-node-btn"
              style={{ left: toLeft(cx[2]), top: toTop(cy[2]) }}
              aria-describedby="wt-tip-verify"
            >
              <span className="wt-node-label">{NODES[2].label}</span>
              <span id="wt-tip-verify" role="tooltip" className="wt-tooltip">{NODES[2].tip}</span>
            </button>
            <button
              className="wt-node-btn"
              style={{ left: toLeft(cx[3]), top: toTop(cy[3]) }}
              aria-describedby="wt-tip-idempotency"
            >
              <span className="wt-node-label">{NODES[3].label}</span>
              <span id="wt-tip-idempotency" role="tooltip" className="wt-tooltip">{NODES[3].tip}</span>
            </button>
            <button
              className="wt-node-btn"
              style={{ left: toLeft(cx[4]), top: toTop(cy[4]) }}
              aria-describedby="wt-tip-queue"
            >
              <span className="wt-node-label">{NODES[4].label}</span>
              <span id="wt-tip-queue" role="tooltip" className="wt-tooltip">{NODES[4].tip}</span>
            </button>
            <button
              className="wt-node-btn"
              style={{ left: toLeft(cx[5]), top: toTop(cy[5]) }}
              aria-describedby="wt-tip-handler"
            >
              <span className="wt-node-label">{NODES[5].label}</span>
              <span id="wt-tip-handler" role="tooltip" className="wt-tooltip">{NODES[5].tip}</span>
            </button>
            <button
              className="wt-node-btn"
              style={{ left: toLeft(cx[6]), top: toTop(cy[6]) }}
              aria-describedby="wt-tip-response"
            >
              <span className="wt-node-label">{NODES[6].label}</span>
              <span id="wt-tip-response" role="tooltip" className="wt-tooltip">{NODES[6].tip}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}