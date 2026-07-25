export interface CommandOutput {
  type: 'info' | 'error' | 'success' | 'json';
  text: string | object;
}

type Cmd = { desc: string; run: (input: string) => CommandOutput | void };

import { EXPERTISE, PROFILE, PROJECTS } from '../data/profile';

export function registerCommands() {
  const registry: Record<string, Cmd> = {};

  const add = (name: string, desc: string, fn: (input: string) => CommandOutput | void) => {
    registry[name] = { desc, run: fn };
  };

  add('whoami', 'Print current user', () => ({ type: 'info', text: `${PROFILE.name} — ${PROFILE.title} · ${PROFILE.location}` }));
  add('help', 'List available commands', () => ({ type: 'info', text: Object.entries(registry).map(([n, c]) => `  ${n.padEnd(16)} ${c.desc}`).join('\n') }));
  add('ls', 'List available commands', () => {
    const entries = Object.entries(registry).filter(([k]) => !k.startsWith('open '));
    return { type: 'info', text: 'commands:\n  ' + entries.map(([n, c]) => `${n.padEnd(16)} ${c.desc}`).join('\n  ') };
  });
  add('cat skills.json', 'Show skills as JSON', () => {
    const skills: Record<string, string[]> = {};
    EXPERTISE.forEach(e => {
      skills[e.title] = e.desc.split(', ').map(s => s.trim());
    });
    return { type: 'json', text: skills };
  });
  add('curl /api/stripe/webhook', 'Mock a signed Stripe webhook payload', () => {
    const evtId = `evt_${Date.now().toString(36)}`;
    const piId = `pi_${Date.now().toString(36)}`;
    const project = PROJECTS[0];
    return {
      type: 'json',
      text: {
        id: evtId,
        object: 'event',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: piId,
            status: 'succeeded',
            amount: project ? 49900 : 0,
            currency: 'usd',
            metadata: { order_id: `ord_${PROFILE.name.replace(/\s+/g, '_').toLowerCase()}`, project: project?.name ?? '' }
          }
        },
        signature_header: `t=${Math.floor(Date.now() / 1000)},v1=${evtId.slice(-16)}`
      }
    };
  });
  add('clear', 'Clear terminal output', () => ({ type: 'info', text: '__CLEAR__' }));

  return registry;
}