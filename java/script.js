const galleryContainer = document.querySelector('.gallery-container');
const gallerControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
        this.intervalId = null;
        this.rotationInterval = 3000; // Adjust this value to change the rotation interval in milliseconds
    }

    startRotation() {
        this.intervalId = setInterval(() => {
            this.rotateGallery();
        }, this.rotationInterval);
    }

    stopRotation() {
        clearInterval(this.intervalId);
    }

    rotateGallery() {
        const lastItem = this.carouselArray.pop();
        this.carouselArray.unshift(lastItem);
        this.updateGallery();
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
            el.classList.remove('gallery-item-6');
            el.classList.remove('gallery-item-7');
            el.classList.remove('gallery-item-8');
            el.classList.remove('gallery-item-9');
            el.classList.remove('gallery-item-10');
            el.classList.remove('gallery-item-11');
            el.classList.remove('gallery-item-12');
        });
        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
    }


    useControls() {
        const triggers = [...gallerControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }

    addHoverListeners() {
        this.carouselContainer.addEventListener('mouseenter', () => {
            this.stopRotation();
        });

        this.carouselContainer.addEventListener('mouseleave', () => {
            this.startRotation();
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.startRotation(); // Start automatic rotation
exampleCarousel.addHoverListeners(); // Add hover listeners to stop and start rotation


function myFunction() {
    var x = document.getElementById("myNav");
    if (x.className === "navigointi") {
      x.className += " responsive";
    } else {
      x.className = "navigointi";
    }
  }