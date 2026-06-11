# TreeLink Frontend

Aplicación web moderna para crear y compartir tu árbol de enlaces de contacto.

## Stack

- React 18 + Vite 6
- TailwindCSS + shadcn/ui
- Redux Toolkit
- Framer Motion
- Formik + Yup

## Requisitos

- Node.js >= 20
- Backend TreeLink en ejecución

## Variables de entorno

Crea un archivo `.env` basado en `.env.development`:

```env
VITE_APP_API_URL=http://localhost:4000/api
VITE_APP_LOCAL_URL=http://localhost:5173
VITE_APP_GOOGLE_CLIENT_ID=tu_google_client_id
VITE_APP_FACEBOOK_CLIENT_ID=tu_facebook_app_id
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Producción

```bash
npm run build
npm run preview
```

## Checklist de verificación

- [ ] Login y registro funcionan
- [ ] Login con Google y Facebook
- [ ] Crear, editar y eliminar hojas
- [ ] Vista previa y copiar enlace público
- [ ] Modo claro/oscuro
- [ ] Perfil de usuario actualizable
- [ ] Árbol público en `/user/:username`
