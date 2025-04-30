import { db } from "@/config/firebase";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { authService } from "./auth-service";

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  [key: string]: any; // para campos adicionales
}

class FavoriteService {
  private async getUserId(): Promise<string> {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Usuario no autenticado");
    return user.uid;
  }

   async addFavorite(movie: MovieData): Promise<void> {
    const uid = await this.getUserId();
    const movieRef = doc(db, "users", uid, "favorites", movie.id.toString());

    await setDoc(movieRef, {
      ...movie,
      addedAt: new Date(),
    });
  }

  async removeFavorite(movieId: number): Promise<void> {
    const uid = await this.getUserId();
    const movieRef = doc(db, "users", uid, "favorites", movieId.toString());

    await deleteDoc(movieRef);
  }

  async getFavorites(): Promise<MovieData[]> {
    const uid = await this.getUserId();
    const favoritesRef = collection(db, "users", uid, "favorites");

    const snapshot = await getDocs(favoritesRef);
    return snapshot.docs.map(doc => doc.data() as MovieData);
  }
}

export const favoriteService = new FavoriteService()