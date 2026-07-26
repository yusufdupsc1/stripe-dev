import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";

const EMAIL = "yusufdupsc1@gmail.com";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Hire" },
];

export interface CommandPaletteRef {
  open: () => void;
}

export default function CommandPalette({ innerRef }: { innerRef?: React.Ref<CommandPaletteRef> }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<string>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") || "dark";
    }
    return "dark";
  });
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useImperativeHandle(innerRef, () => ({
    open: () => {
      triggerRef.current?.focus();
      setOpen(true);
    },
  }));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setOpen(false);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    setOpen(false);
  };

  const run = (value: string) => {
    setOpen(false);
    if (value.startsWith("theme:")) {
      toggleTheme();
      return;
    }
    if (value === "email") {
      copyEmail();
      return;
    }
    if (value === "webhook") {
      navigate("/projects/stripe-dev");
      return;
    }
    if (value.startsWith("section:")) {
      const id = value.replace("section:", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (value === "github") {
      window.open("https://github.com/yusufdupsc1", "_blank", "noopener,noreferrer");
      return;
    }
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          triggerRef.current?.focus();
        }
      }}
      className="glass fixed inset-0 z-[100] flex items-start justify-center pt-[25vh]"
    >
      <div className="w-full max-w-xl mx-4 rounded-2xl overflow-hidden shadow-2xl">
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Type a command..."
          className="w-full bg-transparent px-4 py-3 text-sm text-[var(--c-text)] outline-none focus:ring-2 focus:ring-violet-500/50 rounded-md placeholder:text-white/25"
        />
        <Command.List className="max-h-80 overflow-y-auto px-2 pb-2">
          <Command.Empty className="py-6 text-center text-sm text-white/30">No results.</Command.Empty>

          <Command.Group heading="Jump to section">
            {SECTIONS.map(({ id, label }) => (
              <Command.Item
                key={id}
                value={`section:${id}`}
                onSelect={run}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <span className="text-white/30">#</span>
                {label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Separator className="my-2 h-px bg-white/10" />

          <Command.Group heading="Actions">
            <Command.Item value="webhook" onSelect={run} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
              <span className="text-violet-400">⚡</span>
              Trigger webhook demo
            </Command.Item>
            <Command.Item value="email" onSelect={run} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
              <span className="text-cyan-400">⎘</span>
              Copy email
            </Command.Item>
            <Command.Item value="theme" onSelect={run} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
              <span className="text-emerald-400">◐</span>
              Toggle theme
            </Command.Item>
          </Command.Group>

          <Command.Separator className="my-2 h-px bg-white/10" />

          <Command.Group heading="External">
            <Command.Item value="github" onSelect={run} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
              <span className="text-white/30">↗</span>
              GitHub
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
