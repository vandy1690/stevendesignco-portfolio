import React from 'react';

// Scattered brand tiles for the home hero. Each logo wanders across the whole
// area on its own randomized path (container units), sometimes drifting off the
// edges. PayPal sits in the middle as a bare black logo.

const ASSET_BASE = '/images/case-studies/paypal';

type Tile = { brand: string; x: number; y: number; w: number };

const CFG: Record<string, { bg?: string; pad?: string }> = {
  linkedin:         { bg: '#069', pad: '16%' },
  nintendo:         { bg: '#E60012', pad: '15%' },
  lego:             { bg: '#E3000B', pad: '20%' },
  homedepot:        { bg: '#F96302', pad: '20%' },
  gap:              { bg: '#002A5F', pad: '22%' },
  spotify:          { bg: 'transparent', pad: '6%' },
  microsoftsurface: { pad: '26%' },
  fanduel:          { pad: '9%' },
  aliexpress:       { pad: '10%' },
  tiktokshop:       { pad: '9%' },
  sharkninja:       { pad: '11%' },
  chewy:            { pad: '13%' },
  canva:            { pad: '15%' },
  xbox:             { pad: '13%' },
  alibaba:          { pad: '13%' },
  disneyplus:       { pad: '16%' },
  target:           { pad: '18%' },
};

// Starting scatter (logos wander out from here).
const TILES: Tile[] = [
  { brand: 'LinkedIn',         x: 10, y: 12, w: 14 },
  { brand: 'Spotify',          x: 30, y: 8,  w: 14 },
  { brand: 'Starbucks',        x: 50, y: 9,  w: 13 },
  { brand: 'HM',               x: 70, y: 8,  w: 13 },
  { brand: 'BestBuy',          x: 90, y: 13, w: 14 },
  { brand: 'Gap',              x: 9,  y: 33, w: 15 },
  { brand: 'Canva',            x: 31, y: 29, w: 18 },
  { brand: 'Nintendo',         x: 69, y: 29, w: 18 },
  { brand: 'Target',           x: 91, y: 34, w: 15 },
  { brand: 'HomeDepot',        x: 8,  y: 53, w: 15 },
  { brand: 'Alibaba',          x: 92, y: 53, w: 16 },
  { brand: 'Xbox',             x: 31, y: 71, w: 18 },
  { brand: 'Chewy',            x: 69, y: 71, w: 18 },
  { brand: 'LEGO',             x: 9,  y: 72, w: 14 },
  { brand: 'DisneyPlus',       x: 91, y: 72, w: 16 },
  { brand: 'Fanduel',          x: 12, y: 91, w: 14 },
  { brand: 'Aliexpress',       x: 33, y: 92, w: 14 },
  { brand: 'TikTokShop',       x: 53, y: 91, w: 15 },
  { brand: 'SharkNinja',       x: 73, y: 92, w: 15 },
  { brand: 'MicrosoftSurface', x: 91, y: 90, w: 13 },
];

// Deterministic pseudo-random (so SSR and client hydrate identically — no jump).
const rnd = (n: number) => {
  const s = Math.sin((n + 1) * 127.1) * 43758.5453;
  return s - Math.floor(s);
};
// Waypoint offset in container units, range +/- spread.
const wp = (i: number, k: number, axis: 0 | 1, spread: number) =>
  ((rnd(i * 17 + k * 3 + axis) * 2 - 1) * spread).toFixed(1);

function roamVars(i: number, spread: number): React.CSSProperties {
  const v: Record<string, string> = {};
  for (let k = 1; k <= 4; k++) {
    v[`--rx${k}`] = `${wp(i, k, 0, spread)}cqw`;
    v[`--ry${k}`] = `${wp(i, k, 1, spread)}cqh`;
  }
  return v as React.CSSProperties;
}

interface LogoScatterProps { className?: string; }

const LogoScatter: React.FC<LogoScatterProps> = ({ className = '' }) => {
  return (
    <div className={`ls-scatter ${className}`}>
      <style>{`
        .ls-scatter {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 900px;
          margin: 0 auto;
          container-type: size;
        }
        .ls-tile {
          position: absolute;
          transform: translate(-50%, -50%);
          aspect-ratio: 1 / 1;
          z-index: 1;
        }
        .ls-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.13), 0 1px 3px rgba(15, 23, 42, 0.08);
          animation: ls-roam var(--ls-dur, 26s) ease-in-out var(--ls-delay, 0s) infinite;
          will-change: transform;
        }
        .ls-inner img { width: 100%; height: 100%; object-fit: contain; display: block; }

        .ls-paypal {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: 26%;
          z-index: 3;
        }
        .ls-paypal img {
          width: 100%; height: auto; display: block;
          filter: brightness(0);
          animation: ls-roam 30s ease-in-out infinite;
          will-change: transform;
        }

        /* one path, per-logo waypoints via custom properties */
        @keyframes ls-roam {
          0%,100% { transform: translate(0, 0); }
          20% { transform: translate(var(--rx1, 0), var(--ry1, 0)); }
          40% { transform: translate(var(--rx2, 0), var(--ry2, 0)); }
          60% { transform: translate(var(--rx3, 0), var(--ry3, 0)); }
          80% { transform: translate(var(--rx4, 0), var(--ry4, 0)); }
        }
        @keyframes ls-fade-in { from { opacity: 0; } to { opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .ls-inner, .ls-paypal img { animation: ls-fade-in 600ms ease-out forwards !important; transform: none !important; }
        }
        @media (max-width: 880px) { .ls-scatter { max-width: 580px; } }
      `}</style>

      {TILES.map((t, i) => {
        const key = t.brand.toLowerCase();
        const cfg = CFG[key] || {};
        return (
          <div
            key={t.brand}
            className="ls-tile"
            style={{ left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}%` }}
          >
            <div
              className="ls-inner"
              style={{
                background: cfg.bg ?? '#ffffff',
                padding: cfg.pad ?? '22%',
                ['--ls-dur' as string]: `${22 + (i % 6) * 2.5}s`,
                ['--ls-delay' as string]: `-${((i * 3.3) % 20).toFixed(1)}s`,
                ...roamVars(i, 42),
              }}
            >
              <img src={`${ASSET_BASE}/${t.brand}.svg`} alt={t.brand} loading="lazy" />
            </div>
          </div>
        );
      })}

      <div className="ls-paypal">
        <img src={`${ASSET_BASE}/PayPal.svg`} alt="PayPal" style={roamVars(99, 24)} />
      </div>
    </div>
  );
};

export default LogoScatter;
