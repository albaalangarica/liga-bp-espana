# Liga BP España — DEMO

Web demo para seguir una liga de debate British Parliamentary.

## Ejecutar
```bash
npm install
npm run dev
```

## Publicar en GitHub Pages / Vercel
1. Sube esta carpeta a un repositorio.
2. En Vercel: Import Project > selecciona repo > Deploy.
3. Para GitHub Pages conviene añadir la configuración `base` de Vite si el repo no se publica en dominio raíz.

## Datos
Ahora están en `src/data/demo.js`.

Más adelante ese archivo puede sustituirse por una función que lea un Google Sheet publicado como CSV/JSON sin cambiar el resto de la interfaz.
