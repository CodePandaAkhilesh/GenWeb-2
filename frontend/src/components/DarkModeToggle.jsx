import { useEffect, useState } from 'react';
import '../styles/DarkModeToggle.css';

/**
 * DarkModeToggle Component
 * ------------------------
 * This component allows the user to toggle between light and dark themes.
 * It uses React's useState to manage theme state and useEffect to update 
 * the root HTML class based on the current mode.
 *
 * How it works:
 * - When toggled, it updates the `isDark` state.
 * - The `useEffect` hook listens for changes in `isDark`.
 * - If `isDark` is true, the `dark` class is added to the HTML root, triggering dark mode.
 * - If false, the `dark` class is removed, reverting to light mode.
 */

const DarkModeToggle = () => {
  // State to track current theme mode: true = dark, false = light
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Access root <html> element
    const root = window.document.documentElement;

    // Apply or remove 'dark' class based on isDark state
    if (isDark) {
      root.classList.add('dark');   // Enable dark mode
    } else {
      root.classList.remove('dark'); // Enable light mode
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}  // Toggle dark/light mode
      className="dark-mode-toggle"
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}  {/* Display appropriate label */}
    </button>
  );
};

export default DarkModeToggle;
