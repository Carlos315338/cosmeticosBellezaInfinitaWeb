'use client';

import Image from 'next/image';

interface CardResumenProps {
  title: string;
  label: string;
  value: string;
  amount: string;
  image: string;
  variant: 'compras' | 'ventas';
}

export default function CardResumen({ title, label, value, amount, image, variant }: CardResumenProps) {
  const headerClass = variant === 'compras' ? 'card-header-compras' : 'card-header-ventas';

  return (
    <div className="col-md-6 mb-4">
      <div className="container g-0 card text-center shadow-sm card-contenedor">
        <div className="row">
          <div className="col">
            <div className={`card-header ${headerClass}`}>
              <h4 className="card-title">{title}</h4>
            </div>
          </div>
        </div>
        <div className="row card-body">
          <div className="col">
            <h3>{label}</h3>
            <p className="h3">{value}</p>
          </div>
          <div className="col">
            <h2 className="card-value">{amount}</h2>
          </div>
          <div className="col">
            <Image src={image} alt={title} width={48} height={48} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}
