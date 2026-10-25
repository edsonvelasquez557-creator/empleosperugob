# Consulta CUL — demostración local no oficial

Reproducción de las pantallas proporcionadas: formulario, resultado y visor de tres páginas. Incluye un aviso visible de demostración; no consulta registros oficiales ni acredita autenticidad o vigencia. El estado de la tabla es un dato de referencia de las capturas.

## Abrir

Abre `index.html` directamente en un navegador. También puedes ejecutar `npm start` y abrir http://127.0.0.1:4173.

La ruta `/CertificadoUnicoLaboral/Verificacion.html?cul=20264445411&numdoc=43339108` funciona al utilizar el servidor local.

## Probar

- Certificado: 20264445411
- Tipo: DNI
- Documento: 43339108
- RUC: 20601832390

Pulsa Buscar y luego Ver. El certificado se abre en una ventana o pestaña nueva, según la configuración del navegador, y la consulta original permanece abierta. Anterior y Siguiente recorren las tres páginas. Otro RUC o datos distintos no muestran el resultado. Limpiar vacía el formulario. Inicio vuelve a la consulta. El encabezado identifica la página como «Copia local · No oficial».

## Documento

`assets/certificado.pdf` es una copia exacta del archivo entregado. El visor utiliza representaciones PNG de sus páginas para conservar la apariencia y los controles de las capturas, sin depender del visor PDF de cada navegador. El PDF no se ha editado.

Todo funciona localmente, sin dependencias externas, almacenamiento de consultas ni envío de datos. El RUC se valida en el navegador para el flujo de demostración; no constituye un control de acceso a los archivos. No se ha publicado el contenido en Internet.
