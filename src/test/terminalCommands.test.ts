import { describe, it, expect } from 'vitest';

describe('terminalCommands', () => {
  it('registerCommands returns a registry with expected commands', async () => {
    const { registerCommands } = await import('../lib/terminalCommands');
    const registry = registerCommands();
    expect(registry).toBeDefined();
    expect(registry['whoami']).toBeDefined();
    expect(registry['help']).toBeDefined();
    expect(registry['clear']).toBeDefined();
  });

  it('whoami command returns user info', async () => {
    const { registerCommands } = await import('../lib/terminalCommands');
    const registry = registerCommands();
    const result = registry['whoami'].run('');
    expect(result).toBeDefined();
    expect(result?.type).toBe('info');
    expect(typeof result?.text).toBe('string');
    expect((result?.text as string)).toContain('Yusuf');
  });

  it('help command lists available commands', async () => {
    const { registerCommands } = await import('../lib/terminalCommands');
    const registry = registerCommands();
    const result = registry['help'].run('');
    expect(result?.type).toBe('info');
    expect(typeof result?.text).toBe('string');
  });

  it('clear command returns __CLEAR__ marker', async () => {
    const { registerCommands } = await import('../lib/terminalCommands');
    const registry = registerCommands();
    const result = registry['clear'].run('');
    expect(result?.text).toBe('__CLEAR__');
  });
});