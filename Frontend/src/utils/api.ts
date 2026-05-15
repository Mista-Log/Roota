/**
 * Centralized API fetch utility with automatic auth token handling
 * All API calls should use this instead of raw fetch() to ensure tokens are sent
 */

// Default to the production backend if no VITE_API_BASE_URL is supplied
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://roota-production.up.railway.app';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

async function buildApiError(response: Response): Promise<Error> {
  let message = `API Error: ${response.status} ${response.statusText}`;

  try {
    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (typeof payload === 'string' && payload.trim().length > 0) {
      message = payload;
    } else if (payload && typeof payload === 'object') {
      const detail = (payload as any).detail;
      const messageField = (payload as any).message;

      if (typeof detail === 'string' && detail.trim().length > 0) {
        message = detail;
      } else if (typeof messageField === 'string' && messageField.trim().length > 0) {
        message = messageField;
      } else {
        const firstValue = Object.values(payload as Record<string, unknown>)[0];
        if (Array.isArray(firstValue) && typeof firstValue[0] === 'string') {
          message = firstValue[0];
        }
      }
    }
  } catch {
    // Keep fallback error message when response body cannot be parsed.
  }

  return new Error(message);
}

/**
 * Get the stored auth token from localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem('access');
}

/**
 * Make an authenticated API request with automatic token injection
 * If the request fails with 401, the token is cleared and user is redirected to auth
 */
export async function apiFetch(endpoint: string, options: FetchOptions = {}): Promise<Response> {
  const { skipAuth = false, ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers || {});

  // Add content-type if not already set
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Add auth token if not skipping auth
  if (!skipAuth) {
    const token = getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  // If unauthorized, clear token and could trigger re-auth
  if (response.status === 401 && !skipAuth) {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    // Optionally redirect to auth page - uncomment if needed
    // window.location.href = '/auth';
  }

  return response;
}

/**
 * Convenience wrapper for GET requests
 */
export async function apiGet(endpoint: string, skipAuth = false): Promise<any> {
  const response = await apiFetch(endpoint, { method: 'GET', skipAuth });
  if (!response.ok) {
    throw await buildApiError(response);
  }
  return response.json();
}

/**
 * Convenience wrapper for POST requests
 */
export async function apiPost(endpoint: string, data?: any, skipAuth = false): Promise<any> {
  const response = await apiFetch(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    skipAuth,
  });
  if (!response.ok) {
    throw await buildApiError(response);
  }
  return response.json();
}

/**
 * Convenience wrapper for PUT requests
 */
export async function apiPut(endpoint: string, data?: any, skipAuth = false): Promise<any> {
  const response = await apiFetch(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
    skipAuth,
  });
  if (!response.ok) {
    throw await buildApiError(response);
  }
  return response.json();
}

/**
 * Convenience wrapper for DELETE requests
 */
export async function apiDelete(endpoint: string, skipAuth = false): Promise<any> {
  const response = await apiFetch(endpoint, { method: 'DELETE', skipAuth });
  if (!response.ok) {
    throw await buildApiError(response);
  }
  return response.json();
}
