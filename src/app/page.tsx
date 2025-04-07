//  app/pagetsx
'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-4">
      <Image
        src="/logo.png"
        alt="Logo Cosméticos Belleza Infinita"
        width={360}
        height={360}
        priority
      />

      <button
        onClick={() => router.push('/auth')}
        className="mt-8 bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
      >
        Iniciar sesión
      </button>
    </div>
  );
}
