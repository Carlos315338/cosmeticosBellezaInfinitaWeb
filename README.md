# Estructura del Proyecto - Belleza Infinita (Next.js)

Este documento describe la estructura principal del proyecto Frontend **Belleza Infinita**, desarrollado con Next.js, TailwindCSS y AWS Amplify para autenticación.

---

## Estructura del Proyecto

```
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
├── src
│   ├── app
│   │   ├── auth
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   │   ├── cambiar-clave/page.tsx
│   │   │   ├── categorias/page.tsx
│   │   │   ├── clientes
│   │   │   │   ├── lista/page.tsx
│   │   │   │   └── nuevo/page.tsx
│   │   │   ├── configuracion/page.tsx
│   │   │   ├── finanzas/page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── metodos-pago/page.tsx
│   │   │   ├── page.tsx
│   │   │   ├── productos
│   │   │   │   ├── lista/page.tsx
│   │   │   │   └── nuevo/page.tsx
│   │   │   ├── proveedores
│   │   │   │   ├── lista/page.tsx
│   │   │   │   └── nuevo/page.tsx
│   │   │   ├── usuarios
│   │   │   │   ├── lista/page.tsx
│   │   │   │   └── nuevo/page.tsx
│   │   │   └── ventas/nuevo/page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── no-autorizado/page.tsx
│   │   ├── page.tsx
│   │   └── ui
│   │       ├── AuthGuard.tsx
│   │       ├── CardMetric.tsx
│   │       ├── CardResumen.tsx
│   │       ├── CurrentTime.tsx
│   │       ├── DashboardLayout.tsx
│   │       ├── Footer.tsx
│   │       ├── Header.tsx
│   │       ├── ModuloGuard.tsx
│   │       ├── Sidebar.tsx
│   │       └── TimeDisplay.tsx
│   ├── constants
│   │   └── menu.ts
│  
│   ├── context
│   │   └── AuthContext.tsx
│   └── services
│       ├── amplify-config.ts
│       ├── api.ts
│       └── usuarios
│           ├── clienteTypes.ts
│           └── usuarioService.ts

├── types
│   └── bootstrap.d.ts
```

---

## Descripción de Carpetas Principales

- `src/app`: Contiene las rutas y páginas del sistema, divididas por módulos del dashboard.
- `src/app/ui`: Componentes reutilizables como Header, Sidebar, Footer, Guards, etc.
- `src/constants`: Definiciones de constantes como rutas por módulo.
- `src/context`: Manejo del contexto de autenticación (`AuthContext`).
- `src/services`: Configuraciones generales (como AWS Amplify) y servicios externos (API).
- `types`: Tipados globales y específicos como para Bootstrap o librerías.

---

## Herramientas Usadas

- **Next.js** 15.2.3
- **React** 19
- **TailwindCSS** 4.0
- **Amplify Auth** para autenticación
- **Axios** para peticiones HTTP
- **PNPM** como gestor de paquetes
- **ESLint** y configuración personalizada

---

## Configuración de AWS Amplify

El archivo `amplify-config.ts` configura AWS Amplify para autenticación con Amazon Cognito. 
Se utilizan variables de entorno para mantener segura la configuración sensible:

```ts
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
    },
  },
});
```

### Variables de entorno necesarias

Estas variables deben definirse en el entorno de ejecución (por ejemplo, en `.env.local`):

- `NEXT_PUBLIC_USER_POOL_ID` → ID del User Pool de Cognito
- `NEXT_PUBLIC_USER_POOL_CLIENT_ID` → ID del cliente del User Pool

Esto permite a la aplicación autenticarse con AWS Cognito utilizando el SDK de Amplify.

---

---

## Caso de Uso: Inicio de Sesión con AWS Amplify

La pantalla de login (`src/app/page.tsx`) permite a los usuarios autenticarse utilizando **Amazon Cognito** mediante la librería `@aws-amplify/auth`.

### Flujo de Autenticación

1. **Verificación de Sesión Actual**:  
   Se verifica si ya existe una sesión activa con `getCurrentUser()`.  
   En caso afirmativo, se cierra la sesión anterior con `signOut()`.

2. **Inicio de Sesión**:  
   Se llama a `signIn({ username, password })` para autenticar al usuario.

3. **Obtención de Datos del Usuario**:  
   Tras la autenticación, se llama a `usuarioService.obtenerPorId(idNumber)` para recuperar los datos del usuario desde el backend.

4. **Actualización del Contexto de Autenticación**:  
   Se almacena la información del usuario en el `AuthContext` llamando a `setAuthData`.

5. **Redirección**:  
   El usuario autenticado es redirigido al dashboard con `router.push('/dashboard')`.

### Fragmento de Código Clave

