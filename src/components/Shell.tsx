import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { registerCommands, type CommandOutput } from '../lib/terminalCommands';

const registry = registerCommands();

function formatOutput(out: CommandOutput, idx: number) {
  if (out.type === 'json') return <pre key={idx} className="text-cyan-400/80 whitespace-pre-wrap break-all">{JSON.stringify(out.text, null, 2)}</pre>;
  const color = out.type === 'error' ? 'text-red-400' : out.type === 'success' ? 'text-emerald-400' : 'text-white/70';
  return <div key={idx} className={color}>{out.text as string}</div>;
}

export default function Shell() {
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<CommandOutput[]>([]);
  const [isInteractive, setIsInteractive] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const [histIdx, setHistIdx] = useState(-1);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [output]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setHistory(h => [...h, trimmed]);
    setHistIdx(-1);
    setDraft('');
    if (trimmed === 'clear') { setOutput([]); return; }
    const exact = registry[trimmed];
    if (exact) {
      const res = exact.run(trimmed);
      if (res?.text === '__CLEAR__') { setOutput([]); return; }
      if (res) setOutput(o => [...o, res]);
      return;
    }
    const prefix = trimmed.split(' ')[0];
    const matches = Object.keys(registry).filter(c => c.startsWith(prefix) && c !== prefix);
    if (matches.length === 1) {
      const res = registry[matches[0]].run(trimmed);
      if (res?.text === '__CLEAR__') { setOutput([]); return; }
      if (res) setOutput(o => [...o, res]);
      return;
    }
    setOutput(o => [...o, { type: 'error' as const, text: matches.length ? `Did you mean?\n  ${matches.join('\n  ')}` : `Command not found: ${trimmed}` }]);
  };

  const onSubmit = (e: FormEvent) => { e.preventDefault(); if (draft.trim()) run(draft); };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = history.length === 0 ? 0 : (histIdx <= 0 ? history.length - 1 : histIdx - 1);
      setHistIdx(next);
      if (history[next]) setDraft(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = history.length === 0 ? 0 : (histIdx + 1) % history.length;
      setHistIdx(next);
      if (history[next]) setDraft(history[next]);
    }
  };

  return (
    <div className="glow-card">
      <div className="rounded-2xl overflow-hidden bg-[#0a0a14] border border-white/[0.08] shadow-2xl shadow-black/70 scanline">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0e0e1a] border-b border-white/[0.06]">
          <span className="w-3 h-3 rounded-full bg-red-500/65" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/65" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/65" />
          <span className="flex-1 text-center font-mono text-xs text-white/55">yusuf@portfolio:~</span>
          <span className="text-2xs font-mono text-violet-400/50 border border-violet-500/20 px-1.5 py-0.5 rounded">sh</span>
        </div>

        <div className={`p-4 font-mono text-2xs leading-[1.7] overflow-y-auto max-h-[320px] ${isInteractive ? '' : 'hidden md:block'}`}>
          {output.length === 0 && <p className="text-white/55">Type <span className="text-cyan-400">help</span> to see available commands.</p>}
          {output.map((out, i) => formatOutput(out, i))}
          {isInteractive && (
            <form onSubmit={onSubmit} className="flex items-center gap-2 mt-2">
              <span className="text-violet-400 select-none">❯</span>
              <input ref={inputRef} type="text" value={draft} onChange={e => { setDraft(e.target.value); setHistIdx(-1); }} onKeyDown={onKey} className="flex-1 bg-transparent border-none outline-none text-white/80 caret-violet-400 placeholder-white/20 text-2xs" placeholder="type a command..." autoFocus aria-label="Terminal input" />
            </form>
          )}
          <div ref={bottomRef} />
        </div>

        {!isInteractive && (
          <div className="md:hidden text-center py-6">
            <p className="text-white/40 text-xs font-mono mb-3">Tap to see the live version</p>
            <button onClick={() => { setIsInteractive(true); inputRef.current?.focus(); }} className="px-4 py-2 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-400 text-xs font-mono hover:bg-violet-600/30 transition-all">Open interactive shell →</button>
          </div>
        )}
      </div>
    </div>
  );
}
