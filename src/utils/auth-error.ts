import { firebaseErrorMessages } from "@/data/message-error-firebase";
import { FormState } from "@/types/error";

export function handleAuthError(error: unknown): FormState {
    if (error instanceof Error) {
      // Extraer código de error de Firebase (ej. "auth/wrong-password")
      const firebaseErrorCode = error.message.match(/\(auth\/(.+)\)/)?.[1];
      
      if (firebaseErrorCode) {
        return {
          error: {
            code: `auth/${firebaseErrorCode}`,
            message: firebaseErrorMessages[`auth/${firebaseErrorCode}`] || error.message,
          },
        };
      }
      
      return {
        error: {
          message: error.message,
        },
      };
    }
    
    return {
      error: {
        message: 'An unexpected error occurred',
      },
    };
  }