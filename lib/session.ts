// Types for session data
interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const SESSION_KEY = 'user_session';

// Function to save user session
export const saveSession = (userData: SessionUser): void => {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

// Function to get user session
export const getSession = (): SessionUser | null => {
  try {
    const session = sessionStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

// Function to check if user is logged in
export const isAuthenticated = (): boolean => {
  return !!getSession();
};

// Function to remove user session
export const clearSession = (): void => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};
