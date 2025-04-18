"use client";

import CurrentTime from "@/app/ui/CurrentTime";
import Image from "next/image";

export default function VentasNuevoPage() {
  return (
    <div className="container">
      <div className="row rounded-2 mx-2 my-2">
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <CurrentTime />
          </div>
        </div>
        <div className="rounded-3 bg-white pb-2">
          <div className="row">
            <div className="col-12">
              {/* Encabezado */}
              <div className="row align-items-center text-white rounded px-3 py-2 header-customer">
                <div className="col-12 col-md-6 d-flex align-items-center">
                  <Image
                    src="/more.png"
                    alt="Logo"
                    width={30}
                    height={30}
                    className="img-fluid me-2"
                  />
                  <h2 className="mb-0">Registrar Ventas</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4">
              <label className="form-label">Cliente</label>
              <div className="input-group">
                <select className="form-select">
                  <option value="">Seleccione un cliente</option>
                </select>
                <button type="button" className="btn btn-submit">
                  Agregar
                </button>
              </div>
            </div>
            <div className="col-12 col-md-2">
              <label className="form-label">N° De Factura</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el número de factura"
              />
            </div>
            <div className="col-12 col-md-3">
              <label className="form-label">Venta N°</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el número de venta"
              />
            </div>
            <div className="col-12 col-md-3">
              <label className="form-label">Fecha De Emisión</label>
              <input type="date" className="form-control" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <button type="button" className="btn btn-submit w-100">
                Buscar productos
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-light text-center">
                    <tr>
                      <th>Código</th>
                      <th>Producto</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <button className="btn btn-outline-danger btn-sm">
                          🗑️
                        </button>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="text-center">
                        <input type="number" className="form-control" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-md-4">
                  <label className="form-label">Subtotal</label>
                  <span className="form-control">0</span>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Valor Descuento</label>
                  <span className="form-control">0</span>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Valor IVA</label>
                  <span className="form-control">0</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-md-4">
                  <label className="form-label">Valor Total</label>
                  <span className="form-control">0</span>
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Efectivo</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Cambio en Efectivo</label>
                  <span className="form-control">0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <button type="button" className="btn btn-submit w-100">
                Finalizar venta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
