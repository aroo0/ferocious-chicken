// Get the SVG element and the hero element
const svgElement = document.querySelector('.responsive-svg');
const heroElement = document.querySelector('.hero');



// Update the height of the hero element based on the SVG's current height
function updateHeroHeight() {
  const svgHeight = svgElement.getBoundingClientRect().height;
  heroElement.style.height = `calc(100vh + ${svgHeight}px)`;
}

// Call the updateHeroHeight function initially and on window resize
updateHeroHeight();
window.addEventListener('resize', updateHeroHeight);