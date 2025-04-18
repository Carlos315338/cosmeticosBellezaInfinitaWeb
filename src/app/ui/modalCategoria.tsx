import React from "react";

interface ModalCategoriaProps {
  show: boolean; // Define si el modal está visible
  onClose: () => void; // Función para cerrar el modal
}

const ModalCategoria: React.FC<ModalCategoriaProps> = ({ show, onClose }) => {
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
              Buscar Categorías
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
                  placeholder="Ingrese el nombre de la categoría"
                />
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-submit w-100">
                  Buscar
                </button>
              </div>
            </div>

            {/* Tabla de Categorías */}
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light text-center">
                  <tr>
                    <th>Acción</th>
                    <th>Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
                    <td className="text-center">Maquillaje</td>
                  </tr>
                  <tr>
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
                    <td className="text-center">Cuidado de la piel</td>
                  </tr>
                  <tr>
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
                    <td className="text-center">Cuidado del cabello</td>
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

export default ModalCategoria;
