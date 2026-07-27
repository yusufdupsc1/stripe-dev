import { describe, it, expect } from 'vitest';

describe('contrast utilities', () => {
  function srgbToLinear(c: number): number {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }

  function luminance(r: number, g: number, b: number): number {
    return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
  }

  function hexToRgb(hex: string) {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    };
  }

  function contrastRatio(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }) {
    const aL = luminance(a.r, a.g, a.b);
    const bL = luminance(b.r, b.g, b.b);
    const lighter = Math.max(aL, bL);
    const darker = Math.min(aL, bL);
    return (lighter + 0.05) / (darker + 0.05);
  }

  it('srgbToLinear converts sRGB to linear correctly', () => {
    expect(srgbToLinear(0)).toBeCloseTo(0, 5);
    expect(srgbToLinear(255)).toBeCloseTo(1, 5);
    expect(srgbToLinear(128)).toBeGreaterThan(0.2);
  });

  it('luminance computes relative luminance', () => {
    expect(luminance(0, 0, 0)).toBeCloseTo(0, 5);
    expect(luminance(255, 255, 255)).toBeCloseTo(1, 5);
  });

  it('hexToRgb converts hex to RGB correctly', () => {
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#7c3aed')).toEqual({ r: 124, g: 58, b: 237 });
  });

  it('contrastRatio computes ratio correctly for black/white', () => {
    const ratio = contrastRatio(hexToRgb('#ffffff'), hexToRgb('#000000'));
    expect(ratio).toBeCloseTo(21, 0);
  });

  it('contrastRatio verifies dark theme body text passes AA', () => {
    const ratio = contrastRatio(
      hexToRgb('#eaeaf8'),
      hexToRgb('#020617')
    );
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});