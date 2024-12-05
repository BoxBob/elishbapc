window.addEventListener("scroll",function(){
  var header = document.querySelector("header");
  header.classList.toggle("sticky",window.scrollY > 0);
})

let isCollapsed = true;

const button = document.getElementById('button');
const collapsibleContainer = document.getElementById('collapsibleContainer');
const container = document.getElementById('hoverContainer');
const image = document.getElementById('hoverImage');
const mask = document.getElementById('mask');
const offset = 1500; // Offset to move the mask away from the border

function toggleCollapse() {
  if (isCollapsed) {
    container.style.height = '80vh'; // Height of the container plus some margin
  } else {
    container.style.height = '60vh';
  }
  isCollapsed = !isCollapsed;
}

container.addEventListener('mouseenter', (e) => {

  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  if (x < 0) x -= offset; // Left border
  else if (x > rect.width) x += offset; // Right border

  if (y < 0) y -= offset; // Top border
  else if (y > rect.height) y += offset; // Bottom border

  mask.style.left = `${x}px`;
  mask.style.top = `${y}px`;
  mask.style.transform = `translate(-50%, -50%)`; // Center the mask at the point of entry
  mask.style.width = '6000px';  // Adjust size as needed
  mask.style.height = '6000px'; // Adjust size as needed

  image.style.transform = 'scale(0.8)';

  button.style.color = 'black'; 

});

container.addEventListener('mouseleave', () => {
  mask.style.width = '0';
  mask.style.height = '0';
  image.style.transform = 'scale(1.3)'
  button.style.color = 'white'; 
});


document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Stop observing once it's visible
          }
      });
  }, { threshold: 0.6 }); // Adjust threshold as needed

  elements.forEach(element => {
      observer.observe(element);
  });
});


container.addEventListener('click', () => {
  toggleCollapse()
});