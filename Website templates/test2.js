window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

const isCollapsed = []; // Dynamic array to track the collapse state

const heightindex = [ 45.197 , 147.745 , 52.2 , 55.598 ,47.209, 51.553]

const containers = document.querySelectorAll('.container'); // Select all containers
const images = document.querySelectorAll('.image1, .image2, .image3, .image4, .image5, .image6'); // Select all images
const masks = document.querySelectorAll('.mask'); // Select all masks
const offset = 1500; // Offset to move the mask away from the border

// Initialize the collapse state array
containers.forEach((container, index) => {
    isCollapsed[index] = true;
});

function toggleCollapse(index) {
    const collapsibleContainer = document.getElementById(`collapsibleContainer${index}`);
    if (collapsibleContainer) {
        if (isCollapsed[index]) {
            collapsibleContainer.style.height = `${heightindex[index]}vw`; // Allow the height to grow
        } else {
            collapsibleContainer.style.height = '0px'; // Collapse
        }
        isCollapsed[index] = !isCollapsed[index];
    } else {
        console.error(`Collapsible container with ID collapsibleContainer${index} not found`);
    }
}

containers.forEach((container, index) => {
    const image = images[index];
    const mask = masks[index];
    const button = container.querySelector('.button');
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
        mask.style.width = '6000px'; // Adjust size as needed
        mask.style.height = '6000px'; // Adjust size as needed

        image.style.transform = 'scale(0.78)';

        button.classList.add('button-animate');
        setTimeout(() => {
            button.classList.add('visible');
        }, 0); // Add visible class in the next tick
    });

    container.addEventListener('mouseleave', () => {
        mask.style.width = '0';
        mask.style.height = '0';
        image.style.transform = 'scale(1.3)';
        button.classList.remove('visible');
        setTimeout(() => {
            button.classList.remove('button-animate');
        }, 600); // Remove button-animate class after the transition
    });

    container.addEventListener('click', () => {
        toggleCollapse(index);
    });
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
    }, { threshold: 0.7 }); // Adjust threshold as needed

    elements.forEach(element => {
        observer.observe(element);
    });
});
