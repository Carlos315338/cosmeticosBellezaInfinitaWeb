# Cosméticos Belleza Infinita - Dashboard Web

Este proyecto es un panel de administración para el sistema **Cosméticos Belleza Infinita**, desarrollado con **Next.js**, **TypeScript**, **TailwindCSS** y **PostCSS**. El objetivo es gestionar productos, usuarios, clientes, proveedores y reportes de ventas de forma moderna y eficiente.

## 🛠️ Tecnologías Utilizadas

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** + PostCSS
- **ESLint** con configuración personalizada
- **Context API** para autenticación
- **AWS Amplify** (Auth)
- **React Hooks**
- **Webpack 5**
- **Modularización con alias `@/*` vía tsconfig.json**

## 🚀 Estructura de Carpetas

```
src/
├── app/
│   ├── layout.tsx            # Layout raíz
│   ├── page.tsx              # Página inicial o login
│   └── dashboard/
│       └── page.tsx          # Página principal del dashboard
├── components/
│   ├── AuthGuard.tsx
│   ├── CardMetric.tsx
│   ├── CardResumen.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   ├── CurrentTime.tsx
│   └── TimeDisplay.tsx
├── context/
│   └── AuthContext.tsx
├── services/
│   ├── api.ts
│   ├── usuarioService.ts
│   └── clienteTypes.ts
├── config/
│   └── amplify-config.ts
```

## 🔐 Autenticación

La autenticación se maneja con **AWS Amplify**, protegida por `AuthGuard.tsx` y contexto global (`AuthContext.tsx`). Las rutas privadas como `/dashboard` están protegidas y requieren sesión activa.

## 🧩 Navegación

La navegación usa `useRouter()` de Next.js para rutas internas y está encapsulada dentro de `Sidebar` y `DashboardLayout`.

## 📦 Scripts de uso

```bash
# Instalación de dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Linter
npm run lint
```

## 📌 Notas

- El proyecto usa `paths` personalizados (`@/*`) definidos en `tsconfig.json`.
- `AuthGuard` y `AuthContext` aseguran que las vistas críticas estén protegidas.
- Los estilos están hechos 100% con Tailwind y pueden personalizarse desde `tailwind.config.js` y `postcss.config.mjs`.

---

Desarrollado con ❤️ por el equipo de Cosméticos Belleza Infinita.
