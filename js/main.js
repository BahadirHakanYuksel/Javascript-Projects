let projects = "";
const data = [];

const projectsDiv = document.getElementById("projects");

const createProject = async () => {
  await fetch("../db.json")
    .then((response) => response.json())
    .then((result) => {
      data.push(...result.projects);
    });

  data.map((project, index) => {
    projects += `
    <div class="project">
        <span class="indexNo">${index + 1}</span>
        <div style="background-image: url(${
          project.img_url
        });" class="img_div"></div>
        <div class="text_div">
          <header class="title">${project.title}</header>
          <p class="description">${project.description}</p>
        </div>
        <button class="goBtn">
          <a href="${project.link}">Projeye Git</a>
        </button>
      </div>`;
  });
  projectsDiv.innerHTML = projects;
};

document.addEventListener("DOMContentLoaded", () => {
  createProject();
});
