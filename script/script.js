// Get the SVG element and the hero element
const svgElement = document.querySelector('.responsive-svg');
const heroElement = document.querySelector('.hero');
const yearContainer = document.querySelector('#year-container')

// Update the height of the hero element based on the SVG's current height
function updateHeroHeight() {
  const svgHeight = svgElement.getBoundingClientRect().height;
  heroElement.style.height = `calc(100vh + ${svgHeight}px)`;
}

// Call the updateHeroHeight function initially and on window resize
updateHeroHeight();
window.addEventListener('resize', updateHeroHeight);


// Insert current year into footer

function generateYear() {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  yearContainer.textContent = year

}
generateYear()

// Navlink menu active class on scroll

const sectionElements = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link")



// Debounce function to limit the frequency of event handler invocation
const debounce = (func, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
};

const handleScroll = () => {
  let currentSection = 'home'

  sectionElements.forEach(sectionElement => {
    if (window.scrollY >= (sectionElement.offsetTop - (sectionElement.clientHeight / 10) )) {
      currentSection = sectionElement.id
    }
  })

  navLinks.forEach(navLinkElement => {
    if (navLinkElement.href.includes(currentSection)) {
      document.querySelector('.active')?.classList.remove('active')
      navLinkElement.classList.add('active')
    }
  })
}


// Add event listener with debounced event handler
window.addEventListener('scroll', debounce(handleScroll, 100)); // Adjust delay as needed




//  Hamburger navigation 

const hamburgerMenu = document.querySelector('.hamburger-menu') 
const mainNav = document.querySelector('.main-nav') 
const socialNav = document.querySelector('.social-nav')
const links = document.querySelector('.nav-links')

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('is-open')
  mainNav.classList.toggle('is-open')
  socialNav.classList.toggle('is-open')





})


navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburgerMenu.classList.remove('is-open')
    mainNav.classList.remove('is-open');
    socialNav.classList.remove('is-open')
  })
})


// Scroll-Activated Sticky Navigation

const body = document.body

let lastScroll = 0 
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY


  if (currentScroll <= 0) {
    body.classList.remove('scroll-up')
  }

  if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
    body.classList.remove('scroll-up')
    body.classList.add('scroll-down')

  }

  if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
    body.classList.remove('scroll-down')
    body.classList.add('scroll-up')

  }
  
  
  
  lastScroll = currentScroll


})