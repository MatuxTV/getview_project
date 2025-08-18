import React from "react";

// Base SVG wrapper komponent
interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// Reštaurácia ikona
export const RestaurantIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#ef4444",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pin tvar */}
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      fill={color}
    />
    {/* Vnútorná ikona - príbor */}
    <g transform="translate(8.5, 6)">
      <path
        d="M1 0V4M3 0V2C3 2.5 2.5 3 2 3H1M6 0V6M6 6L4 4"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  </svg>
);

// Hrad ikona
export const CastleIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#dc2626",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pin tvar */}
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      fill={color}
    />
    {/* Vnútorná ikona - hrad */}
    <g transform="translate(8, 6)">
      <rect x="0" y="2" width="8" height="4" fill="white" />
      <rect x="1" y="0" width="1" height="2" fill="white" />
      <rect x="3" y="0" width="1" height="2" fill="white" />
      <rect x="5" y="0" width="1" height="2" fill="white" />
      <rect x="7" y="0" width="1" height="2" fill="white" />
      <rect x="2.5" y="4" width="1" height="2" fill={color} />
      <rect x="5.5" y="4" width="1" height="2" fill={color} />
    </g>
  </svg>
);

// Hora ikona
export const MountainIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#059669",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pin tvar */}
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      fill={color}
    />
    {/* Vnútorná ikona - hory outline štýl */}
    <g transform="translate(7.5, 5.5)">
      {/* Veľká hora vpravo */}
      <path
        d="M5.5 1L8.5 7H2.5L5.5 1Z"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Menšia hora vľavo */}
      <path
        d="M2.5 3L4.5 7H0.5L2.5 3Z"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

// Slnko ikona
export const SunIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#f59e0b",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pin tvar */}
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      fill={color}
    />
    {/* Vnútorná ikona - slnko */}
    <g transform="translate(9, 6)">
      <circle cx="3" cy="3" r="1.5" fill="white"/>
      <path
        d="M3 0V1M3 5V6M6 3H5M1 3H0M5.12 0.88L4.41 1.59M1.59 4.41L0.88 5.12M5.12 5.12L4.41 4.41M1.59 1.59L0.88 0.88"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
export const SpecialIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#8b5cf6",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pin tvar */}
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      fill={color}
    />
    {/* Vnútorná ikona - hviezda */}
    <g transform="translate(8.5, 5.5)">
      <path
        d="M3.5 0L4.4 2.6L7 2.6L5.05 4.2L5.95 6.8L3.5 5.2L1.05 6.8L1.95 4.2L0 2.6L2.6 2.6L3.5 0Z"
        fill="white"
      />
    </g>
  </svg>
);

// Východzia ikona
export const DefaultIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#3b82f6",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pin tvar */}
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      fill={color}
    />
    {/* Vnútorná ikona - bod */}
    <circle cx="12" cy="9" r="2.5" fill="white" />
  </svg>
);

// Ikona pre pridávanie nových miest
export const NewPlaceIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#ef4444",
  className,
}) => (
  <div className="relative inline-block">
    {/* Hlavný pin */}
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z"
        fill={color}
      />
      {/* Plus ikona v strede */}
      <g transform="translate(9, 6)">
        <path
          d="M3 1V5M1 3H5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>

    {/* Animované kruhy - pulzovanie */}
    <div className="absolute inset-0 animate-ping opacity-75">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="9"
          r="8"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.4"
        />
      </svg>
    </div>

    {/* Druhý animovaný kruh s oneskorením */}
    <div className="absolute inset-0 animate-ping opacity-50" style={{ animationDelay: '0.5s' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="9"
          r="10"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    </div>

    {/* Tretí animovaný kruh */}
    <div className="absolute inset-0 animate-ping opacity-25" style={{ animationDelay: '1s' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="9"
          r="12"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.2"
        />
      </svg>
    </div>
  </div>
);

// Užívateľ ikona (pre polohu užívateľa)
export const UserLocationIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#3b82f6",
  className,
}) => (
  <div className="relative inline-block">
    {/* Prvá vlna - rozširuje sa */}
    <div className="absolute inset-0 animate-ping">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="6"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.6"
        />
      </svg>
    </div>

    {/* Druhá vlna - s oneskorením */}
    <div className="absolute inset-0 animate-ping" style={{ animationDelay: '1s' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>

    {/* Tretia vlna - najpomalšia */}
    <div className="absolute inset-0 animate-ping" style={{ animationDelay: '2s' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.2"
        />
      </svg>
    </div>

    {/* Hlavná ikona - stred kvapky */}
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="white"
        stroke="#e5e7eb"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  </div>
);

// Export všetkých ikon naraz
export const MapIcons = {
  restaurant: RestaurantIcon,
  castle: CastleIcon,
  mountain: MountainIcon,
  sun: SunIcon,
  default: DefaultIcon,
  userLocation: UserLocationIcon,
  special: SpecialIcon,
  newPlace: NewPlaceIcon,
};

// Typ pre kategórie ikon
export type IconCategory = keyof typeof MapIcons;