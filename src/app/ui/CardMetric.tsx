'use client';

import Image from 'next/image';

interface CardMetricProps {
  title: string;
  value: string;
  image: string;
}

export default function CardMetric({ title, value, image }: CardMetricProps) {
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card shadow-sm p-3">
        <div className="row text-center">
          <div className="col-md-8 col-sm-12">
            <h3 className="card-title">{value}</h3>
            <p className="card-text">{title}</p>
          </div>
          <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
            <Image src={image} alt={title} width={48} height={48} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}