```tsx
const user = await signIn({ username: idNumber, password });
const usuarioLogueado = await usuarioService.obtenerPorId(idNumber);
setAuthData(usuarioLogueado);
router.push('/dashboard');
```

Este enfoque separa la autenticación (Cognito) de la gestión del perfil de usuario (servicio interno), manteniendo una arquitectura limpia y desacoplada.

---

---

## Contexto Global de Autenticación: `AuthContext`

El contexto de autenticación centraliza el estado del usuario logueado en toda la aplicación usando React Context API.

### ¿Para qué sirve?

- Permite acceder al usuario autenticado desde cualquier componente.
- Proporciona funciones globales como `setAuthData()` y `logout()` para actualizar o limpiar el estado.
- Inicializa automáticamente al usuario si hay una sesión activa con Cognito.

---

### Estructura del Contexto

```ts
interface AuthContextType {
  user: UsuarioDTO | null;
  setAuthData: (user: UsuarioDTO) => void;
  logout: () => void;
}
```

---

### Implementación

#### 1. Creación del Contexto y Proveedor

```tsx
const AuthContext = createContext<AuthContextType>({
  user: null,
  setAuthData: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UsuarioDTO | null>(null);

  const setAuthData = (userData: UsuarioDTO) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### 2. Inicialización Automática desde Amplify

Al cargar la app, intenta recuperar el ID del usuario desde el `idToken` de Cognito:

```tsx
useEffect(() => {
  const init = async () => {
    try {
      const session = await fetchAuthSession();
      const payload = session.tokens?.idToken?.payload;

      if (payload && payload["custom:idUser"]) {
        const usuarioLogueado = await usuarioService.obtenerPorId(payload["custom:idUser"] + "");
        setAuthData(usuarioLogueado); 
      }
    } catch (err) {
      console.error("Error al recuperar el usuario:", err);
      logout();
    }
  };

  init();
}, []);
```

---

### Uso del Contexto

Desde cualquier componente puedes acceder al usuario actual y funciones globales usando `useAuth()`:

```tsx
const { user, setAuthData, logout } = useAuth();

if (user) {
  console.log("Usuario logueado:", user.nombres);
}
```

Esto permite que la app sea **reactiva al estado de sesión** y se mantenga sincronizada con Cognito.

---

---

## Protección de Rutas: `AuthGuard`, `ModuloGuard` y `Sidebar`

### `AuthGuard.tsx`

Este componente asegura que un usuario autenticado pueda acceder a rutas protegidas, y redirige a la ruta `/login` si no lo está.

**Fragmento clave:**

```tsx
useEffect(() => {
  getCurrentUser()
    .then(() => {
      if (publicRoutes.includes(pathname)) {
        router.push('/dashboard');
      } else {
        setChecking(false);
      }
    })
    .catch(() => {
      if (!publicRoutes.includes(pathname)) {
        router.push('/login');
      }
    });
}, [pathname]);
```

> 🔐 Útil para validar que el usuario esté logueado antes de cargar la página.

---

### `ModuloGuard.tsx`

Este componente revisa si el usuario tiene permisos para acceder al módulo actual según su rol. Si no tiene acceso, redirige a una vista de **no autorizado** (`/no-autorizado`).

**Fragmento clave:**

```tsx
const modulosUsuario: Modulo[] = (user?.rol?.modulos || [])
  .map((mod) => mod.nombre as Modulo)
  .filter((nombre) => nombre in rutasPorModulo);

const rutasProtegidas = modulosUsuario
  .flatMap((mod) => rutasPorModulo[mod])
  .map((ruta) => ruta.ruta)
  .concat(publicRoutes);

useEffect(() => {
  if (user && !rutasProtegidas.includes(pathname)) {
    router.push("/no-autorizado");
  }
}, [user, pathname]);
```

> ✅ Útil para implementar **control de acceso por módulo** basado en roles.

---

### `Sidebar.tsx`

Genera dinámicamente las secciones del menú lateral en función de los módulos disponibles en el `rol` del usuario. Solo muestra las rutas permitidas.

**Fragmento clave:**

```tsx
const modulos = user?.rol.modulos.map((mod) => mod.nombre) || [];

{modulos.map((moduloNombre) => {
  const rutas = rutasPorModulo[moduloNombre as Modulo];
  if (!rutas || rutas.length === 0) return null;

  return (
    <details key={moduloNombre}>
      <summary>{moduloNombre}</summary>
      {rutas.map(({ nombre, ruta }) => (
        <a key={ruta} onClick={() => router.push(ruta)}>{nombre}</a>
      ))}
    </details>
  );
})}
```

> 📌 Es una manera flexible de controlar lo que el usuario puede ver y acceder según su rol y permisos.

---

Estos componentes trabajan en conjunto con el `AuthContext` y `Amplify Auth` para mantener segura y coherente la experiencia de navegación.

---
