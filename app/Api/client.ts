const BASE_URL = 'http://codonnier.tech/ravi/learning/dev/';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Network request failed');
  }
};
