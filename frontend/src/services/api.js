const BASE_URL = 'http://localhost:3001';

// ─── Listings ───────────────────────────────────────────────

export async function fetchListings() {
  const res = await fetch(`${BASE_URL}/Listings`);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}

export async function fetchListingById(id) {
  const res = await fetch(`${BASE_URL}/Listings/${id}`);
  if (!res.ok) throw new Error('Listing not found');
  return res.json();
}

export async function postListing(formData, token) {
  const res = await fetch(`${BASE_URL}/Listings`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Do NOT set Content-Type — browser sets it with the correct multipart boundary
    },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to post listing');
  }
  return res.json();
}

export async function updateListing(id, formData, token) {
  const res = await fetch(`${BASE_URL}/Listings/${id}`, {
    method: 'PATCH',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Do NOT set Content-Type — browser sets multipart boundary
    },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update listing');
  }
  return res.json();
}

export async function deleteListing(id, token) {
  const res = await fetch(`${BASE_URL}/Listings/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to delete listing');
  }
  return res.json();
}

// ─── Users ───────────────────────────────────────────────────

/**
 * Register — backend expects: { name, mobile, email, sic, password }
 * Backend returns:            { message, user: { _id, name, email } }
 */
export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:     data.name,
      mobile:   Number(data.mobile),
      email:    data.email,
      sic:      data.sic,
      password: data.password,
    }),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message || 'Registration failed');
  return { user: body.user, token: null };
}

/**
 * Login — backend expects: { email, password }
 * Backend returns:          { message, token, user: { _id, name, email, sic, mobile } }
 */
export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: data.email, password: data.password }),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message || 'Login failed');
  return { user: body.user, token: body.token };
}

/**
 * Get current logged-in user (protected)
 */
export async function getCurrentUser(token) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
}

/**
 * Get a user by their ID (public)
 */
export async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error('User not found');
  return res.json();
}
