// app/dashboard/finanzas/page.tsx
"use client";

import TimeDisplay from "@/app/ui/TimeDisplay";
import { useRef } from "react";
import Image from "next/image";

export default function ReporteVentasPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  const exportarATxt = () => {
    if (cardRef.current) {
      // Obtén el contenido HTML
      const printContents = cardRef.current.innerText; // Inner text extrae solo el texto visible

      // Crea un blob con los datos
      const blob = new Blob([printContents], { type: "text/plain" });

      // Genera un enlace de descarga
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "ReporteVentas.txt";

      // Simula el clic para descargar
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <div className="col-8">
            <h1 className="text-start tittle">Reporte de Ventas</h1>
          </div>
          <div className="col-4 text-end text-purple">
            <TimeDisplay />
          </div>
        </div>
      </div>
      <div className="card mt-4 mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Image
              className="img-fluid me-2"
              src="/more.png"
              alt="Icono"
              width={24}
              height={24}
            />
            <h2 className="h5 mb-0">Lista de Ventas</h2>
          </div>
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por cliente"
            />
            <button className="btn btn-outline-secondary" type="button">
              <Image src="/search.png" alt="icono" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <label className="me-2 text-dark">Rango de Fechas:</label>
            <input
              type="text"
              className="form-control me-2"
              value="01/03/2025 07:00:00"
              readOnly
              style={{ width: "auto" }}
            />
            <input
              type="text"
              className="form-control"
              value="01/03/2025 22:00:00"
              readOnly
              style={{ width: "auto" }}
            />
          </div>
          <button className="btn btn-submit">Consultar</button>
        </div>
        <div
          className="card-body"
          ref={cardRef}
          style={{ overflowY: "auto", maxHeight: "400px" }}
        >
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Factura Nº</th>
                <th>Cliente</th>
                <th>Identificación</th>
                <th>Fecha</th>
                <th>Neto</th>
                <th>IVA</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  factura: 1001,
                  cliente: "Cliente A",
                  identificacion: "CC123456",
                  fecha: "20/04/2025",
                  neto: "$500,000",
                  iva: "$95,000",
                  total: "$595,000",
                },
                {
                  factura: 1002,
                  cliente: "Cliente B",
                  identificacion: "CC789012",
                  fecha: "19/04/2025",
                  neto: "$1,000,000",
                  iva: "$190,000",
                  total: "$1,190,000",
                },
                {
                  factura: 1003,
                  cliente: "Cliente C",
                  identificacion: "CC345678",
                  fecha: "18/04/2025",
                  neto: "$750,000",
                  iva: "$142,500",
                  total: "$892,500",
                },
              ].map((venta, index) => (
                <tr key={index}>
                  <td>{venta.factura}</td>
                  <td>{venta.cliente}</td>
                  <td>{venta.identificacion}</td>
                  <td>{venta.fecha}</td>
                  <td>{venta.neto}</td>
                  <td>{venta.iva}</td>
                  <td>{venta.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4 mb-4">
          <button className="btn btn-submit" onClick={exportarATxt}>
            Imprimir Reporte
          </button>
        </div>
      </div>
    </div>
  );
}
