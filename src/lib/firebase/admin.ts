import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app';

import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(),
  });
}

export const db = getFirestore();
export const auth = getAuth();
