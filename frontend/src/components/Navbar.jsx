import { useState } from 'react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const AVATAR_COLORS = ['#1a8917', '#d97706', '#2563eb', '#dc2626', '#7c3aed'];
const avatarColor = (name = '') =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export default function Navbar({ onSignIn, onPostListing }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logo} alt="CampusTrade Logo" className="brand-logo" />
          <span className="brand-name">CampusTrade</span>
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <button className="nav-btn cta-btn" onClick={onPostListing}>+ List Item</button>

              {/* Profile avatar with dropdown */}
              <div className="nav-profile-wrapper">
                <button
                  className="nav-avatar-btn"
                  style={{ backgroundColor: avatarColor(user.name) }}
                  onClick={toggleDropdown}
                  aria-label="Profile menu"
                  title={user.name}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </button>

                {dropdownOpen && (
                  <>
                    <div className="nav-dropdown-backdrop" onClick={closeDropdown} />
                    <div className="nav-dropdown">
                      <div className="nav-dropdown-header">
                        <div
                          className="nav-dropdown-avatar"
                          style={{ backgroundColor: avatarColor(user.name) }}
                        >
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="nav-dropdown-name">{user.name}</p>
                          <p className="nav-dropdown-email">{user.email}</p>
                        </div>
                      </div>
                      {user.sic && (
                        <div className="nav-dropdown-detail">
                          <span>🎓</span>
                          <span>SIC: {user.sic}</span>
                        </div>
                      )}
                      {user.mobile && (
                        <div className="nav-dropdown-detail">
                          <span>📱</span>
                          <span>{user.mobile}</span>
                        </div>
                      )}
                      <hr className="nav-dropdown-divider" />
                      <button
                        className="nav-dropdown-signout"
                        onClick={() => { closeDropdown(); logout(); }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <button className="nav-btn auth-btn" onClick={onSignIn}>Sign In</button>
              <button className="nav-btn cta-btn" onClick={onPostListing}>Post a Listing</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
