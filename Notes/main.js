//helper functions
//get by selector
const $$ = q => document.querySelector(q);
//get by multiple by selector
const $ = q => document.querySelectorAll(q);
//create element
const _ = tag => document.createElement(tag);

//dom elements
let $btn_add_notebook = $$("#btn-add-notebook");
let $notebooks_tree = $$("#notebooks-tree");
let $notes_tree = $$("#notes-tree");
let $note_preview = $$("#note-preview");
let $note_add_form = $$("#note-add-form");

let storage = {
    noteID: 2,
    noteBookID: 1,
    noteBooks: [
        {
            id: 1,
            name: "Welcome"
        }
    ],
    notes: [
        {
            id: 1,
            title: "Welcome",
            body: "Welcome to the notes app.",
            noteBookID: 1
        },
        {
            id: 2,
            title: "Hello",
            body: "Hello there.",
            noteBookID: 1
        }
    ],
};



let currentNote = null;
let currentNoteBook = null;
if (storage.noteBooks[0]) {
    currentNoteBook = storage.noteBooks[0].id;
    let tempNote = storage.notes.find(note => note.noteBookID === currentNoteBook);
    if (tempNote) {
        currentNote = tempNote.id;
        showNote();
    }
}



updateNoteBooksTree();
updateNotesTree();


$btn_add_notebook.addEventListener('click', () => {

    if ($btn_add_notebook.classList.contains("active")) {
        $notebooks_tree.querySelector("li.temp input").focus();
        return;
    }

    $btn_add_notebook.classList.add("active");

    let $tempLI = _("li");
    $tempLI.classList.add("temp");
    $tempLI.classList.add("mt-5");
    $notebooks_tree.appendChild($tempLI);

    let $tempInput = _("input");
    $tempInput.className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    $tempInput.setAttribute("type", "text");
    $tempInput.setAttribute("placeholder", "New Notebook");
    $tempLI.appendChild($tempInput);
    $tempInput.focus();

    $btnAdd = _("button");
    $btnAdd.className = "ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
    $btnAdd.innerText = "Add";
    $tempLI.appendChild($btnAdd);
    $btnAdd.addEventListener('click', () => {
        let value = $tempInput.value.trim();
        if (!value) {
            $tempInput.focus();
            return;
        }

        let newNoteBookID = ++storage.noteBookID;
        let newNoteBook = {
            id: newNoteBookID,
            name: $tempInput.value
        };
        storage.noteBooks.push(newNoteBook);
        $tempLI.remove();
        $btn_add_notebook.classList.remove("active");
        updateNoteBooksTree();
        updateNotesTree();
    });

});

function updateNoteBooksTree() {
    $notebooks_tree.innerHTML = "";
    for (let noteBook of storage.noteBooks) {
        let $li = _("li");
        $li.className = "notebook p-4";
        //add active class
        if (noteBook.id === currentNoteBook) {
            $li.classList.add("bg-gray-800");
        }
        $li.setAttribute("data-id", noteBook.id);
        $li.innerHTML = `<a class="cursor-pointer nodebook-item">${noteBook.name}</a> <i class="cursor-pointer border-2 p-1 ml-1">Edit</i>`;

        let anchor = $li.querySelector("a");
        let edit = $li.querySelector("i");

        anchor.addEventListener("click", function () {
            currentNoteBook = noteBook.id;
            updateNotesTree();
        });

        $notebooks_tree.appendChild($li);
    }
}
function updateNotesTree() {
    $notes_tree.innerHTML = "";
    if (!storage.notes) {

        $notes_tree.innerHTML = "No nodes are added.";
        return;
    }
    for (let note of storage.notes) {
        if (note.noteBookID !== currentNoteBook) {
            continue;
        }

        let $li = _("li");
        $li.className = "note p-4";
        //add active class
        if (note.id === currentNote) {
            $li.classList.add("bg-gray-800");
        }
        $li.setAttribute("data-id", note.id);
        $li.innerHTML = `<a class="cursor-pointer nodebook-item">${note.title}</a> <i class="cursor-pointer border-2 p-1 ml-1">Edit</i>`;

        let anchor = $li.querySelector("a");
        let edit = $li.querySelector("i");
        anchor.addEventListener("click", function () {
            currentNote = note.id;
            updateNotesTree();
            showNote();
        });
        $notes_tree.appendChild($li);
    }
}

function showNote() {
    $note_preview.classList.remove("hidden");
    $note_add_form.classList.add("hidden");
    let note = storage.notes.find(n => n.id === currentNote);
    $note_preview.innerHTML = `<h1 class="text-7xl border-b-4 pb-3 mb-3">${note.title}</h1>
    <p>${note.body}</p>`;

}