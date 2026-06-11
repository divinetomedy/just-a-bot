// templates/app/ds-base.js
// Points to this design system's root (two levels up from templates/app/).
// In a consuming project, change `base` to point to where the DS is installed.
(() => {
  const base = '../..';
  for (const p of ['styles.css']) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, update the `base` variable in ds-base.js to point at the bound _ds folder.');
  document.head.appendChild(s);
})();
