const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const M = require('./module/form.js');


let templateHTML = (title, list, body, crud)=>{
return `
<!doctype html>
<html>
<head>
<title>WEB1 - ${title}</title>
<meta charset="utf-8">
</head>
<body>
<h1><a href="/">WEB</a></h1>
${list}
${crud}
${body}
</body>
</html>
`;
};

let templateList = (filelist) =>{
  let list = '<ul>'
  filelist.forEach(file => {
   list = list + `<li><a href="/?id=${file}">${file}</a></li>`
  });
  list = list+'</ul>'

  return list;
};

let app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){ 
        // "/"
        fs.readdir('./data', (err, filelist)=>{
          let title = 'welcome';
          let description = 'Hello, Node js';
          let list = templateList(filelist);
          let template = templateHTML(title, list,
            `<h2>${title}</h2><p>${description}</p>`,
            `<a href="/create">create</a>`
            );
        response.writeHead(200);
        response.end(template);
        })     
      }else{
        // "/?id=string"
        fs.readdir('./data', (err, filelist)=>{
          fs.readFile(`data/${queryData.id}`,'utf8',(err, description)=>{         
            let title = queryData.id;
            let list = templateList(filelist);
            let template = templateHTML(title, list,
              `<h2>${title}</h2><p>${description}</p>`,
              `<a href="/create">create</a> 
               <a href="/update?id=${title}">update</a>
               ${M.deleteform(title)}`
              );
          response.writeHead(200);
          response.end(template);
          });
        });    
      }
    }else if(pathname === '/create'){
      if(queryData.id === undefined){   
        // "/create"
        fs.readdir('./data', (err, filelist)=>{
          let title = 'create';
          let list = templateList(filelist);
          let template = templateHTML(title, list, `${M.createform(title)}`, '');
        response.writeHead(200);
        response.end(template);
        })     
      }
    }else if(pathname === '/create_process'){
      // "/create_process"
      let body = ''
      request.on('data',(data)=>{
        body = body + data;
      })
      request.on('end',()=>{
        // let post = qs.parse(body);
        // let title = post.title;
        // let description = post.description;
        let title = new URLSearchParams(body).get('title');
        let description = new URLSearchParams(body).get('description');
        fs.writeFile(`./data/${title}`,description,(err)=>{
          if(err) throw err;
          response.writeHead(302,{Location: `/?id=${title}`});
          response.end();
        });
      })
    } else if (pathname === '/update') {
      // "/update"
      fs.readdir('./data', (err, filelist) => {
        fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
          let title = queryData.id;
          let list = templateList(filelist);
          let template = templateHTML(title, list, `${M.updateform('update', title, description)}`, '');
          response.writeHead(200);
          response.end(template);
        });
      });
    }else if(pathname === '/update_process'){
    // "/update_process"
    let body = ''
    request.on('data', (data) => {
      body = body + data;
    })
    request.on('end', () => {
      let id = new URLSearchParams(body).get('id');
      let title = new URLSearchParams(body).get('title');
      let description = new URLSearchParams(body).get('description');
      fs.rename(`./data/${id}`, `./data/${title}`, (err) => {
        if (err) throw err;
        fs.writeFile(`./data/${title}`, description, (err) => {
          if (err) throw err;
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    })
  }else if(pathname === '/delete_process'){
    let body = ''
    request.on('data', (data) => {
      body = body + data;
    })
    request.on('end', () => {
      let id = new URLSearchParams(body).get('id');
      fs.unlink(`./data/${id}`,(err)=>{
        if(err) throw err;
        response.writeHead(302, { Location: `/` });
        response.end();
      })
    })
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);