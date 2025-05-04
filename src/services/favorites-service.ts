import { adminDB } from '@/lib/firebase/admin';
import { authService } from './auth-service';

interface MovieData {
  id: number;
  title: string;
  backdrop_path: string | null;
  release_date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // para campos adicionales
}

class FavoriteService {
  private async getUserId(): Promise<string> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Usuario no autenticado');
    return user.uid;
  }

  async addFavorite(movie: MovieData): Promise<void> {
    const uid = await this.getUserId();
    const movieRef = adminDB.doc(`users/${uid}/favorites/${movie.id}`);
    await movieRef.set({ ...movie, addedAt: new Date() });
  }

  async removeFavorite(movieId: number): Promise<void> {
    const uid = await this.getUserId();
    const movieRef = adminDB.doc(`users/${uid}/favorites/${movieId}`);
    await movieRef.delete();
  }

  async getFavorites(): Promise<MovieData[]> {
    const uid = await this.getUserId();
    const favoritesRef = adminDB.collection(`users/${uid}/favorites`);
    const snapshot = await favoritesRef.get();

    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => {
      const { addedAt, ...rest } = doc.data() as MovieData;
      return rest;
    });
  }
}

export const favoriteService = new FavoriteService();
