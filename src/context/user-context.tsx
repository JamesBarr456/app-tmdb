'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getFavoritesAction } from '@/actions/favorites';
import { useAuth } from './auth-context';
import { MediaCard } from '@/types/components/media-card';

interface UserContextProps {
  favorites: MediaCard[] | undefined;
  loading: boolean;
  refreshFavorites: () => Promise<void>;
  setFavorites: React.Dispatch<React.SetStateAction<MediaCard[] | undefined>>;
}

const UserContext = createContext<UserContextProps>({
  favorites: undefined,
  loading: true,
  refreshFavorites: async () => {},
  setFavorites: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<MediaCard[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, loading: authLoading } = useAuth();

  const refreshFavorites = async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const favoritesMediaUser = await getFavoritesAction();
      if (favoritesMediaUser.success) {
        setFavorites(favoritesMediaUser.data);
      } else {
        console.error(
          'Error al obtener favoritos:',
          favoritesMediaUser.message
        );
        setFavorites([]);
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      refreshFavorites();
    }
  }, [isAuthenticated, authLoading]);

  return (
    <UserContext.Provider
      value={{ favorites, refreshFavorites, loading, setFavorites }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
