interface FetchError extends Error {
  info?: unknown;
  status?: number;
}

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error: FetchError = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    try {
      error.info = await response.json();
    } catch {
      // The response might not be a valid JSON
      error.info = response.statusText;
    }
    error.status = response.status;
    throw error;
  }
  return response.json();
};
