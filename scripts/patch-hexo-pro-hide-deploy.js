const fs = require('fs');
const path = require('path');

const target = path.join(
  __dirname,
  '..',
  'node_modules',
  'hexo-pro',
  'www',
  'index.html'
);

const marker = 'data-hide-hexo-pro-deploy';

if (!fs.existsSync(target)) {
  console.log('[patch-hexo-pro-hide-deploy] target not found, skipping');
  process.exit(0);
}

const injection = `
<script ${marker}="true">
(() => {
  const DEPLOY_TEXT = /部署|deploy/i;
  const hideDeployEntries = () => {
    document.querySelectorAll('a, button, span, div, li').forEach((node) => {
      const text = (node.textContent || '').trim();
      const href = node.getAttribute && node.getAttribute('href');
      if (!text && !href) return;
      const matchesText = DEPLOY_TEXT.test(text);
      const matchesHref = href && /deploy/i.test(href);
      if (!matchesText && !matchesHref) return;

      const clickable = node.closest('a, button, li, .ant-menu-item, .menu-item, [role="menuitem"]');
      const targetNode = clickable || node;
      if (!targetNode || targetNode === document.body || targetNode === document.documentElement) return;

      targetNode.style.display = 'none';
      targetNode.setAttribute('aria-hidden', 'true');
    });
  };

  const boot = () => {
    hideDeployEntries();
    const observer = new MutationObserver(hideDeployEntries);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setInterval(hideDeployEntries, 1500);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
</script>
`;

const html = fs.readFileSync(target, 'utf8');
if (html.includes(marker)) {
  console.log('[patch-hexo-pro-hide-deploy] patch already applied');
  process.exit(0);
}

const patched = html.replace('</head>', `${injection}\n</head>`);
if (patched === html) {
  console.error('[patch-hexo-pro-hide-deploy] failed to patch index.html');
  process.exit(1);
}

fs.writeFileSync(target, patched, 'utf8');
console.log('[patch-hexo-pro-hide-deploy] patch applied');
