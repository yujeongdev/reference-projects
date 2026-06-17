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
  
  const keywords = [
    'recharts', 'framer', 'd3-shape', 'd3-scale', 'd3-force', 'd3-zoom', 'd3-path',
    'cytoscape', 'sigma', 'echarts', 'chart.js', 'chartjs', 'leaflet', 'mapbox', 
    'react-map', 'visx', 'nivo', 'victory', 'highcharts', 'apexcharts', 'plotly',
    'three.js', 'threejs', 'pixi', 'konva', 'fabric', 'gsap', 'anime', 'lottie',
    'react-spring', 'react-query', 'swr', 'zustand', 'jotai', 'recoil', 'redux',
    'zod', 'react-hook-form', 'react-table', 'tanstack', 'radix', 'headlessui',
    'react-intersection-observer', 'graphology', 'cosmos', 'force-graph'
  ];
  
  console.log('Total chunks:', jsResponses.length);
  
  for (const url of jsResponses) {
    try {
      const content = await fetchUrl(url);
      const lower = content.toLowerCase();
      const found = keywords.filter(k => lower.includes(k));
      if (found.length > 0) {
        console.log('FOUND in', url.split('/').pop().substring(0, 35), ':', found.join(', '));
      }
    } catch(e) {}
  }

  await browser.close();
})();
