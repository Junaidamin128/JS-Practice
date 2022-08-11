// selector function
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// Element create function
const _ = (tag) => document.createElement(tag);

// dom notebook element
let btnNotebookForm = $("#btnNotebookForm");
let btnAddNotebook = $("#btnAddNotebook");
let notebookForm = $("#notebookForm");
let notebookTree = $("#notebookTree");
// dom note element
let btnNoteForm = $("#btnNoteForm");
let noteForm = $("#noteForm");
let noteTree = $("#noteTree");

let btnAddNote = $("#btnAddNote");
let preview = $("#preview");
// storage
let storage = {
  noteID: 1,
  notebookID: 1,
  noteBook: [
    {
      id: 1,
      name: "Notebook1",
    },
  ],
  note: [
    {
      id: 1,
      title: "Hello",
      body: "World",
      notebookID: 1,
    },
  ],
};
let currentNote = 1;
let currentNotebook = null;

updateNotebook();
updateNote();
// notebook
btnNotebookForm.addEventListener("click", () => {
  notebookForm.classList.remove("hidden");
  let notebook = $("#notebook").focus();
  currentNotebook = null;
});

btnAddNotebook.addEventListener("click", (evt) => {
  evt.preventDefault();
  let notebook = $("#notebook");
  if (!notebook.value) {
    notebook.focus();
    return;
  }
  if (currentNotebook == null) {
    let newNotebookID = ++storage.notebookID;
    let newNotebook = {
      id: newNotebookID,
      name: notebook.value,
    };
    storage.noteBook.push(newNotebook);
  }
  else{
    let a = storage.noteBook.find(n=>n.id==currentNotebook);
    a.name = notebook.value
  }
  notebook.value = "";
  notebookForm.classList.add("hidden");
  updateNotebook();
});

function updateNotebook() {
  notebookTree.innerHTML = "";
  storage.noteBook.forEach((el) => {
    let li = _("li");
    li.classList.add("mt-6");
    li.innerHTML = `<a class='cursor-pointer'>${el.name}</a><i class="cursor-pointer border-4 p-1 rounded m-1 hover:bg-white hover:text-black">Edit</i>`;
    notebookTree.appendChild(li);
    li.setAttribute("data-id", el.id);
    let anchor = li.querySelector("a");
    let edit = li.querySelector("i");
    anchor.addEventListener("click", () => {
      //   console.log("hello");
      currentNotebook = el.id;
      console.log(el.id);
      updateNote();
    });
    edit.addEventListener("click", () => {
      currentNotebook = el.id;
      notebookForm.classList.remove("hidden");
      console.log(el.name);
      notebookForm.value = el.name;
      
    });
  });
}

//-------------- notes----------- //

btnNoteForm.addEventListener("click", () => {
  noteForm.classList.remove("hidden");
  preview.classList.add("hidden");
  let title = $("#title").focus();

  currentNote = null;
});

btnAddNote.addEventListener("click", (evt) => {
  evt.preventDefault();
  let $title = $("#title");
  let $body = $("#discription");

  if ($title.value == "") {
    $title.focus();
    return;
  }
  //add
  if (currentNote == null) {
    let noteID = ++storage.noteID;
    let newNote = {
      id: noteID,
      title: $title.value,
      body: $body.value,
      notebookID: currentNotebook,
    };

    currentNote = noteID;
    storage.note.push(newNote);
  } else {
    let b = storage.note.find((e) => e.id == currentNote);
    b.title = $title.value;
    b.body = $body.value;
    b.notebookID = currentNotebook;
  }

  updateNote();
  showNote();

  $title.value = "";
  $body.value = "";
});

function updateNote() {
  noteTree.innerHTML = "";

  storage.note.forEach((el) => {
    if (el.notebookID !== currentNotebook) {
      // noteTree.innerHTML = "no notes are added";
      return;
    }

    let li = _("li");
    li.setAttribute("data-id", el.id);
    li.innerHTML = `<a class="cursor-pointer">${el.title}</a><i class="cursor-pointer border-4 p-1 rounded m-1 hover:bg-white hover:text-black">Edit</i>`;
    li.classList.add("mb-5");
    noteTree.appendChild(li);
    // currentNote = el.id;
    let anchor = li.querySelector("a");
    let edit = li.querySelector("i");

    anchor.addEventListener("click", () => {
      currentNote = el.id;

      console.log(currentNote);
      noteForm.classList.add("hidden");
      preview.classList.remove("hidden");
      showNote();
    });

    edit.addEventListener("click", () => {
      currentNote = el.id;
      noteForm.classList.remove("hidden");
      preview.classList.add("hidden");
      let $title = $("#title");
      let $body = $("#discription");
      $title.value = el.title;
      $body.value = el.body;
    });
  });
}

function showNote() {
  noteForm.classList.add("hidden");
  preview.classList.remove("hidden");
  let note = storage.note.find((n) => n.id === currentNote);
  preview.innerHTML = `<h1 class="text-7xl border-b-4 pb-3 mb-3">${note.title}</h1>
    <p>${note.body}</p>`;
}
