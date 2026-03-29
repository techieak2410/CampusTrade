import { useState, useEffect } from 'react';
import { getUserById } from '../services/api';

const AVATAR_COLORS = ['#1a8917', '#d97706', '#2563eb', '#dc2626', '#7c3aed'];
const avatarColor = (name = '') =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export default function UserProfileModal({ userId, onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError('');
    getUserById(userId)
      .then(setProfile)
      .catch((err) => setError(err.message || 'Failed to load profile'))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {loading && (
          <div className="profile-loading">
            <div className="profile-skel profile-skel-avatar" />
            <div className="profile-skel profile-skel-name" />
            <div className="profile-skel profile-skel-detail" />
            <div className="profile-skel profile-skel-detail" />
          </div>
        )}

        {error && (
          <div className="profile-error">
            <span className="profile-error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && profile && (
          <div className="profile-content">
            <div
              className="profile-avatar-large"
              style={{ backgroundColor: avatarColor(profile.name) }}
            >
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="profile-name">{profile.name}</h2>

            <div className="profile-details">
              <div className="profile-detail-row">
                <span className="profile-detail-label">📧 Email</span>
                <span className="profile-detail-value">{profile.email}</span>
              </div>
              {profile.sic && (
                <div className="profile-detail-row">
                  <span className="profile-detail-label">🎓 SIC</span>
                  <span className="profile-detail-value">{profile.sic}</span>
                </div>
              )}
              {profile.mobile && (
                <div className="profile-detail-row">
                  <span className="profile-detail-label">📱 Mobile</span>
                  <span className="profile-detail-value">{profile.mobile}</span>
                </div>
              )}
              <div className="profile-detail-row">
                <span className="profile-detail-label">📅 Joined</span>
                <span className="profile-detail-value">
                  {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
