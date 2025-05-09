import { SpinnerLoading } from '@/components/loading';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <SpinnerLoading color="text-bright-red" height={40} width={40} />
    </div>
  );
}
