import { useEffect, useState } from "react";

const HEALTH_ENDPOINT = "/";
const POLL_INTERVAL_MS = 30_000;

type Status = "healthy" | "degraded" | "down";

export default function StatusWidget() {
  const [status, setStatus] = useState<Status>("healthy");
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const start = performance.now();
        const res = await fetch(HEALTH_ENDPOINT, { method: "GET", cache: "no-store" });
        const elapsed = Math.round(performance.now() - start);

        if (!mounted) return;

        if (res.ok) {
          setStatus("healthy");
          setLatency(elapsed);
          setError(null);
          setLastChecked(new Date());
        } else {
          setStatus("degraded");
          setLatency(elapsed);
          setError(`HTTP ${res.status}`);
          setLastChecked(new Date());
        }
      } catch (err) {
        if (!mounted) return;
        setStatus("down");
        setLatency(null);
        setError(err instanceof Error ? err.message : "Network error");
        setLastChecked(new Date());
      }
    };

    check();
    const timer = setInterval(check, POLL_INTERVAL_MS);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const dotColor =
    status === "healthy" ? "var(--c-proof)" : "#ef4444";

  const statusLabel =
    status === "healthy" ? "Operational" :
    status === "degraded" ? "Degraded" :
    "Unreachable";

  return (
    <div className="flex items-center gap-3">
      <span
        className="relative inline-flex h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: dotColor }}
      >
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: dotColor, opacity: 0.7 }}
        />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-2xs font-mono font-medium text-white/70">
          {statusLabel}
        </span>
        <span className="text-2xs font-mono text-white/60">
          {status === "down"
            ? error
            : latency !== null
              ? `${latency} ms`
              : "checking…"}
          {lastChecked && ` · ${lastChecked.toLocaleTimeString()}`}
        </span>
      </div>
    </div>
  );
}
