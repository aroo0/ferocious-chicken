// Get the SVG element and the hero element
const svgElement = document.querySelector('.responsive-svg');
const heroElement = document.querySelector('.hero');
const yearContainer = document.querySelector('#year-container')

// Update the height of the hero element based on the SVG's current height
function updateHeroHeight() {
  const svgHeight = svgElement.getBoundingClientRect().height;
  heroElement.style.minHeight = `calc(100vh + ${svgHeight}px)`;
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

// Actived class menu on scroll

const sectionElements = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const handleActiveOnScroll = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentSection = entry.target.id;
      navLinks.forEach(navLinkElement => {
        if (navLinkElement.href.includes(currentSection)) {
          document.querySelector(".active")?.classList.remove("active");
          navLinkElement.classList.add("active");
        }
      });
    }
  });
};

const observerOne = new IntersectionObserver(handleActiveOnScroll, {
  rootMargin: "-30% 0px -70% 0px"
});

sectionElements.forEach(sectionElement => {
  observerOne.observe(sectionElement);
});




//  Hamburger navigation 

const hamburgerMenu = document.querySelector('.hamburger-menu') 
const mainNav = document.querySelector('.main-nav') 
const socialNav = document.querySelector('.social-nav')
const links = document.querySelector('.nav-links')
const body = document.body;


hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('is-open')
  mainNav.classList.toggle('is-open')
  socialNav.classList.toggle('is-open')
  body.classList.toggle('overflow')
})


navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburgerMenu.classList.remove('is-open')
    mainNav.classList.remove('is-open');
    socialNav.classList.remove('is-open')
    body.classList.remove('overflow')
  })
})



//  Intersection Observer aka Scroll Aniamtion 

const animatedScrollElements = document.querySelectorAll('.scroll-animated')

const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting)
    if (entry.isIntersecting) scrollObserver.unobserve(entry.target)
  }, {
    threshold: .7,
  })
})


animatedScrollElements.forEach(el => {
  scrollObserver.observe(el)

})

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  elements.forEach((element) => {
    element.classList.remove("scroll-animated");
  });
}
