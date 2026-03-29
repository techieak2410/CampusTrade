import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EditListingModal from './EditListingModal';
import UserProfileModal from './UserProfileModal';
import ImageLightbox from './ImageLightbox';

const CONDITION_BADGE = {
  New: { label: 'New', color: '#1a8917', bg: 'rgba(26,137,23,0.1)' },
  Good: { label: 'Good', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  Poor: { label: 'Poor', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
};

const AVATAR_COLORS = ['#1a8917', '#d97706', '#2563eb', '#dc2626', '#7c3aed'];
const avatarColor = (name = '') =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ListingCard({ listing, onRefresh }) {
  const { user } = useAuth();
  const { itemName, category, description, condition, price, imageName, status, ownerId, createdAt } = listing;
  const ownerName = ownerId?.name || 'Campus Student';
  const badge = CONDITION_BADGE[condition] || CONDITION_BADGE.Good;

  const isOwner = user && ownerId && (user._id === ownerId._id || user._id === ownerId);

  const [showEdit, setShowEdit] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  const imageUrl = imageName || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80';

  return (
    <>
      <article className="listing-card">
        <div className="listing-content">
          <div className="listing-meta">
            <div className="seller-avatar" style={{ backgroundColor: avatarColor(ownerName) }}>
              {ownerName.charAt(0).toUpperCase()}
            </div>
            <button
              className="seller-name seller-name-btn"
              onClick={() => setShowProfile(true)}
              title={`View ${ownerName}'s profile`}
            >
              {ownerName}
            </button>
            <span className="meta-dot">·</span>
            <span>{formatDate(createdAt)}</span>
            {status === 'Sold' && <span className="badge-sold">Sold</span>}
          </div>

          <h2 className="listing-title">{itemName}</h2>
          <p className="listing-desc">{description}</p>

          <div className="listing-footer">
            <div className="listing-tags">
              <span className="tag">{category.replace('_', ' ')}</span>
              <span
                className="tag condition-tag"
                style={{ color: badge.color, background: badge.bg }}
              >
                {badge.label}
              </span>
            </div>
            <span className="listing-price">₹{price.toLocaleString('en-IN')}</span>
          </div>

          {isOwner && (
            <div className="listing-owner-actions">
              <button
                className="owner-action-btn edit-btn"
                onClick={() => setShowEdit(true)}
              >
                ✏️ Edit
              </button>
            </div>
          )}
        </div>

        <div className="listing-image-wrapper">
          <img
            src={imageUrl}
            alt={itemName}
            className="listing-image listing-image-clickable"
            loading="lazy"
            onClick={() => setShowLightbox(true)}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80';
            }}
          />
          <button
            className="image-zoom-hint"
            onClick={() => setShowLightbox(true)}
            aria-label="View full image"
          >
            🔍
          </button>
        </div>
      </article>

      {showEdit && (
        <EditListingModal
          listing={listing}
          onClose={() => setShowEdit(false)}
          onSuccess={() => { setShowEdit(false); onRefresh?.(); }}
        />
      )}

      {showProfile && ownerId && (
        <UserProfileModal
          userId={ownerId._id || ownerId}
          onClose={() => setShowProfile(false)}
        />
      )}

      {showLightbox && (
        <ImageLightbox
          src={imageUrl}
          alt={itemName}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </>
  );
}
