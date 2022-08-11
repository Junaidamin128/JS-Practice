const getByID = (id) => document.getElementById(id);
const $notebookItems = getByID("notebook-items");
const $noteItems = getByID("note-items");
const $noteForm = getByID("note-form");
const $preview = getByID("preview");
const $addFolder = getByID("addFolder");
const $addFolderName = getByID("addFolderName");
const $notebookForm = getByID("notebook-form");
const $notebookFormName = getByID("notebook-form-name");
const $btnAddNote = getByID("btnAddNote");

const $noteSave = getByID("note-save");
const $title = getByID("title");
const $dis = getByID("dis");

let storage = {
  noteBookID: 2,
  noteID: 1,
  noteBooks: [
    {
      id: 1,
      name: "NoteBook1",
    },
    {
      id: 2,
      name: "NoteBook2",
    },
  ],
  notes: [
    {
      id: 1,
      noteBookID: 1,
      title: "abcd",
      body: "efgh",
    },
    {
      id: 2,
      noteBookID: 1,
      title: "abcsde",
      body: "abcd3e",
    },
  ],
};

// $noteForm.classList.add("hidden");
$noteSave.addEventListener("click", function (evt) {
  evt.preventDefault();
  let title = $title.value;
  let dis = $dis.value;
  if (selectedNote) {
    let selectedNotes = storage.notes.filter((note) => note.id == selectedNote);
    let note = selectedNotes[0];
    note.title = title;
    note.body = dis;
  } else {
    selectedNote = ++storage.noteID;
    let note = {
      noteBookID: selectedNoteBook,
      id: selectedNote,
      title: title,
      body: dis,
    };
    storage.notes.push(note);
  }

  showNotePreview();
  updateNoteItems();
});

let selectedNoteBook = 1;
let selectedNote = 1;
let mode = "preview"; // preview/edit

$addFolder.addEventListener("click", () => {
  $notebookForm.classList.remove("hidden");
});

$addFolderName.addEventListener("click", (evt) => {
  evt.preventDefault();
  selectedNoteBook = ++storage.noteBookID;
  let noteBook = {
    id: selectedNoteBook,
    name: $notebookFormName.value,
  };
  storage.noteBooks.push(noteBook);
  $notebookForm.classList.add("remove");
  updateNotebookItems();
});

$btnAddNote.addEventListener("click", function () {
  selectedNote = null;
  showNoteAddForm();
});

updateNotebookItems();
function updateNotebookItems() {
  $notebookItems.innerHTML = "";
  storage.noteBooks.forEach((element) => {
    console.log(element);
    let li = document.createElement("li");
    let notebook = `<a class="notebook-item" data-id="${element.id}">${element.name}</a>`;
    li.innerHTML = notebook;
    li.addEventListener("click", function () {
      selectedNoteBook = element.id;
      updateNoteItems();
    });
    $notebookItems.appendChild(li);
  });
  updateNoteItems();
}

function updateNoteItems() {
  $noteItems.innerHTML = "No items";

  let currentNotes = storage.notes.filter(
    (element) => element.noteBookID == selectedNoteBook
  );
  if (currentNotes.length) {
    $noteItems.innerHTML = "";
    currentNotes.forEach((element) => {
      let li = document.createElement("li");
      let note = `<a class="notebook-item" data-id="${element.id}">${element.title}</a>  <b>Edit</b>`;
      li.innerHTML = note;
      li.querySelector("a").addEventListener("click", function () {
        selectedNote = element.id;
        showNotePreview();
      });

      li.querySelector("b").addEventListener("click", function () {
        selectedNote = element.id;
        showNoteAddForm();
      });

      $noteItems.appendChild(li);
    });
  }
}

function showNoteAddForm() {
  $noteForm.classList.remove("hidden");
  $preview.classList.add("hidden");

  if (selectedNote) {
    //edit
    let selectedNotes = storage.notes.filter((note) => note.id == selectedNote);
    let note = selectedNotes[0];

    $title.value = note.title;
    $dis.value = note.body;
  } else {
    $title.value = "";
    $dis.value = "";
  }
}

function hideNoteAddForm() {
  $noteForm.classList.add("hidden");
  $preview.classList.remove("hidden");
}

function showNotePreview() {
  $preview.classList.remove("hidden");
  $noteForm.classList.add("hidden");
  let selectedNotes = storage.notes.filter((note) => note.id == selectedNote);
  $preview.innerHTML = "Select a note to show";
  if (selectedNotes.length) {
    let note = selectedNotes[0];
    $preview.innerHTML = `<h1>${note.title}</h1>
      <p>
       ${note.body}
      </p>`;
  }
}

function showNoteForm() {}
