/**
 * Generates Open Graph image for social media sharing.
 * Uses profile picture and creates a 1200x630px image.
 * Run: node scripts/generate-og-image.mjs
 */

import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');
const IMAGES_DIR = join(PUBLIC_DIR, 'images');
const OUTPUT_PATH = join(IMAGES_DIR, 'og-default.jpg');

// OG Image dimensions
const WIDTH = 1200;
const HEIGHT = 630;

const generateHTML = (profileImageBase64) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    /* Background pattern */
    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .container {
      display: flex;
      align-items: center;
      gap: 60px;
      z-index: 1;
      padding: 80px;
    }

    .profile-image {
      width: 280px;
      height: 280px;
      border-radius: 50%;
      border: 8px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      object-fit: cover;
      background: white;
    }

    .content {
      flex: 1;
      color: white;
    }

    .name {
      font-size: 72px;
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.1;
      text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .title {
      font-size: 42px;
      font-weight: 400;
      opacity: 0.95;
      line-height: 1.3;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .website {
      font-size: 32px;
      margin-top: 24px;
      opacity: 0.85;
      font-weight: 300;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="${profileImageBase64}" alt="Profile" class="profile-image">
    <div class="content">
      <h1 class="name">Lucien Bénié</h1>
      <p class="title">Staff Frontend Developer</p>
      <p class="website">lbenie.me</p>
    </div>
  </div>
</body>
</html>
`;

const generateOGImage = async () => {
  // Ensure output directory exists
  mkdirSync(IMAGES_DIR, { recursive: true });

  // Check if profile image exists
  const profileImagePath = join(IMAGES_DIR, 'profile.webp');
  if (!existsSync(profileImagePath)) {
    console.error('❌ Profile image not found at:', profileImagePath);
    process.exit(1);
  }

  console.log('🎨 Generating Open Graph image...');

  // Read and convert profile image to base64
  const profileImageBuffer = readFileSync(profileImagePath);
  const profileImageBase64 = `data:image/webp;base64,${profileImageBuffer.toString('base64')}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Set viewport to OG image dimensions
    await page.setViewport({
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 2, // For better quality
    });

    // Load HTML content
    await page.setContent(generateHTML(profileImageBase64), { waitUntil: 'networkidle0' });

    // Take screenshot
    await page.screenshot({
      path: OUTPUT_PATH,
      type: 'jpeg',
      quality: 90,
      clip: {
        x: 0,
        y: 0,
        width: WIDTH,
        height: HEIGHT,
      },
    });

    await page.close();

    console.log('✅ Open Graph image generated successfully!');
    console.log(`   Saved to: ${OUTPUT_PATH}`);
    console.log(`   Size: ${WIDTH}x${HEIGHT}px`);
  } finally {
    await browser.close();
  }
};

generateOGImage().catch((err) => {
  console.error('❌ Failed to generate OG image:', err);
  process.exit(1);
});
