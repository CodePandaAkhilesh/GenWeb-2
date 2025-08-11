import '../styles/Sidebar.css';
import { useNavigate } from 'react-router-dom';
// import DarkModeToggle from './DarkModeToggle'; // Optional: Uncomment if needed

/**
 * Sidebar Component
 * -----------------
 * Provides navigation and utility controls such as:
 * - Starting a new chat session
 * - Viewing history (feature placeholder)
 * - Upgrade button (for premium features)
 * 
 * The `+ New Chat` button resets the current session by navigating to /home
 * and reloading the page to reset all state.
 */

const Sidebar = () => {
  const navigate = useNavigate();

  /**
   * Handles new chat creation by navigating to the home page
   * and force-reloading the application to clear current session state.
   */
  const handleNewChat = () => {
    navigate('/home'); // Navigate to home route
    window.location.reload(); // Force reload to reset any existing UI state
  };

  return (
    <div className="sidebar">
      <div>
        {/* Branding / Logo Section */}
        <div className="sidebar-logo">
          🧠 <span className="brand">MyGen</span>
        </div>

        {/* Primary Action Buttons */}
        <button className="new-chat" onClick={handleNewChat}>
          + New Chat
        </button>
        <button className="history">
          History
        </button>
      </div>

      {/* Bottom Section with Upgrade CTA */}
      <div className="sidebar-bottom">
        <button className="upgrade-btn">
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
