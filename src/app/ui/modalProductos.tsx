import React from "react";

interface ModalProductosProps {
  show: boolean; // Define si el modal está visible
  onClose: () => void; // Función para cerrar el modal
}

const ModalProductos: React.FC<ModalProductosProps> = ({ show, onClose }) => {
  if (!show) return null; // No renderizar el modal si `show` es falso

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      aria-labelledby="modalCategoriaLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* Encabezado del Modal */}
          <div className="modal-header">
            <h5 className="modal-title text-dark" id="modalCategoriaLabel">
              Buscar Productos
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Cuerpo del Modal */}
          <div className="modal-body">
            {/* Barra de búsqueda */}
            <div className="row mb-3">
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre del producto"
                />
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-submit w-100">
                  Buscar
                </button>
              </div>
            </div>

            {/* Tabla de Productos */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light text-center">
                  <tr>
                    <th>Acción</th>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Proveedor</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        <button className="btn btn-submit">Agregar</button>
                      </td>
                      <td>{1000 + index}</td>
                      <td>Producto {index + 1}</td>
                      <td>Descripción {index + 1}</td>
                      <td>$ {10000 + index * 500}</td>
                      <td>{20 + index}</td>
                      <td>Categoría {index + 1}</td>
                      <td>Proveedor {index + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProductos;
