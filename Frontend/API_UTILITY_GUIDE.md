# API Utility Usage Guide

**File**: `src/utils/api.ts`  
**Purpose**: Centralized, authenticated HTTP requests with automatic token management

---

## Quick Start

### Basic Imports
```typescript
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/api';
```

### Simple GET Request
```typescript
// Automatically includes Authorization: Bearer <token>
const data = await apiGet('/api/worker/marketplace/jobs/');
```

### POST Request
```typescript
// Automatically includes token + Content-Type header
await apiPost('/api/worker/applications/', { job_id: 'job-123' });
```

### Error Handling
```typescript
try {
  const data = await apiGet('/api/worker/wallet/transactions/');
  setTransactions(data.results || data);
} catch (error) {
  console.warn('Failed to fetch:', error);
  setTransactions(mockData); // Graceful fallback
}
```

---

## Available Functions

### `apiGet(endpoint: string, skipAuth?: boolean)`
Fetch data from server with optional authentication.

**Parameters:**
- `endpoint` - API path (e.g., `/api/jobs/`)
- `skipAuth` - Skip token injection for public endpoints (default: false)

**Returns:** Promise resolving to JSON response

**Example:**
```typescript
const jobs = await apiGet('/api/worker/marketplace/jobs/');
const suggestions = await apiGet('/api/public/suggestions/', true); // no auth
```

---

### `apiPost(endpoint: string, data?: object, skipAuth?: boolean)`
Send data to server with POST request.

**Parameters:**
- `endpoint` - API path
- `data` - JSON payload to send
- `skipAuth` - Skip authentication (default: false)

**Returns:** Promise resolving to response JSON

**Example:**
```typescript
await apiPost('/api/worker/applications/', { job_id: 'job-123' });
await apiPost('/api/auth/register/', { email: 'user@example.com', password: 'pwd' }, true);
```

---

### `apiPut(endpoint: string, data?: object, skipAuth?: boolean)`
Update data on server with PUT request.

**Parameters:** Same as apiPost

**Returns:** Promise resolving to response JSON

**Example:**
```typescript
await apiPut('/api/worker/settings/profile/update/', { 
  fullName: 'John Doe', 
  bio: 'New bio' 
});
```

---

### `apiDelete(endpoint: string, skipAuth?: boolean)`
Delete data from server.

**Parameters:**
- `endpoint` - API path
- `skipAuth` - Skip authentication (default: false)

**Returns:** Promise resolving to response JSON

**Example:**
```typescript
await apiDelete('/api/worker/settings/account/delete/');
```

---

### `apiFetch(endpoint: string, options: object)`
Low-level fetch wrapper. Use when above functions don't fit.

**Parameters:**
- `endpoint` - API path
- `options` - Fetch options (method, body, etc.)

**Returns:** Promise resolving to response JSON

**Example:**
```typescript
const data = await apiFetch('/api/jobs/', {
  method: 'PATCH',
  body: JSON.stringify({ status: 'archived' })
});
```

---

### `getAuthToken()`
Retrieve stored authentication token.

**Returns:** Access token string or null

**Example:**
```typescript
const token = getAuthToken();
if (!token) {
  // User not authenticated
  navigate('/auth');
}
```

---

## Automatic Features

### ✅ Token Injection
All authenticated requests automatically include:
```
Authorization: Bearer <token>
```

### ✅ Content-Type Header
POST/PUT requests automatically include:
```
Content-Type: application/json
```

### ✅ 401 Handling
When server returns 401:
1. Token is cleared from localStorage
2. Error is thrown
3. App should redirect to `/auth`

### ✅ Error Propagation
- Network errors are thrown as-is
- HTTP error status codes (4xx, 5xx) throw with status
- Invalid JSON responses throw parsing error

---

## Migration Examples

