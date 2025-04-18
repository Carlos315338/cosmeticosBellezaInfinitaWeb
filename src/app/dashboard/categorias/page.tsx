// app/dashboard/categorias/page.tsx
"use client";
import React, { useState } from "react";
import CurrentTime from "@/app/ui/CurrentTime";
import Image from "next/image";
import ModalCategoria from "@/app/ui/modalCategoria";

// Ajusta la ruta según tu estructura

export default function CategoriasPage() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="container pb-3 register-products">
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <CurrentTime />
        </div>
      </div>
      <div className="container pb-3 register-customer g-0">
        <div className="row g-0 align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
          <div className="col-md-6 d-flex align-items-center">
            <Image
              src="/more.png"
              className="img-fluid me-2 img-menu-burger "
              alt="Logo"
              width={30}
              height={30}
            />
            <h2 className="mb-0">Categorías de Productos</h2>
          </div>
        </div>
        {/* Formulario */}
        <div className="row container-form me-2 ms-2">
          <form className="pe-4 ps-4">
            <div className="row mb-3">
              <div className="col-md-12">
                <label
                  htmlFor="nombre-categoria"
                  className="form-label text-dark"
                >
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  id="nombre-categoria"
                  className="form-control"
                  placeholder="Ingrese el nombre de la categoría"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between pb-2 pt-2">
              <button
                type="button"
                className="btn btn-submit me-2"
                onClick={handleOpenModal}
              >
                Buscar categoría
              </button>
              <div className="d-flex justify-content-end">
                <a href="#" className="btn btn-cancel me-2">
                  Cancelar
                </a>
                <button type="submit" className="btn btn-submit">
                  Guardar cambios
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Tabla */}
      <ModalCategoria show={showModal} onClose={handleCloseModal} />
    </div>
  );
}
