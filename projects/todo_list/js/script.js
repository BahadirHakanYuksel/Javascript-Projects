const searchInput = document.getElementById("search");
const list = document.querySelector(".list");
const allDeleteBtn = document.querySelector(".allDeleteBtn");
const selectionMain = document.querySelector(".selectionMain");
const selectionTypes = document.querySelectorAll(".selectionTypes");
const searchbar = document.querySelector(".searchbar");
const emptyPage = document.querySelector(".emptyPage");
let isSelection = false;
let HTML_note = "";
let notes =
  JSON.parse(localStorage.getItem("Notes")) !== null
    ? JSON.parse(localStorage.getItem("Notes"))
    : [];

let mainIndexArray = [];
if (notes.length > 0) {
  notes.forEach((note) => {
    mainIndexArray.push(note.noteIndex);
  });
}
let tryarray = [];
let updateNoteInput = "";
let beforeEditInput = "";
let noteType = "";

class addNote {
  constructor(note, type, noteIndex) {
    (this.note = note), (this.type = type), (this.noteIndex = noteIndex);
  }
}

emptyPage.addEventListener("click", () => {
  searchInput.click();
  emptyPageControl();
});

function emptyPageControl() {
  console.log();
  if (JSON.parse(localStorage.getItem("Notes")).length > 0)
    emptyPage.style.display = "none";
  else emptyPage.style.display = "block";
}

allDeleteBtn.addEventListener("click", allDeleteNotes);

function allDeleteNotes() {
  notes = [];
  HTML_note = "";
  localStorage.setItem("Notes", JSON.stringify(notes));
  list.innerHTML = HTML_note;
  emptyPageControl();
}

searchbar.addEventListener("click", () => {
  if (isSelection === false) {
    selectionMain.style.visibility = "visible";
    selectionMain.style.opacity = "1";
    selectionMain.style.pointerEvents = "all";
  }
});

selectionTypes.forEach((selectionType) => {
  selectionType.addEventListener("click", (e) => {
    console.log(
      e.target.classList[0] === "selectionBtn" && isSelection === false
    );
    if (e.target.classList[0] === "selectionBtn" && isSelection === false) {
      selectionMain.style.visibility = "hidden";
      selectionMain.style.opacity = "0";
      selectionMain.style.pointerEvents = "none";
      searchInput.style.pointerEvents = "all";
      searchInput.focus();
      isSelection = true;
      noteType = e.target.textContent;
    }
  });
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchChange(e);
    e.target.value = "";
    isSelection = false;
    searchInput.style.pointerEvents = "none";
    searchInput.blur();
    emptyPageControl();
  }
});

function searchChange(e) {
  const isValid = control(e.target.value.trim());
  if (isValid) {
    const index = createIndex();
    let toAddNote = new addNote(e.target.value, noteType, index);
    createNote(toAddNote);
    notes.push(toAddNote);
    if (e.target.value !== "")
      localStorage.setItem("Notes", JSON.stringify(notes));
  } else {
    alert("This note already exist!");
  }
}

function createIndex() {
  let index;
  if (mainIndexArray.length > 0) {
    mainIndexArray.forEach((otherIndex) => {
      if (otherIndex === index) index = Math.floor(Math.random() * 99999);
    });
  } else index = Math.floor(Math.random() * 99999);
  return index;
}

function control(inputValue) {
  let isValid = true;

  if (notes != []) {
    notes.map((note) => {
      console.log(note.note + " " + inputValue);
      if (note.note === inputValue) isValid = false;
    });
  }

  console.log(isValid);
  return isValid;
}

function deleteNote(index) {
  notes = notes.filter((note) => {
    if (note.noteIndex !== index) {
      return note;
    }
  });
  localStorage.setItem("Notes", JSON.stringify(notes));
  HTML_note = "";
  if (notes.length > 0) notes.map((note) => createNote(note));
  else list.innerHTML = HTML_note;
  emptyPageControl();
}

// edit & save
list.addEventListener("click", (e) => {
  if (e.target.classList[0] === "editNote") {
    const editIcon = e.target;
    const noteSaveBtn =
      editIcon.parentElement.parentElement.children[0].children[1];
    const noteInput =
      editIcon.parentElement.parentElement.children[0].children[0];
    noteSaveBtn.style.display = "block";
    noteSaveBtn.style.opacity = "1";
    noteInput.parentElement.children[1].style.backgroundColor = "orangeRed";

    noteInput.style.backgroundColor = "#555";
    noteInput.style.pointerEvents = "all";
    beforeEditInput = noteInput.value.trim();
  }
  if (e.target.className === "note_save_btn") {
    const saveBtn = e.target;
    const noteInput = saveBtn.parentElement.children[0];
    updateNoteInput = noteInput.value.trim();
    noteInput.style.backgroundColor = "transparent";
    noteInput.style.pointerEvents = "none";

    saveBtn.style.opacity = "0";
    saveBtn.style.display = "none";
    saveBtn.textContent = "Close";

    if (noteInput.value.trim().length === 0) {
      noteInput.value = beforeEditInput;
    }
  }
});

list.addEventListener("keyup", (e) => {
  if (e.target.className === "note_input") {
    const noteInput = e.target;
    if (e.target.value.length > 0) {
      noteInput.parentElement.children[1].style.opacity = "1";
      noteInput.parentElement.children[1].style.pointerEvents = "all";
      noteInput.parentElement.children[1].textContent = "Save";
      noteInput.parentElement.children[1].style.backgroundColor =
        "rgb(0, 80, 141)";

      updateNoteInput = e.target.value.trim();
    }
  }
});

function saveNote(index) {
  // saveSTORAGE
  notes.forEach((note) => {
    if (note.noteIndex === index) {
      note.note = updateNoteInput;
    }
  });
  // notes[index].note = updateNoteInput;
  localStorage.setItem("Notes", JSON.stringify(notes));
}

function createNote(Note) {
  const __class = Note.type;
  HTML_note += `
  <div class="note ${__class}">
          <div class="noteBox1">
            <input type="text" value="${Note.note}" class="note_input" />
            <button onclick="saveNote(${Note.noteIndex})" class="note_save_btn">Close</button>
          </div>
          <div class="noteBox2 icons">
            <i class="editNote fa-solid fa-pen-to-square"></i>
            <i onclick="deleteNote(${Note.noteIndex})" class="fa-solid fa-delete-left"></i>
          </div>
    </div>`;

  list.innerHTML = HTML_note;
}

document.addEventListener("DOMContentLoaded", () => {
  notes =
    JSON.parse(localStorage.getItem("Notes")) !== null
      ? JSON.parse(localStorage.getItem("Notes"))
      : [];

  notes.map((note) => {
    createNote(note);
  });
  emptyPageControl();
});
