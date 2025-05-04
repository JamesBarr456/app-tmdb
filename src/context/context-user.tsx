'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { checkAuthAction } from '@/actions/auth';
import { getFavoritesAction } from '@/actions/favorites';

interface UserContextProps {
  favorites: MovieData[] | undefined;
  loading: boolean;
  isAuthenticated: boolean;
}
interface MovieData {
  id: number;
  title: string;
  backdrop_path: string | null;
  release_date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // para campos adicionales
}
const UserContext = createContext<UserContextProps>({
  favorites: [],
  loading: true,
  isAuthenticated: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState<MovieData[] | undefined>([]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const isLoggedIn = await checkAuthAction();
        setIsAuthenticated(isLoggedIn);
        if (!isLoggedIn) {
          setFavorites([]);
          return;
        }

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
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <UserContext.Provider value={{ favorites, loading, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
