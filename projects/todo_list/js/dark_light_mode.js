// dark mode and light mode control
const modeBtn = document.querySelector(".modeBtn");
const html = document.querySelector("html");
let theme = "";
const modeIcon = document.querySelector(".modeBtn > i");
document.addEventListener("DOMContentLoaded", pageLoaded);

modeBtn.addEventListener("click", () => {
  changeModeIcon();
});

function changeModeIcon() {
  if (modeIcon.classList[1] === "fa-moon") {
    //change mode icon
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
    theme = "light";
    localStorage.setItem("Theme", JSON.stringify(theme));
    html.classList.add("light");
  } else {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
    theme = "";
    localStorage.setItem("Theme", JSON.stringify(theme));
    html.classList.remove("light");
  }
}

function pageLoaded() {
  const systemTheme = JSON.parse(localStorage.getItem("Theme"));
  if (systemTheme != "")
    html.classList.add(JSON.parse(localStorage.getItem("Theme")));
  if (systemTheme === "light") {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.remove("fa-moon");

    modeIcon.classList.add("fa-sun");
  } else {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.remove("fa-moon");

    modeIcon.classList.add("fa-moon");
  }
}
