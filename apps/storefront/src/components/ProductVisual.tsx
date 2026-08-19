import type { ProductVisualKind } from "@/lib/catalog";

type Props = {
  kind: ProductVisualKind;
  label: string;
  compact?: boolean;
};

export function ProductVisual({ kind, label, compact = false }: Props) {
  const common = {
    role: "img" as const,
    "aria-label": label,
    viewBox: "0 0 360 280"
  };

  const art = (() => {
    switch (kind) {
      case "light":
        return (
          <svg {...common}>
            <rect x="70" y="104" width="220" height="54" rx="27" fill="#f7f1d5" stroke="#173124" strokeWidth="6" />
            <circle cx="258" cy="131" r="12" fill="#ef987b" />
            <path d="M112 86c22-23 42-29 64-31M248 86c-22-23-42-29-64-31" fill="none" stroke="#98b5a3" strokeWidth="6" strokeLinecap="round" />
            <path d="M108 180h144" stroke="#173124" strokeWidth="5" strokeLinecap="round" opacity=".24" />
          </svg>
        );
      case "bayong":
        return (
          <svg {...common}>
            <path d="M104 102h152l-20 118H124z" fill="#d9bd8b" stroke="#173124" strokeWidth="6" strokeLinejoin="round" />
            <path d="M136 106c0-55 88-55 88 0" fill="none" stroke="#173124" strokeWidth="10" strokeLinecap="round" />
            <path d="M128 132h104M125 158h110M121 184h118M148 108l-14 106M180 108v112M212 108l14 106" stroke="#9b7544" strokeWidth="4" opacity=".75" />
          </svg>
        );
      case "pili":
        return (
          <svg {...common}>
            <rect x="96" y="82" width="168" height="132" rx="22" fill="#fff" stroke="#173124" strokeWidth="6" />
            <path d="M96 118h168" stroke="#c9e7cc" strokeWidth="22" />
            <ellipse cx="150" cy="164" rx="24" ry="40" fill="#8b5a2b" transform="rotate(-20 150 164)" />
            <ellipse cx="205" cy="166" rx="24" ry="40" fill="#a56b33" transform="rotate(18 205 166)" />
            <path d="M166 112c10-18 25-26 44-27" stroke="#4a654f" strokeWidth="7" strokeLinecap="round" />
          </svg>
        );
      case "cable":
        return (
          <svg {...common}>
            <path d="M80 178c72-82 112 48 190-36" fill="none" stroke="#173124" strokeWidth="12" strokeLinecap="round" />
            <rect x="100" y="112" width="48" height="46" rx="15" fill="#c9e7cc" stroke="#173124" strokeWidth="5" />
            <rect x="204" y="132" width="48" height="46" rx="15" fill="#ef987b" stroke="#173124" strokeWidth="5" />
            <circle cx="124" cy="135" r="7" fill="#173124" />
            <circle cx="228" cy="155" r="7" fill="#173124" />
          </svg>
        );
      case "star":
        return (
          <svg {...common}>
            <path d="M180 55l28 62 68 7-51 46 15 67-60-34-60 34 15-67-51-46 68-7z" fill="#d9bd8b" stroke="#173124" strokeWidth="6" strokeLinejoin="round" />
            <path d="M180 72v128M119 130l122 39M241 130l-122 39" stroke="#9b7544" strokeWidth="5" opacity=".7" />
          </svg>
        );
      case "sealer":
        return (
          <svg {...common}>
            <rect x="94" y="116" width="172" height="64" rx="26" fill="#ef987b" stroke="#173124" strokeWidth="6" transform="rotate(-8 180 148)" />
            <rect x="126" y="124" width="74" height="13" rx="6" fill="#fff" opacity=".75" transform="rotate(-8 163 130)" />
            <circle cx="236" cy="145" r="11" fill="#173124" />
            <path d="M104 198h150" stroke="#98b5a3" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );
      case "craft":
        return (
          <svg {...common}>
            <rect x="92" y="82" width="176" height="136" rx="20" fill="#f7f1d5" stroke="#173124" strokeWidth="6" />
            <path d="M122 174l38-51 33 38 24-29 26 42z" fill="#98b5a3" />
            <circle cx="222" cy="116" r="16" fill="#ef987b" />
            <path d="M122 110h58M122 126h39" stroke="#173124" strokeWidth="5" strokeLinecap="round" opacity=".55" />
          </svg>
        );
      case "basket":
        return (
          <svg {...common}>
            <path d="M112 118h136l-18 106H130z" fill="#d9bd8b" stroke="#173124" strokeWidth="6" />
            <path d="M143 116c4-48 70-48 74 0" fill="none" stroke="#9b7544" strokeWidth="7" strokeLinecap="round" />
            <path d="M180 113c-4-44 17-65 37-82M180 114c-12-42-37-55-61-63M182 115c18-35 50-39 72-31" fill="none" stroke="#4a654f" strokeWidth="10" strokeLinecap="round" />
            <path d="M128 150h104M124 177h112M144 120l-11 97M180 120v104M216 120l11 97" stroke="#9b7544" strokeWidth="4" opacity=".65" />
          </svg>
        );
    }
  })();

  return <div className={`product-visual product-visual--${kind} ${compact ? "product-visual--compact" : ""}`}>{art}</div>;
}
