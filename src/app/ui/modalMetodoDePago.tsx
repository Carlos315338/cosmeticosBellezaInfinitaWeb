import React from "react";

interface ModalMetodoDePagoProps {
  show: boolean; // Define si el modal está visible
  onClose: () => void; // Función para cerrar el modal
}

const ModalMetodoDePago: React.FC<ModalMetodoDePagoProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null; // No renderizar el modal si `show` es falso

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      aria-labelledby="modalMetodoDePagoLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* Encabezado del Modal */}
          <div className="modal-header">
            <h5 className="modal-title text-dark" id="modalMetodoDePagoLabel">
              Métodos de Pago
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
            {/* Tabla */}
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light text-center">
                  <tr>
                    <th>Acción</th>
                    <th>Métodos de Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {["Métodos de Pago 1", "Métodos de Pago 2"].map(
                    (nombre, i) => (
                      <tr key={i}>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </td>
                        <td className="text-center">{nombre}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalMetodoDePago;
