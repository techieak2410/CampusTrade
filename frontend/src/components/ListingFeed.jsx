import ListingCard from './ListingCard';

export default function ListingFeed({ listings, loading, error, onRefresh }) {
  if (loading) {
    return (
      <div className="feed-state">
        <div className="skeleton-wrapper">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card">
              <div className="skeleton-content">
                <div className="skel skel-meta" />
                <div className="skel skel-title" />
                <div className="skel skel-title skel-title-short" />
                <div className="skel skel-desc" />
                <div className="skel skel-desc skel-desc-short" />
              </div>
              <div className="skel skel-image" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-state empty-state">
        <p className="empty-icon">⚠️</p>
        <h3>Couldn't load listings</h3>
        <p className="empty-msg">Make sure the backend server is running on port 3001.</p>
        <p className="empty-detail">{error}</p>
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="feed-state empty-state">
        <p className="empty-icon">🔍</p>
        <h3>No listings found</h3>
        <p className="empty-msg">Be the first to post something in this category!</p>
      </div>
    );
  }

  return (
    <section className="feed">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} onRefresh={onRefresh} />
      ))}
    </section>
  );
}
