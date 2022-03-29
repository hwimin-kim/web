let M ={ 
  createform : (crud)=>{
    return `<form action="/${crud}_process" method="post">
  <p><input type="text" name="title" placeholder="title"></p>
  <p>
    <textarea name="description" placeholder="description"></textarea>
  </p>
  <p>
    <input type="submit">
  </p>
</form>`
},
updateform : (crud, title, description)=>{
  return `<form action="/${crud}_process" method="post">
  <p><input type="hidden" name="id" value="${title}"></p>
  <p><input type="text" name="title" placeholder="title" value="${title}"></p>
  <p>
    <textarea name="description" placeholder="description">${description}</textarea>
  </p>
  <p>
    <input type="submit">
  </p>
</form>`;
},
deleteform : (title)=>{
 return `<form action="/delete_process" method="post">
    <input type="hidden" name="id" value="${title}">
    <input type="submit" value="delete">
</form>`;
}
}

module.exports = M;