const searchInput = document.getElementById("search");
const list = document.querySelector(".list");
const allDeleteBtn = document.querySelector(".allDeleteBtn");
let note = "";
let notes = [];
let updateNoteInput = "";
let beforeEditInput = "";

allDeleteBtn.addEventListener("click", allDeleteNotes);

function allDeleteNotes() {
  notes = [];
  note = "";
  localStorage.setItem("Notes", JSON.stringify(notes));
  list.innerHTML = note;
}

searchInput.addEventListener("change", (e) => {
  searchChange(e);
  e.target.value = "";
});

function searchChange(e) {
  const isValid = control(e.target.value.trim());
  if (isValid) {
    const index = notes !== undefined ? notes.length : 0;
    createNote(e.target.value, index);
    notes.push(e.target.value);
    if (e.target.value !== "")
      localStorage.setItem("Notes", JSON.stringify(notes));
  } else {
    alert("This note already exist!");
  }
}

function control(inputValue) {
  let isValid = false;

  if (notes.length > 0) {
    notes.map((note) => {
      if (note !== inputValue) isValid = true;
      else isValid = false;
    });
  } else isValid = true;

  return isValid;
}

function deleteNote(index) {
  notes = notes.filter((note, i) => {
    if (i !== index) {
      return note;
    }
  });
  localStorage.setItem("Notes", JSON.stringify(notes));
  note = "";
  if (notes.length > 0) notes.map((note, i) => createNote(note, i));
  else list.innerHTML = note;
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
  notes[index] = updateNoteInput;
  localStorage.setItem("Notes", JSON.stringify(notes));
}

function createNote(text, index) {
  note += `
  <div class="note">
          <div class="noteBox1">
            <input type="text" value="${text}" class="note_input" />
            <button onclick="saveNote(${index})" class="note_save_btn">Close</button>
          </div>
          <div class="noteBox2 icons">
            <i class="editNote fa-solid fa-pen-to-square"></i>
            <i onclick="deleteNote(${index})" class="fa-solid fa-delete-left"></i>
          </div>
    </div>`;

  list.innerHTML = note;
}

document.addEventListener("DOMContentLoaded", () => {
  notes =
    JSON.parse(localStorage.getItem("Notes")) !== null
      ? JSON.parse(localStorage.getItem("Notes"))
      : [];

  notes.map((note, index) => {
    createNote(note, index);
  });
});
