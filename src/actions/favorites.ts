'use server';

import { favoriteService } from '@/services/service-favorites';
import { MediaCard } from '@/types/components/media-card';
import { revalidatePath } from 'next/cache';



export async function addFavoriteAction(movie: MediaCard) {
  try {
    await favoriteService.addFavorite(movie);
    revalidatePath('/favoritos'); 
    return { success: true };
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    return { success: false, message: (error as Error).message };
  }
}

export async function removeFavoriteAction(movieId: number) {
  try {
    await favoriteService.removeFavorite(movieId);
    revalidatePath('/favoritos'); 
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
