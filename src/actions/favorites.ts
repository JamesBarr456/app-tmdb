'use server';

import { favoriteService } from '@/services/favorites-service';
import { revalidatePath } from 'next/cache';

interface MovieData {
  id: number;
  title: string;
  backdrop_path: string | null;
  release_date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export async function addFavoriteAction(movie: MovieData) {
  try {
    await favoriteService.addFavorite(movie);
    revalidatePath('/favoritos'); // cambia la ruta si usás otra
    return { success: true };
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    return { success: false, message: (error as Error).message };
  }
}

export async function removeFavoriteAction(movieId: number) {
  try {
    await favoriteService.removeFavorite(movieId);
    revalidatePath('/favoritos'); // actualizá la vista si corresponde
    return { success: true };
  } catch (error) {
    console.error('Error al quitar favorito:', error);
    return { success: false, message: (error as Error).message };
  }
}

export async function getFavoritesAction() {
  try {
    const favorites = await favoriteService.getFavorites();
    return { success: true, data: favorites };
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    return { success: false, message: (error as Error).message };
  }
}
