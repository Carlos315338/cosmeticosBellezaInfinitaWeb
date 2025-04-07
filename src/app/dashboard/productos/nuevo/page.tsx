'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';

export default function ProductosNuevoPage() {
  return (
    
      <div className="container">
        <h1 className="pt-4 pb-3">Registrar Productos</h1>

        <form className="container-form pb-5">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Código</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Producto</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Descripción</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Categoría</label>
              <select className="form-select">
                <option value="">Seleccione una Categoría</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Precio de compra</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <div className="form-check d-flex align-items-center">
                <input type="checkbox" className="form-check-input me-2" id="porcentaje-aplicable" />
                <label className="form-check-label" htmlFor="porcentaje-aplicable">Porcentaje aplicable</label>
              </div>
              <input type="text" className="form-control mt-2" placeholder="Porcentaje" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Precio de venta</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Proveedor</label>
              <select className="form-select">
                <option value="">Seleccione un Proveedor</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Stock</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <a href="#" className="btn btn-cancel">Cancelar</a>
            <button type="submit" className="btn btn-submit">Guardar cambios</button>
          </div>
        </form>
      </div>
    
  );
}
