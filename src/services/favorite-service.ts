// services/favoritesService.ts

import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { db } from '@/firebase';

export const saveFavorite = async (uid: string, movie: any) => {
  const ref = doc(db, 'users', uid, 'favorites', movie.id.toString());
  await setDoc(ref, movie);
};

export const getFavorites = async (uid: string) => {
  const ref = collection(db, 'users', uid, 'favorites');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data());
};
