let title = document.getElementById("title");
let disc = document.getElementById("desc");
let btn = document.getElementById("btn");
let store = document.getElementById("save");
let note = JSON.parse(localStorage.getItem("notes") || "[]");

btn.addEventListener("click", () => {
  let notetitle = title.value;
  let notedis = disc.value;
  let noteinfo = {
    nt: notetitle,
    nd: notedis,
  };
  note.push(noteinfo);
  localStorage.setItem("notes", JSON.stringify(note));
  render(note);
  title.value = "";
  disc.value = "";
  title.focus();
});

function render(note) {
  store.innerHTML = "";
  note.forEach((element, index) => {
    let li = document.createElement("li");
    let tag = `<div class="sample" onclick="update(${index},'${element.nt}','${element.nd}')">
    <h2>${element.nt}</h2>
    <p>${element.nd}</p>
  </div>`;
    li.innerHTML = tag;
    store.appendChild(li);
  });
}

function update(index, tit, discription) {
  console.log(index);
  title.value = tit;
  disc.value = discription;
  note.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(note));
  render(note);
}
render(note);
