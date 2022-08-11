let title = document.getElementById("title");
let dis = document.getElementById("desc");
let button = document.getElementById("btn");
let div = document.getElementById("savednotes");
let saved = document.getElementById("save");
let notes = JSON.parse(localStorage.getItem("note") || "[]");


function render() {
  saved.innerHTML = '';
  notes.forEach((element,index) => {
    let tag = `<div class="sample" onclick="update(${index},'${element.title}','${element.disc}')">
    <h2>${element.title}</h2>
    <p>${element.disc}</p>
    </div>`;
    saved.insertAdjacentHTML('afterend', tag);
  });
}



function update(index,tit,disc){
  console.log(index)
  title.value=tit;
  dis.value=disc;
  notes.splice(index,1);
  render();
  localStorage.setItem('note',JSON.stringify(notes))
}
button.addEventListener("click", (e) => {
  e.preventDefault();
  let notetitle = title.value;
  let notedis = dis.value;
  let noteinfo = {
    title: notetitle,
    disc: notedis,
  };
  notes.push(noteinfo);
  localStorage.setItem("note", JSON.stringify(notes));
render();
});
let store = localStorage.getItem('note');
if(store){
  render();
}
