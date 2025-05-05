'use client';

import Image from 'next/image';

interface CardMetricProps {
  title: string;
  value: number | null | undefined;
  image: string;
  loading?: boolean;
}

export default function CardMetric({ title, value, image, loading = false }: CardMetricProps) {
  const mostrarContenido = () => {
    if (loading) {
      return (
        <div
          className="spinner-border spinner-border-sm "
          role="status"
          style={{ width: "1.2rem", height: "1.2rem", color: "#5c0061"}}
        >
          <span className="visually-hidden">Cargando...</span>
        </div>
      );
    }

    const valorSeguro = typeof value === "number" && !isNaN(value) ? value : 0;
    return <h3 className="card-title">{valorSeguro}</h3>;
  };

  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card shadow-sm p-3">
        <div className="row text-center">
          <div className="col-md-8 col-sm-12 d-flex flex-column align-items-center justify-content-center">
            {mostrarContenido()}
            <p className="card-text mt-1">{title}</p>
          </div>
          <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
            <Image src={image} alt={title} width={48} height={48} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

