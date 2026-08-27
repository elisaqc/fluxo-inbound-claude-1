require('dotenv').config();
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({ secure: true });

const testImagePath = path.join(__dirname, 'fixtures', 'test-image.png');

async function main() {
  console.log('Testando upload isolado pro Cloudinary...');
  console.log('cloud_name:', cloudinary.config().cloud_name);

  try {
    const result = await cloudinary.uploader.upload(testImagePath, {
      folder: 'fluxo-inbound-test',
      public_id: `network-test-${Date.now()}`,
    });
    console.log('SUCESSO');
    console.log('URL publica:', result.secure_url);
    process.exit(0);
  } catch (err) {
    console.error('FALHA no upload pro Cloudinary');
    console.error('Nome do erro:', err.name);
    console.error('Mensagem:', err.message);
    if (err.http_code) console.error('HTTP code:', err.http_code);
    process.exit(1);
  }
}

main();
