const fs = require("fs")
var pong = fs.readFileSync("pong.js",'utf-8')
var readme = fs.readFileSync(".tREADME.md",'utf-8')
var bookmarklet = "javascript:" +  encodeURIComponent("(function(){" + pong.trim() +  "})();");
fs.writeFileSync("bookmarklet.js",bookmarklet)
fs.writeFileSync("pong.html",`<!DOCTYPE html><html><body><style>html { background-color: black; } </style> <script>window.pheight = true; ${pong}</script></body></html>`)
fs.writeFileSync("README.md",readme.replace("PONGEMBED",`[Drag me to your bookmarks](${bookmarklet})`))