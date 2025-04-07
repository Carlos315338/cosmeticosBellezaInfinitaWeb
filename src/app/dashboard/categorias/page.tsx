// app/dashboard/categorias/page.tsx
'use client';

export default function CategoriasPage() {
  return (
      <div className="container">
        <h1 className="pt-4 pb-3">Categorías de Productos</h1>

        {/* Formulario */}
        <form className="container-form pe-4 ps-4">
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="nombre-categoria" className="form-label">Nombre de la Categoría</label>
              <input type="text" id="nombre-categoria" className="form-control" placeholder="Ingrese el nombre de la categoría" />
            </div>
          </div>

          <div className="d-flex justify-content-between pb-2 pt-2">
            <button type="button" className="btn btn-submit me-2">Buscar categoría</button>
            <div className="d-flex justify-content-end">
              <a href="#" className="btn btn-cancel me-2">Cancelar</a>
              <button type="submit" className="btn btn-submit">Guardar cambios</button>
            </div>
          </div>
        </form>

        {/* Tabla */}
        <div className="table-responsive mt-4">
          <table className="table table-striped table-hover">
            <thead className="table-light text-center">
              <tr>
                <th>Acción</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {["Maquillaje", "Cuidado de la piel", "Cuidado del cabello", "Perfumería", "Cuidado personal", "Uñas", "Accesorios y herramientas", "Productos naturales"].map((nombre, i) => (
                <tr key={i}>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-1" title="Editar">✏️</button>
                    <button className="btn btn-sm btn-outline-danger" title="Eliminar">🗑️</button>
                  </td>
                  <td className="text-center">{nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
