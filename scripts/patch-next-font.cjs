// Google Fonts sometimes hands Vercel's build machines font links with no file
// extension (e.g. fonts.gstatic.com/l/font?kit=...). Next 15.1's font loader
// reads the extension with a regex and crashes on null, failing the whole
// build. This patch falls back to woff2 (what Google serves to that browser).
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "node_modules", "next", "dist", "compiled", "@next", "font", "dist", "google", "loader.js");
try {
  const src = fs.readFileSync(file, "utf8");
  const from = String.raw`/\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl)[1]`;
  const to = String.raw`(/\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl) || [null, "woff2"])[1]`;
  if (src.includes(from)) {
    fs.writeFileSync(file, src.replace(from, to));
    console.log("patch-next-font: patched");
  } else {
    console.log("patch-next-font: nothing to patch");
  }
} catch (e) {
  console.log("patch-next-font: skipped (" + e.message + ")");
}
