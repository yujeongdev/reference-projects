const { chromium } = require('/opt/homebrew/Cellar/playwright-cli/0.1.14/libexec/lib/node_modules/@playwright/cli/node_modules/playwright');
const fs = require('fs');
const screenshotsDir = '/Users/yujeong/reference-projects/screenshots';
fs.mkdirSync(screenshotsDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    executablePath: '/Users/yujeong/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://junresearch.com/jensenHuangKRTracker', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: '이해했고 동의합니다' }).click();
  await page.waitForTimeout(800);

  await page.screenshot({ path: screenshotsDir + '/01-hero.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log('01-hero done');

  await page.locator('#stats').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: screenshotsDir + '/02-stats.png', clip: { x: 0, y: 0, width: 1440, height: 800 } });
  console.log('02-stats done');

  await page.locator('#stocks').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: screenshotsDir + '/03-stocks.png', clip: { x: 0, y: 0, width: 1440, height: 800 } });
  console.log('03-stocks done');

  await page.locator('#map').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: screenshotsDir + '/04-map.png', clip: { x: 0, y: 0, width: 1440, height: 800 } });
  console.log('04-map done');

  await page.locator('#events').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: screenshotsDir + '/05-news.png', clip: { x: 0, y: 0, width: 1440, height: 800 } });
  console.log('05-news done');

  const libCheck = await page.evaluate(() => {
    var windowKeys = Object.keys(window).filter(function(k) { 
      return ['d3','L','mapboxgl','Chart','Recharts','sigma','cytoscape','echarts','THREE','PIXI'].indexOf(k) >= 0; 
    });
    var svgCount = document.querySelectorAll('svg').length;
    var canvasCount = document.querySelectorAll('canvas').length;
    return { windowKeys: windowKeys, svgCount: svgCount, canvasCount: canvasCount };
  });
  console.log('LibCheck:', JSON.stringify(libCheck, null, 2));

  await browser.close();
})();
