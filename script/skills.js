const programmingLanguages = [
  "HTML",
  "JavaScript",
  "CSS",
  "Python",
  "PostCSS",
  "Git",
  "GitHub",
];

const webFrameworks = ["Node", "React", "Redux", "Vite", "Astro"];
const designTools = ["Figma", "Photoshop"];

const allItems = [...programmingLanguages, ...webFrameworks, ...designTools];
const skillsContainer = document.querySelector(".skills-container");


// Function to generate pastel colors
function generatePastelColor() {
    return "hsl(" + 360 * Math.random() + ',' +
    (67 * Math.random()) + '%,' + 
    (68 + 10 * Math.random()) + '%)'
  }

function addSkills() {
  allItems.forEach((item) => {
    let currentItemDiv = document.createElement("div");
    const divContent = document.createTextNode(`${item}`);
    currentItemDiv.appendChild(divContent);
    currentItemDiv.classList.add("skill");
    currentItemDiv.style.backgroundColor = generatePastelColor()


    skillsContainer.appendChild(currentItemDiv);
  });
}

addSkills()