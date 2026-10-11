const { chromium } = require('playwright'); const path = require('node:path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.pdf({path:process.argv[3],format:'Letter',printBackground:true,preferCSSPageSize:true});await b.close();})();
