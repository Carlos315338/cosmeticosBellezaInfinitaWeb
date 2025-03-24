'use client';

import Image from 'next/image';

export default function CambiarContrasenaPage() {
  return (
    <main className="forgot-container">
      <Image src="/logo.png" alt="Logo Belleza Infinita" width={180} height={180} className="forgot-container__logo" />

      <form className="forgot-box">
        <h2 className="forgot-box__title">Cambiar contraseña</h2>

        <label htmlFor="currentPassword" className="forgot-box__label">Contraseña actual</label>
        <input type="password" id="currentPassword" className="forgot-box__input" required />

        <label htmlFor="newPassword" className="forgot-box__label">Nueva contraseña</label>
        <input type="password" id="newPassword" className="forgot-box__input" required />

        <label htmlFor="confirmNewPassword" className="forgot-box__label">Vuelva a escribir la nueva contraseña</label>
        <input type="password" id="confirmNewPassword" className="forgot-box__input" required />

        <section className="forgot-box-section">
          <a href="/dashboard" className="forgot-box-section__cancel">Cancelar</a>
          <button type="submit" className="forgot-box-section__button">Guardar cambios</button>
        </section>
      </form>
    </main>
  );
}
