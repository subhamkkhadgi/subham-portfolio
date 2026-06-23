// Centralized API service for the portfolio frontend.
// Uses VITE_API_URL (set in .env) and falls back to the local Laravel dev server.

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, '') ||
  'http://localhost:8000/api';

/**
 * Internal helper. Throws a clean error when the response is not OK,
 * and parses JSON otherwise.
 */
async function request(path) {
  const url = `${API_BASE}/portfolio${path}`;
  let response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
  } catch (networkError) {
    throw new Error(
      `Network error contacting backend at ${url}. Is the Laravel server running on port 8000?`
    );
  }

  if (!response.ok) {
    throw new Error(
      `Backend returned ${response.status} ${response.statusText} for ${url}`
    );
  }

  return response.json();
}

/**
 * Fetches the full portfolio payload in one request.
 * Used by the front page to render every section at once.
 */
export async function fetchPortfolio() {
  return request('/');
}

export const api = {
  base: API_BASE,
  fetchPortfolio,
  fetchHero:      () => request('/hero'),
  fetchAbout:     () => request('/about'),
  fetchEducation: () => request('/education'),
  fetchSkills:    () => request('/skills'),
  fetchProjects:  () => request('/projects'),
  fetchContact:   () => request('/contact'),
  fetchSettings:  () => request('/settings'),
};

export default api;
