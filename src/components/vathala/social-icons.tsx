type SocialIconProps = {
  className?: string;
};

export const FacebookIcon = ({ className }: SocialIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path
      fill="#FFFFFF"
      d="M16.671 12.546h-2.27v7.454h-3.008V12.546H9.75v-2.623h1.643V8.04c0-1.539.735-3.04 2.852-3.04h2.09v2.623h-1.503c-.269 0-.583.328-.583.656v1.244h2.176l-.274 2.623z"
    />
  </svg>
);

export const InstagramIcon = ({ className }: SocialIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient
        id="instagram-gradient"
        cx="30%"
        cy="107%"
        r="150%"
        fx="30%"
        fy="107%"
      >
        <stop offset="0%" stopColor="#FFDD55" />
        <stop offset="25%" stopColor="#FF543E" />
        <stop offset="50%" stopColor="#C837AB" />
        <stop offset="100%" stopColor="#4158D0" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="12" fill="url(#instagram-gradient)" />
    <rect
      x="7.25"
      y="7.25"
      width="9.5"
      height="9.5"
      rx="2.4"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.35"
    />
    <circle
      cx="12"
      cy="12"
      r="2.35"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.35"
    />
    <circle cx="16.35" cy="7.65" r="0.85" fill="#FFFFFF" />
  </svg>
);

export const LinkedInIcon = ({ className }: SocialIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="#0A66C2" />
    <path
      fill="#FFFFFF"
      d="M8.52 10.08H6.24v7.44h2.28v-7.44zm-.06-2.52a1.32 1.32 0 1 0 0 2.64 1.32 1.32 0 0 0 0-2.64zm3.9 2.52H10.14v7.44h2.22v-4.02c0-1.08.84-1.98 1.92-1.98 1.08 0 1.74.9 1.74 1.98v4.02H18v-4.56c0-2.28-1.2-3.54-3.12-3.54-1.44 0-2.1.78-2.46 1.32h-.06v-1.14h-2.16v7.92z"
    />
  </svg>
);

export const YouTubeIcon = ({ className }: SocialIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="6" fill="#FF0000" />
    <path fill="#FFFFFF" d="M17.4 12L10.2 8.4v7.2L17.4 12z" />
  </svg>
);
