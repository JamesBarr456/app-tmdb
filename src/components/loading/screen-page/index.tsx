import { Film } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center p-8 space-y-8">
      {/* Logo animado de película */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-greyish-blue to-bright-red rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-black p-4 rounded-full border-4 border-bright-red animate-spin-slow">
            <Film className="w-8 h-8 text-bright-red" />
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full max-w-md mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-white via-bright-red to-white animate-progress-bar"></div>
      </div>
    </div>
  );
}
