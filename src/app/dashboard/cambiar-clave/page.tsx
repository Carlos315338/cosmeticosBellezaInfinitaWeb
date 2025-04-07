'use client';

import Image from 'next/image';
import { useState } from 'react';
import { updatePassword } from 'aws-amplify/auth';

import { useRouter } from 'next/navigation';

export default function CambiarContrasenaPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }

    try {

      await updatePassword({
        oldPassword: currentPassword,
        newPassword,
      });

      alert('Contraseña actualizada correctamente');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error al cambiar la contraseña:', error);
      alert(error.message || 'No se pudo cambiar la contraseña');
    }
  };

  return (
    <main className="forgot-container">
      <Image src="/logo.png" alt="Logo Belleza Infinita" width={180} height={180} className="forgot-container__logo" />

      <form className="forgot-box" onSubmit={handleSubmit}>
        <h2 className="forgot-box__title">Cambiar contraseña</h2>

        <label htmlFor="currentPassword" className="forgot-box__label">Contraseña actual</label>
        <input
          type="password"
          id="currentPassword"
          className="forgot-box__input"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label htmlFor="newPassword" className="forgot-box__label">Nueva contraseña</label>
        <input
          type="password"
          id="newPassword"
          className="forgot-box__input"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label htmlFor="confirmNewPassword" className="forgot-box__label">Vuelva a escribir la nueva contraseña</label>
        <input
          type="password"
          id="confirmNewPassword"
          className="forgot-box__input"
          required
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />

        <section className="forgot-box-section">
          <a href="/dashboard" className="forgot-box-section__cancel">Cancelar</a>
          <button type="submit" className="forgot-box-section__button">Guardar cambios</button>
        </section>
      </form>
    </main>
  );
}
