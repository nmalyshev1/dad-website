const fs = require('fs');

// Patch request.html
let reqHtml = fs.readFileSync('request.html', 'utf8');
let reqFind = `        fetch(\`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/\${appKey}/\${bookingKey}/\${encodeURIComponent(JSON.stringify(bookingData))}\`, {
          method: 'POST',
          headers: { 'Content-Length': '0' }
        })
        .then(() => {`;

let reqReplace = `        const jsonStr = JSON.stringify(bookingData);
        const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
        const safeB64 = b64.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
        const chunkSize = 200;
        let chunks = [];
        for (let i = 0; i < safeB64.length; i += chunkSize) {
            chunks.push(safeB64.substring(i, i + chunkSize));
        }
        let promises = chunks.map((chunk, i) => 
            fetch(\`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/\${appKey}/\${bookingKey}_c\${i}/\${chunk}\`, { method: 'POST', headers: { 'Content-Length': '0' }})
        );
        promises.push(fetch(\`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/\${appKey}/\${bookingKey}_len/\${chunks.length}\`, { method: 'POST', headers: { 'Content-Length': '0' }}));

        Promise.all(promises).then(() => {`;

if(reqHtml.includes(reqFind)) {
    reqHtml = reqHtml.replace(reqFind, reqReplace);
    fs.writeFileSync('request.html', reqHtml);
    console.log('Patched request.html');
} else {
    console.log('reqFind not found in request.html');
}

// Patch dad-planner/index.html (Read chunked data)
let planHtml = fs.readFileSync('../dad-planner/index.html', 'utf8');
let planFind = `          const fetchPromises = cloudIds.map(id =>
            fetch(\`https://keyvalue.immanuel.co/api/KeyVal/GetValue/\${appKey}/vtransfer_b_\${id}\`)
              .then(res => res.json())
              .then(dataStr => {
                if (dataStr) {
                  try {
                    let cleanedStr = dataStr.replace(/^"+|"+$/g, '').replace(/\\"/g, '"');
                    let b = JSON.parse(cleanedStr);`;

let planReplace = `          const fetchPromises = cloudIds.map(id =>
            fetch(\`https://keyvalue.immanuel.co/api/KeyVal/GetValue/\${appKey}/vtransfer_b_\${id}_len\`)
              .then(res => res.json())
              .then(lenStr => {
                if (!lenStr) return null;
                let len = parseInt(lenStr.replace(/"/g, ''));
                if (isNaN(len)) return null;
                let chunkPromises = [];
                for(let i=0; i<len; i++) {
                    chunkPromises.push(fetch(\`https://keyvalue.immanuel.co/api/KeyVal/GetValue/\${appKey}/vtransfer_b_\${id}_c\${i}\`).then(r => r.json()));
                }
                return Promise.all(chunkPromises).then(chunkArr => {
                    let safeB64 = chunkArr.map(c => c ? c.replace(/^"+|"+$/g, '') : '').join('');
                    let b64 = safeB64.replace(/-/g, '+').replace(/_/g, '/');
                    while(b64.length % 4) b64 += '=';
                    let jsonStr = decodeURIComponent(escape(atob(b64)));
                    let b = JSON.parse(jsonStr);`;

if(planHtml.includes(planFind)) {
    planHtml = planHtml.replace(planFind, planReplace);
    console.log('Patched dad-planner GetValue');
} else {
    console.log('planFind not found in dad-planner/index.html');
}

// Patch dad-planner/index.html (Write chunked data)
let planFindWrite = `      fetch(\`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/\${appKey}/\${bookingKey}/\${encodeURIComponent(JSON.stringify(booking))}\`, {
        method: 'POST', headers: { 'Content-Length': '0' }
      }).then(() => {`;

let planReplaceWrite = `      const jsonStr = JSON.stringify(booking);
      const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
      const safeB64 = b64.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
      const chunkSize = 200;
      let chunks = [];
      for (let i = 0; i < safeB64.length; i += chunkSize) {
          chunks.push(safeB64.substring(i, i + chunkSize));
      }
      let promises = chunks.map((chunk, i) => 
          fetch(\`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/\${appKey}/\${bookingKey}_c\${i}/\${chunk}\`, { method: 'POST', headers: { 'Content-Length': '0' }})
      );
      promises.push(fetch(\`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/\${appKey}/\${bookingKey}_len/\${chunks.length}\`, { method: 'POST', headers: { 'Content-Length': '0' }}));
      
      Promise.all(promises).then(() => {`;

if(planHtml.includes(planFindWrite)) {
    planHtml = planHtml.replace(planFindWrite, planReplaceWrite);
    fs.writeFileSync('../dad-planner/index.html', planHtml);
    console.log('Patched dad-planner UpdateValue');
} else {
    console.log('planFindWrite not found in dad-planner/index.html');
}
