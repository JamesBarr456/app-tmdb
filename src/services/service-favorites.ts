import { adminDB } from '@/config/firebase/firebase-admin';
import { authService } from './service-auth';
import { MediaCard } from '@/types/components/media-card';


class FavoriteService {
  private async getUserId(): Promise<string> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Usuario no autenticado');
    return user.uid;
  }

  async addFavorite(movie: MediaCard): Promise<void> {
    const uid = await this.getUserId();
    const movieRef = adminDB.doc(`users/${uid}/favorites/${movie.id}`);
    await movieRef.set({ ...movie});
  }

  async removeFavorite(movieId: number): Promise<void> {
    const uid = await this.getUserId();
    const movieRef = adminDB.doc(`users/${uid}/favorites/${movieId}`);
    await movieRef.delete();
  }

  async getFavorites(): Promise<MediaCard[]> {
    const uid = await this.getUserId();
    const favoritesRef = adminDB.collection(`users/${uid}/favorites`);
    const snapshot = await favoritesRef.get();

    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => {
  const { addedAt, ...rest } = doc.data() as MediaCard;
  return rest;
});
  }
}

export const favoriteService = new FavoriteService();
