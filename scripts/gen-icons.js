const fs = require("fs");
const zlib = require("zlib");

function crc(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeB = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc(Buffer.concat([typeB, data])));
  return Buffer.concat([len, typeB, data, crcBuf]);
}

function png(size, r, g, b) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3);
    for (let x = 0; x < size; x++) {
      const cx = x - size / 2;
      const cy = y - size / 2;
      const d = Math.sqrt(cx * cx + cy * cy);
      const inside = d < size * 0.42;
      const i = 1 + x * 3;
      if (inside) {
        row[i] = r;
        row[i + 1] = g;
        row[i + 2] = b;
      } else {
        row[i] = 15;
        row[i + 1] = 23;
        row[i + 2] = 42;
      }
    }
    rows.push(row);
  }
  const idat = zlib.deflateSync(Buffer.concat(rows));
  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

fs.mkdirSync("public/icons", { recursive: true });
fs.writeFileSync("public/icons/icon-192.png", png(192, 37, 99, 235));
fs.writeFileSync("public/icons/icon-512.png", png(512, 37, 99, 235));
console.log("icons ok");
