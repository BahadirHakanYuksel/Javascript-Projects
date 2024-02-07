const noteTypes = document.querySelectorAll(".noteType");

noteTypes.forEach((noteType) => {
  noteType.addEventListener("click", () => {
    const listTitle = document.querySelector(".listTitle");
    listTitle.textContent = noteType.textContent;
    const Color =
      noteType.classList[2] !== "purple"
        ? noteType.classList[2]
        : "rgb(120, 4, 245)";
    listTitle.style.borderBottom = `1px solid ${Color}`;

    const Notes = JSON.parse(localStorage.getItem("Notes"));
    let filteredNotes = [];
    filteredNotes = Notes.filter((note) => {
      if (note.type === noteType.textContent) {
        return note;
      }
    });
    HTML_note = "";
    console.log(filteredNotes);
    if (filteredNotes.length > 0) {
      filteredNotes.forEach((__note) => {
        createNote(__note);
      });
    } else {
      HTML_note = "";
      document.querySelector(".list").innerHTML = HTML_note;
    }
    if (noteType.textContent === "All Notes") {
      Notes.forEach((__note) => {
        createNote(__note);
      });
    }
  });
});
