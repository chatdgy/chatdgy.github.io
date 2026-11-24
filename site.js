const viewer = document.getElementById('figure-view');
const fullFigure = document.getElementById('full-figure');
const caption = document.getElementById('figure-caption');
const source = document.getElementById('figure-source');

if (typeof viewer.showModal === 'function') {
  for (const link of document.querySelectorAll('a.zoom')) {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      fullFigure.src = link.href;
      fullFigure.alt = link.dataset.caption;
      caption.textContent = link.dataset.caption;
      source.href = link.dataset.source;
      viewer.showModal();
    });
  }
  document.getElementById('close-view').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const box = viewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) viewer.close();
  });
}
