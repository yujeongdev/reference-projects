const { chromium } = require('/opt/homebrew/Cellar/playwright-cli/0.1.14/libexec/lib/node_modules/@playwright/cli/node_modules/playwright');
const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    executablePath: '/Users/yujeong/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
  });
  const page = await browser.newPage();

  const jsResponses = [];
  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('_next/static') && url.includes('.js')) {
      jsResponses.push(url);
    }
  });

  await page.goto('https://junresearch.com/jensenHuangKRTracker', { waitUntil: 'networkidle' });
  
  // Broader chart/svg keywords
  const keywords = [
    'stackedbar', 'barchart', 'linechart', 'areachart',
    'SVGChart', 'svgchart', 'path d=', 'linearGradient',
    'd3.select', 'd3.scaleLinear', 'scaleBand', 'scaleOrdinal',
    'createChart', 'renderChart', 'ChartData',
    'scrolltrigger', 'ScrollTrigger', 'gsap.to',
    'WebGLRenderer', 'Scene', 'Camera', 'Mesh',
    'graphology', 'Graph()', 'WebGLRenderer',
    'sigma.js', 'Sigma(',
    'react-spring', 'useSpring', 'useTransform',
    'framer-motion', 'motion.div', 'AnimatePresence',
    'intersection', 'IntersectionObserver',
    'useInView', 'useAnimation', 'useScroll',
    'SWRConfig', 'useSWR', 'QueryClient',
    'zustand', 'create(', 'useStore',
    'next/navigation', 'useRouter', 'usePathname'
  ];
  
  for (const url of jsResponses) {
    try {
      const content = await fetchUrl(url);
      const found = keywords.filter(k => content.includes(k));
      if (found.length > 0) {
        const chunkName = url.split('/').pop().substring(0, 30);
        console.log(chunkName, '->', found.slice(0, 8).join(' | '));
      }
    } catch(e) {}
  }

  await browser.close();
})();