### Before (Raw Fetch)
```typescript
const handleFetch = async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  try {
    const response = await fetch(`${apiUrl}/api/worker/jobs/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      const data = await response.json();
      setJobs(data.results || data);
    } else {
      setJobs(mockData);
    }
  } catch (error) {
    setJobs(mockData);
  }
};
```

### After (API Utility)
```typescript
const handleFetch = async () => {
  try {
    const data = await apiGet('/api/worker/jobs/');
    setJobs(data.results || data);
  } catch (error) {
    console.warn('Failed to fetch jobs:', error);
    setJobs(mockData);
  }
};
```

### Improvements
- No API_BASE_URL constant needed
- No manual headers needed
- No manual token injection
- Token auto-cleared on 401
- Consistent error handling

---

## Common Patterns

### Pattern 1: Initial Data Load
```typescript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await apiGet('/api/resource/');
      setData(data);
    } catch (error) {
      console.warn('Fetch failed:', error);
      setData(mockData);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Pattern 2: Form Submission
```typescript
const handleSubmit = async (formData) => {
  try {
    const response = await apiPost('/api/resource/', formData);
    setSuccess(true);
    setMessage('Saved successfully');
  } catch (error) {
    console.warn('Submit failed:', error);
    setError('Unable to save. Try again later.');
  }
};
```

### Pattern 3: Delete with Confirmation
```typescript
const handleDelete = async () => {
  try {
    await apiDelete('/api/resource/123/');
    setDeleted(true);
    setMessage('Deleted successfully');
  } catch (error) {
    setError('Delete failed');
  }
};
```

### Pattern 4: Query Parameters
```typescript
// URL encoding with URLSearchParams
const params = new URLSearchParams({
  role: 'worker',
  status: 'active'
});

const data = await apiGet(`/api/jobs/?${params}`);
```

---

## Error Handling Best Practices

### ✅ Good
```typescript
try {
  const data = await apiGet('/api/jobs/');
} catch (error) {
  console.warn('Failed to fetch jobs:', error);
  setData(mockData); // Graceful fallback
}
```

### ❌ Bad
```typescript
try {
  const data = await apiGet('/api/jobs/');
} catch (error) {
  // Silently fails - user gets blank page
}

// Or:
try {
  const data = await apiGet('/api/jobs/');
} catch (error) {
  alert('ERROR'); // Technical jargon - confuses users
}
```

---

## Environment Setup

### Required Environment Variables
```bash
VITE_API_BASE_URL=http://localhost:8000
```

### In .env.local or .env
```
VITE_API_BASE_URL=http://api.production.com
```

### Default Fallback
If `VITE_API_BASE_URL` is not set:
- Development: `http://localhost:8000`
- The utility handles this automatically

---

## Testing

### Mock the API Utility
```typescript
import * as apiUtils from '../../utils/api';

jest.mock('../../utils/api');

apiUtils.apiGet.mockResolvedValue({ 
  results: [{ id: 1, title: 'Test Job' }] 
});

// Now your component can be tested without real API calls
```

### Example Test
```typescript
test('loads jobs on mount', async () => {
  apiGet.mockResolvedValue({ results: mockJobs });
  
  render(<JobsPage />);
  
  await waitFor(() => {
    expect(screen.getByText('Test Job')).toBeInTheDocument();
  });
});
```

---

## Troubleshooting

### Issue: "Unauthorized" errors
**Cause**: Token missing or expired
**Solution**: Check localStorage for `access` token. App should redirect to `/auth`.

### Issue: CORS errors
**Cause**: Backend not allowing frontend domain
**Solution**: Backend needs CORS headers for your frontend URL

### Issue: "Cannot find module" errors
**Cause**: Incorrect import path
**Solution**: Use correct relative path to `src/utils/api.ts`
```typescript
// ✅ Correct
import { apiGet } from '../../utils/api';

// ❌ Wrong
import { apiGet } from '@/utils/api'; // @ alias not set up
```

### Issue: Double API calls
**Cause**: React.StrictMode causes double render
**Solution**: Expected in development, won't happen in production

---

## Future Enhancements

### Planned Features (Not Yet Implemented)
- [ ] Automatic retry with exponential backoff
- [ ] Request timeout handling
- [ ] Request/response logging
- [ ] Caching strategy
- [ ] Rate limiting client-side
- [ ] Batch request support
- [ ] Upload progress tracking
- [ ] GraphQL support

---

## Security Notes

### ✅ Secure
- Tokens stored in localStorage (as per current app design)
- Tokens automatically injected on all auth requests
- 401 responses trigger logout and token deletion
- HTTPS recommended for production

### 🔄 Consider for Future
- Move tokens to httpOnly cookies
- Implement refresh token rotation
- Add request signing
- Implement CSRF protection

---

## Questions?

Refer to `src/utils/api.ts` for source implementation, or check `IMPLEMENTATION_PROGRESS.md` for update status.

