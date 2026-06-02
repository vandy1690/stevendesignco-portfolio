import React from 'react';

type Ring = {
  radius: number;
  chipSize: number;
  duration: string;
  direction: 'normal' | 'reverse';
  merchants: string[];
};

const RINGS: Ring[] = [
  {
    radius: 340,
    chipSize: 96,
    duration: '44s',
    direction: 'normal',
    merchants: ['Alibaba', 'Aliexpress', 'BestBuy', 'Canva', 'Chewy', 'DisneyPlus', 'Fanduel'],
  },
  {
    radius: 240,
    chipSize: 84,
    duration: '30s',
    direction: 'reverse',
    merchants: ['Gap', 'HomeDepot', 'LEGO', 'LinkedIn', 'MicrosoftSurface', 'Nintendo'],
  },
  {
    radius: 150,
    chipSize: 72,
    duration: '20s',
    direction: 'normal',
    merchants: ['Spotify', 'Starbucks', 'Target', 'TikTokShop', 'Xbox', 'HM'],
  },
];

const ASSET_BASE = '/images/case-studies/paypal';

interface PayPalHeroProps {
  className?: string;
}

const PayPalHero: React.FC<PayPalHeroProps> = ({ className = '' }) => {
  return (
    <div className={`pp-hero ${className}`}>
      <style>{`
        .pp-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pp-stage {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .pp-center {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 220px;
          height: 220px;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          animation: pp-breath 6s ease-in-out infinite alternate;
          filter: drop-shadow(0 24px 48px var(--lime-glow, rgba(204, 255, 0, 0.18)));
        }
        .pp-center img {
          width: 100%;
          height: auto;
        }
        /* Light mode: PayPal logo black, no glow */
        @media (prefers-color-scheme: light) {
          :root:not([data-theme="dark"]) .pp-center { filter: none; }
          :root:not([data-theme="dark"]) .pp-center img { filter: brightness(0); }
        }
        :root[data-theme="light"] .pp-center { filter: none; }
        :root[data-theme="light"] .pp-center img { filter: brightness(0); }
        .pp-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .pp-ring--spin-cw  { animation: pp-spin-cw  var(--pp-dur) linear infinite; }
        .pp-ring--spin-ccw { animation: pp-spin-ccw var(--pp-dur) linear infinite; }

        .pp-chip {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--pp-size);
          height: var(--pp-size);
          margin-left: calc(var(--pp-size) / -2);
          margin-top: calc(var(--pp-size) / -2);
          transform: translate(var(--pp-x), var(--pp-y));
        }
        .pp-chip__inner {
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          background: #ffffff;
          box-shadow:
            0 6px 14px rgba(15, 23, 42, 0.10),
            0 1px 2px rgba(15, 23, 42, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14%;
          box-sizing: border-box;
        }
        .pp-chip__inner--counter-cw  { animation: pp-counter-cw  var(--pp-dur) linear infinite; }
        .pp-chip__inner--counter-ccw { animation: pp-counter-ccw var(--pp-dur) linear infinite; }
        .pp-chip__inner img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        /* Brand-colored chips: drop shadow, fill the circle with brand color */
        .pp-chip__inner--linkedin,
        .pp-chip__inner--lego,
        .pp-chip__inner--homedepot,
        .pp-chip__inner--gap,
        .pp-chip__inner--nintendo {
          box-shadow: none;
          padding: 16%;
        }
        .pp-chip__inner--linkedin   { background: #0A66C2; }
        .pp-chip__inner--lego       { background: #E3000B; }
        .pp-chip__inner--homedepot  { background: #F96302; }
        .pp-chip__inner--gap        { background: #002A5F; }
        .pp-chip__inner--nintendo   { background: #E60012; padding: 8%; }
        /* Microsoft mark fills the chip more aggressively */
        .pp-chip__inner--microsoftsurface { padding: 22%; }

        @keyframes pp-breath {
          from { transform: translate(-50%, -50%) scale(1); }
          to   { transform: translate(-50%, -50%) scale(1.03); }
        }
        @keyframes pp-spin-cw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pp-spin-ccw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes pp-counter-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes pp-counter-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pp-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pp-center,
          .pp-ring,
          .pp-chip__inner {
            animation: pp-fade-in 600ms ease-out forwards !important;
          }
          .pp-center { transform: translate(-50%, -50%) !important; }
          .pp-ring   { transform: translate(-50%, -50%) !important; }
        }

        @media (max-width: 880px) {
          .pp-stage {
            transform: scale(0.5);
            transform-origin: center center;
          }
        }
        @media (max-width: 720px) {
          .pp-center { width: 150px; height: 150px; }
        }
      `}</style>

      <div className="pp-stage">
        <div className="pp-center">
          <img src={`${ASSET_BASE}/PayPal.svg`} alt="PayPal" />
        </div>

        {RINGS.map((ring, ringIdx) => {
          const ringClass =
            ring.direction === 'normal' ? 'pp-ring--spin-cw' : 'pp-ring--spin-ccw';
          const counterClass =
            ring.direction === 'normal'
              ? 'pp-chip__inner--counter-cw'
              : 'pp-chip__inner--counter-ccw';
          const size = ring.radius * 2;
          const angleStep = 360 / ring.merchants.length;

          return (
            <div
              key={ringIdx}
              className={`pp-ring ${ringClass}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                ['--pp-dur' as string]: ring.duration,
              }}
              aria-hidden="true"
            >
              {ring.merchants.map((name, i) => {
                const angle = angleStep * i - 90;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * ring.radius;
                const y = Math.sin(rad) * ring.radius;

                return (
                  <div
                    key={name}
                    className="pp-chip"
                    style={{
                      ['--pp-size' as string]: `${ring.chipSize}px`,
                      ['--pp-x' as string]: `${x}px`,
                      ['--pp-y' as string]: `${y}px`,
                    }}
                  >
                    <div
                      className={`pp-chip__inner ${counterClass} pp-chip__inner--${name.toLowerCase()}`}
                      style={{ ['--pp-dur' as string]: ring.duration }}
                    >
                      <img src={`${ASSET_BASE}/${name}.svg`} alt={name} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PayPalHero;
