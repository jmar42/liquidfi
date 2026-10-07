const fs=require('fs');
let h=fs.readFileSync('app.html','utf8');
const sdk=fs.readFileSync('node_modules/@stellar/stellar-sdk/dist/stellar-sdk.min.js','utf8');
const qr=fs.readFileSync('node_modules/qrcode-generator/dist/qrcode.js','utf8');
for (const [n,t] of [['sdk',sdk],['qr',qr]]) if (/<\/script/i.test(t)) throw new Error(n+' contains </script');
h=h.split('/*SDK*/').join(sdk.replace(/\/\/# sourceMappingURL=.*$/m,'')).split('/*QR*/').join(qr);
fs.writeFileSync('killswitch.html',h);
console.log('bytes',h.length);
