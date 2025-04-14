'use client';

import Link from 'next/link';

export default function NoAutorizadoPage() {
  return (
    <main className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card text-center shadow p-4" style={{ maxWidth: '500px' }}>
        <h1 className="text-danger mb-3">Acceso Denegado</h1>
        <p className="text-muted mb-4">
          No tienes permisos para acceder a esta página.
        </p>
        <Link href="/dashboard" className="btn btn-danger">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
