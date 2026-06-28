import { useState, useEffect } from 'react';
import { verifyTokenService, logoutService } from './auth';

export interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  handleLoginSuccess: (token: string, username: string) => void;
  handleLogout: () => Promise<void>;
}

export function useAuth(): AuthState & AuthActions {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUsername = localStorage.getItem('username');

      if (!savedToken || !savedUsername) {
        setIsLoading(false);
        return;
      }

      try {
        const isValid = await verifyTokenService(savedToken);

        if (isValid) {
          setToken(savedToken);
          setUsername(savedUsername);
        } else {
          clearStorage();
        }
      } catch {
        clearStorage();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const handleLoginSuccess = (newToken: string, newUsername: string) => {
    setToken(newToken);
    setUsername(newUsername);
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutService(token);
      }
    } catch {
      console.error('Logout API gagal, tetap clear session lokal.');
    } finally {
      clearStorage();
      setToken(null);
      setUsername(null);
      window.location.replace('/');
    }
  };

  return {
    token,
    username,
    isAuthenticated: !!token && !!username,
    isLoading,
    handleLoginSuccess,
    handleLogout,
  };
}