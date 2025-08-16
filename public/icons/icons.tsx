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
    <path
      d="M8.1 13.34L2.91 8.15C2.52 7.76 2.52 7.13 2.91 6.74C3.3 6.35 3.93 6.35 4.32 6.74L8.1 10.52V13.34ZM14.88 11.53C14.88 9.03 12.85 7 10.35 7C7.85 7 5.82 9.03 5.82 11.53C5.82 11.67 5.84 11.8 5.86 11.93L8.1 14.17V21C8.1 21.55 8.55 22 9.1 22H11.6C12.15 22 12.6 21.55 12.6 21V14.17L14.84 11.93C14.86 11.8 14.88 11.67 14.88 11.53ZM18.19 2L16.78 3.41L18.9 5.53L20.31 4.12L18.19 2ZM17.48 6.95L16.07 8.36L18.19 10.48L19.6 9.07L17.48 6.95Z"
      fill={color}
    />
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
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z"
      fill={color}
    />
  </svg>
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
  default: DefaultIcon,
  userLocation: UserLocationIcon,
};

// Typ pre kategórie
export type IconCategory = keyof typeof MapIcons;
