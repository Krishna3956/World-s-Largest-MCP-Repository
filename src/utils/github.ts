// GitHub API utility with token support
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Debug logging
if (!GITHUB_TOKEN) {
  console.warn('GitHub token not configured. API requests will be rate-limited.');
}

export const fetchGitHub = async (url: string, options: RequestInit = {}) => {
  const headers: HeadersInit = {
    ...options.headers,
  };

  // Add authorization token if available
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  // Add default Accept header for GitHub API
  if (!headers['Accept']) {
    headers['Accept'] = 'application/vnd.github.v3.raw';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('GitHub API fetch error:', error);
    throw error;
  }
};
