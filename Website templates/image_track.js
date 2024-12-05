const track = document.getElementById("image-track");

const valueIndex = [ 60 , 72 , 84 , 96 , 108 , 120 , 132 ,144];

// Initialize dataset values
track.dataset.mouseDownAt = "0";
track.dataset.percentage = "0";
track.dataset.prevPercentage = "0";

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for (const [index, image] of Array.from(track.getElementsByClassName("image")).entries()) {
    image.animate({
      objectPosition: `${valueIndex[index] +  nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}



const handleOnScroll = e => {
  const scrollDelta = e.deltaX,
        maxDelta = window.innerWidth;
  
  // Increase the speed by adjusting the scaling factor (e.g., from -10 to -30)
  const speedFactor = -70;
  const percentage = (scrollDelta / maxDelta) * speedFactor,
        nextPercentageUnconstrained = parseFloat(track.dataset.percentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });

  

for (const [index, image] of Array.from(track.getElementsByClassName("image")).entries()) {
  image.animate({
    objectPosition: `${valueIndex[index] + nextPercentage}% center`
  }, { duration: 1200, fill: "forwards" });
}

}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

/* -- Added scroll event listener -- */
window.onwheel = e => handleOnScroll(e);

var i = 0;
var txt = 'Lorem ipsum typing effect!'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}