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
  });
});
