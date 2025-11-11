// makeQR.js
import QRCode from "qrcode";

const url = "https://shengyaoliu.github.io/RCTs-v1/";

QRCode.toFile("rct-quest-qr.png", url, {
  color: { dark: "#000000", light: "#FFFFFF" },
  width: 400,
}, (err) => {
  if (err) throw err;
  console.log("✅ QR code saved as rct-quest-qr.png");
});
