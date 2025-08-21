// components/CoolButton.tsx
import React from "react";

// Define props for the button component
interface CoolButtonProps {
	onClick: () => void;
	children: React.ReactNode;
	disabled?: boolean; // Optional prop for accessibility
}

/**
 * A highly enticing black button component optimized for dark mode.
 * Features:
 * - Black background with white text for high contrast in dark environments.
 * - Subtle glowing border effect using neon-blue box-shadows that intensify on hover.
 * - Smooth animations: scale up slightly on hover, pulse glow for allure.
 * - Active state: subtle press-down effect for tactile feedback.
 * - UX considerations:
 *   - Accessible: Supports keyboard navigation (focus state with outline), ARIA attributes, and disabled state.
 *   - Responsive: Scales well on mobile/desktop; touch-friendly size.
 *   - Enticing: Glow pulses gently to draw attention, making users want to press it.
 *   - Dark mode native: Designed for dark backgrounds; glow pops without overwhelming.
 * - Usage: <CoolButton onClick={handleClick}>Press Me</CoolButton>
 */
const CoolButton: React.FC<CoolButtonProps> = ({
	onClick,
	children,
	disabled = false,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			aria-disabled={disabled}
			className={`
        relative px-6 py-3 text-lg font-bold text-white bg-black rounded-lg
        border-2 border-transparent
        shadow-lg
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-[0_0_15px_rgba(0,123,255,0.8),0_0_30px_rgba(0,123,255,0.5)]
        active:scale-95 active:shadow-inner
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        animate-pulse-glow // Custom animation class
      `}
		>
			{children}
		</button>
	);
};

// Add global styles or use a CSS module/CSS-in-JS for the animation.
// In your global CSS (e.g., globals.css in Next.js), add:

export default CoolButton;
