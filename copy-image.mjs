import { copyFileSync, existsSync } from 'fs';

const src = 'C:\\Users\\dark\\.gemini\\antigravity\\brain\\48f6fb54-9474-438b-8f26-351072b1fbb7\\fish_jumping_cover_1778233563808.png';
const dest = 'd:\\portfoliodev-main\\public\\comfort_zone_cover.png';

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log('✅ Image copied successfully to public/comfort_zone_cover.png');
} else {
  console.log('❌ Source file not found:', src);
}
