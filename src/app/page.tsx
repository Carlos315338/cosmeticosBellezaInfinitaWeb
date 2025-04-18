//  app/pagetsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-4">
      <Image
        src="/logo.png"
        alt="Logo Cosméticos Belleza Infinita"
        width={400}
        height={400}
        priority
      />

      <button onClick={() => router.push("/auth")} className="logo-btn-login">
        Iniciar sesión
      </button>
    </div>
  );
}
