(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const expected = { certificate: '20264445411', document: '43339108', ruc: '20601832390' };
  const form = $('search-form');
  let page = 1;
  const params = new URLSearchParams(location.search);
  const isViewerWindow = params.get('vista') === 'certificado';
  if (params.has('cul')) $('certificate').value = params.get('cul');
  if (params.has('numdoc')) $('document').value = params.get('numdoc');

  function hideResults() {
    $('results').hidden = true;
    $('search-screen').classList.remove('has-results');
    $('form-message').hidden = true;
    for (const id of Object.keys(expected)) $(id).removeAttribute('aria-invalid');
  }
  function showPage(nextPage) {
    page = Math.max(1, Math.min(3, nextPage));
    $('pdf-error').hidden = true;
    $('pdf-page').src = `assets/pdf/pagina-${page}.png`;
    $('pdf-page').alt = `Página ${page} de 3 del certificado adjunto`;
    $('page-counter').textContent = `Pág.: ${page} / 3`;
    $('previous').disabled = page === 1;
    $('next').disabled = page === 3;
  }
  function route() {
    const viewing = isViewerWindow;
    $('search-screen').hidden = viewing;
    $('viewer-screen').hidden = !viewing;
    document.title = 'Ministerio de Trabajo — Certificado Único Laboral';
    if (viewing) showPage(1);
    else if (location.hash === '#certificado') history.replaceState(null, '', location.pathname + location.search);
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    hideResults();
    let invalid = null;
    let message = '';
    for (const id of Object.keys(expected)) {
      $(id).value = $(id).value.trim();
      if (!$(id).value) { invalid = id; message = 'Completa el número de certificado, el documento y el RUC.'; break; }
      if (!/^\d+$/.test($(id).value)) { invalid = id; message = 'Ingresa únicamente números.'; break; }
    }
    if (!invalid && $('ruc').value !== expected.ruc) {
      invalid = 'ruc';
      message = 'El RUC ingresado no está habilitado para esta demostración.';
    }
    if (!invalid && ($('certificate').value !== expected.certificate || $('document').value !== expected.document || $('document-type').value !== 'DNI')) {
      invalid = $('certificate').value !== expected.certificate ? 'certificate' : 'document';
      message = 'No se encontraron resultados para los datos ingresados.';
    }
    if (invalid) {
      $(invalid).setAttribute('aria-invalid', 'true');
      $('form-message').textContent = message;
      $('form-message').hidden = false;
      $(invalid).focus();
      return;
    }
    $('results').hidden = false;
    $('search-screen').classList.add('has-results');
    $('results-title').focus({ preventScroll: true });
  });
  form.addEventListener('input', hideResults);
  form.addEventListener('change', hideResults);
  $('clear').addEventListener('click', () => {
    hideResults();
    for (const id of Object.keys(expected)) $(id).value = '';
    $('document-type').value = 'DNI';
    $('certificate').focus();
  });
  $('previous').addEventListener('click', () => showPage(page - 1));
  $('next').addEventListener('click', () => showPage(page + 1));
  $('pdf-page').addEventListener('error', () => { $('pdf-error').hidden = false; });
  document.querySelectorAll('[data-home]').forEach(link => link.addEventListener('click', event => {
    if (isViewerWindow) return;
    event.preventDefault();
    history.pushState(null, '', location.pathname + location.search);
    route();
    window.scrollTo(0, 0);
  }));
  $('legal-button').addEventListener('click', () => $('legal-dialog').showModal());
  $('legal-dialog').addEventListener('click', event => { if (event.target === $('legal-dialog')) $('legal-dialog').close(); });
  window.addEventListener('hashchange', route);
  window.addEventListener('popstate', route);
  route();
})();
