const viewer = document.getElementById('figure-view');
const fullFigure = document.getElementById('full-figure');
const caption = document.getElementById('figure-caption');
const source = document.getElementById('figure-source');
const chinese = document.documentElement.lang === 'zh-CN';
const viewerLabels = chinese
  ? {photo: '学术活动', contact: '微信联系', framework: '研究框架', poster: '论文海报'}
  : {photo: 'Conference moments', contact: 'WeChat', framework: 'Research framework', poster: 'Research poster'};

for (const link of document.querySelectorAll('.language-switch')) {
  const target = new URL(link.getAttribute('href'), location.href);
  const updateLanguageLink = () => {
    target.hash = location.hash;
    link.href = target.href;
  };
  updateLanguageLink();
  window.addEventListener('hashchange', updateLanguageLink);
}

if (typeof viewer.showModal === 'function') {
  for (const link of document.querySelectorAll('a.zoom')) {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      fullFigure.src = link.href;
      fullFigure.alt = link.dataset.caption;
      caption.textContent = link.dataset.caption;
      viewer.dataset.kind = link.dataset.kind || 'framework';
      document.getElementById('figure-label').textContent = viewerLabels[viewer.dataset.kind] || viewerLabels.framework;
      source.hidden = !link.dataset.source;
      if (link.dataset.source) source.href = link.dataset.source;
      else source.removeAttribute('href');
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
