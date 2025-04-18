import React from "react";

interface ModalProductosVentaProps {
  show: boolean; // Define si el modal está visible
  onClose: () => void; // Función para cerrar el modal
}

const ModalProductosVenta: React.FC<ModalProductosVentaProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null; // No renderizar el modal si `show` es falso

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      aria-labelledby="modalProductosVentaLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* Encabezado del Modal */}
          <div className="modal-header">
            <h5 className="modal-title text-dark" id="modalProductosVentaLabel">
              Productos Registrados
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
            {/* Tabla de Productos */}
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
      </div>
    </div>
  );
};

export default ModalProductosVenta;
