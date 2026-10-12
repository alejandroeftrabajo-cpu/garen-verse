# GAREN VERSE — prototipo web v1.1

Portal interactivo de la familia García Arenas. Proyecto estático sin dependencias, compatible con GitHub Pages.

## Publicar en GitHub desde un iPad

1. Crea un repositorio **público** llamado `garen-verse` en github.com (o utiliza uno existente).
2. En el repositorio, elige **Add file → Upload files** y sube `index.html`, `style.css`, `app.js`, `README.md` y la carpeta `assets` con sus cinco imágenes. Conserva las rutas.
3. Confirma los cambios mediante **Commit changes**.
4. Abre **Settings → Pages → Build and deployment → Deploy from a branch**. Selecciona `main` y `/ (root)` y guarda.
5. GitHub Pages mostrará la URL pública cuando el despliegue termine. Normalmente tendrá la forma `https://USUARIO.github.io/garen-verse/`.

Si Safari en iPad no permite subir una carpeta, abre `assets` y sube sus cinco imágenes mediante **Add file → Upload files** dentro de esa ruta.

## Arquitectura

- `index.html`: portada, menú y vistas.
- `style.css`: diseño adaptable y animaciones.
- `app.js`: selección de personajes y navegación por fragmentos de URL.
- `assets/`: cinco imágenes originales.

## Limitaciones

Los avatares son imágenes 2D; las animaciones son efectos CSS. Las cuatro páginas son destinos de demostración, no webs externas. Las URLs reales no están configuradas. GitHub Pages requiere un repositorio público para cuentas gratuitas y el despliegue publica el contenido en Internet.
