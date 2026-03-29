import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postListing } from '../services/api';

const CATEGORIES = ['Book', 'Engineering_Equipment', 'Stationery', 'Electronics', 'Sports', 'Equipment', 'Clothing', 'Other'];
const CONDITIONS = ['New', 'Good', 'Poor'];

export default function PostListingModal({ onClose, onSuccess }) {
  const { token } = useAuth();
  const [form, setForm] = useState({ itemName: '', category: 'Book', description: '', condition: 'New', price: '', status: 'Available' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!token) { setError('You must be signed in to post a listing.'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('imageName', image);
      await postListing(fd, token);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to post listing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-box--wide" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">Post a Listing</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Item Name</label>
              <input type="text" name="itemName" placeholder="e.g. Data Structures Book" value={form.itemName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" name="price" placeholder="e.g. 250" value={form.price} onChange={handleChange} required min="0" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Condition</label>
              <select name="condition" value={form.condition} onChange={handleChange}>
                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Describe the item..." value={form.description} onChange={handleChange} required rows={3} />
          </div>

          <div className="form-group">
            <label>Image (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
