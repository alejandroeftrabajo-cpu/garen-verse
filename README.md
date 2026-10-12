# GAREN VERSE 1.5 · Portales de acceso

Actualización incremental basada en la versión 1.4.5 del repositorio `alejandroeftrabajo-cpu/garen-verse`.

## Subida manual a GitHub Pages

En la rama `main`, reemplaza en la raíz `index.html`, `style.css` y `app.js`. Después, dentro de `assets/`, sube los cuatro archivos `portal-erik.webp`, `portal-arlin.webp`, `portal-asunaah.webp` y `portal-alerik.webp`. Confirma los cambios y espera a que GitHub Pages finalice su despliegue. **No elimines ni sustituyas** `stage.jpg`, `arlin.jpg`, `asunaah.jpg`, `erik.jpg` o `alerik.jpg`.

## Comportamiento

- Se elimina `HOME` de la cabecera, conservando EXPLORE, ABOUT, el logotipo y BACK TO TOP.
- La selección desde portada y desde Four Worlds sigue abriendo primero la ficha individual.
- El antiguo botón rectangular se sustituye por un portal circular con imagen y texto.
- El portal ERIK es un enlace real a `https://erikgaren.com/`. Sin JavaScript también funciona.
- Los otros tres portales se muestran como destinos pendientes, sin enlaces falsos.
- En `app.js`, cambia únicamente los valores `null` de `DESTINATIONS` cuando existan URLs confirmadas.
- Animaciones de hover solo en dispositivos con puntero fino; interacción táctil con un toque; movimiento reducido respetado.

## Notas de los recursos

Los WebP contienen canal alfa real, creado mediante una máscara circular a partir de la imagen JPG compuesta que proporcionó el usuario. **La fuente JPG tiene el patrón cuadriculado incorporado**, por lo que la extracción no equivale a recuperar un alfa original: puede quedar un leve halo de borde o cortarse algún píxel exterior. Para una extracción perfecta hacen falta los cuatro originales con transparencia real.

## Verificación

Se han comprobado sintaxis JavaScript, estructura HTML, selectores/referencias, transparencia alfa y apertura del ZIP. El navegador Chromium del entorno impidió cargar la página local (`ERR_BLOCKED_BY_ADMINISTRATOR`); no se afirma haber probado el resultado en Safari/iPad. Validar visualmente antes de dar por finalizada la versión.
