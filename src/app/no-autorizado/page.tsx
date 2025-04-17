"use client";
import "@/services/amplify-config";
import { signOut } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function NoAutorizadoPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut();
    router.push("/dashboard");
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card text-center shadow p-4"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="text-danger mb-3">Acceso Denegado</h1>
        <p className="text-muted mb-4">
          No tienes permisos para acceder a esta página.
        </p>
        <button onClick={handleSubmit} className="btn btn-danger">
          Volver al inicio
        </button>
      </div>
    </main>
  );
}
