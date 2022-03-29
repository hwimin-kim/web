const testFolder = './data';
const fs = require('fs');

fs.readdir(testFolder, (err, filelist) => {
    filelist.forEach(file => {
      console.log(file);
    });
    
  });
  
  //디렉토리 위치에서 (데이터 폴더 위치), (모듈 위치)
  // web2 위치에서 (data폴더), (readdir.js)
  //node api/readdir.js