type VCCPLogoProps = { size?: number };

export default function VCCPLogo({ size = 48 }: VCCPLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a0a00" />
          <stop offset="100%" stopColor="#2a1800" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c97a" />
          <stop offset="50%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#9a7530" />
        </linearGradient>
      </defs>
      {/* Background shield */}
      <path d="M50 5 L90 20 L90 55 Q90 80 50 95 Q10 80 10 55 L10 20 Z" fill="url(#bgGrad)" stroke="url(#goldGrad)" strokeWidth="2" />
      {/* Inner shield */}
      <path d="M50 12 L84 25 L84 54 Q84 76 50 89 Q16 76 16 54 L16 25 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.5" />
      {/* Car silhouette */}
      <ellipse cx="50" cy="60" rx="22" ry="5" fill="#c9a84c" opacity="0.3" />
      <rect x="28" y="54" width="44" height="10" rx="3" fill="url(#goldGrad)" />
      <path d="M33 54 L38 42 Q43 38 50 38 Q57 38 62 42 L67 54 Z" fill="url(#goldGrad)" />
      <circle cx="36" cy="64" r="4" fill="#1a0a00" stroke="url(#goldGrad)" strokeWidth="1.5" />
      <circle cx="64" cy="64" r="4" fill="#1a0a00" stroke="url(#goldGrad)" strokeWidth="1.5" />
      {/* V text */}
      <text x="50" y="36" fontFamily="Georgia, serif" fontSize="12" fontWeight="bold" textAnchor="middle" fill="url(#goldGrad)">V</text>
      {/* Bottom text */}
      <text x="50" y="84" fontFamily="Arial, sans-serif" fontSize="6" fontWeight="bold" textAnchor="middle" fill="url(#goldGrad)" letterSpacing="2">VCCP</text>
    </svg>
  );
}
