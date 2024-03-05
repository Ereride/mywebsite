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
            el.classList.add(`gallery-item-${i + 1}`);
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

const apiKey = "<%= process.env.API_KEY %>"
const documentId = '1XgKMmJLKHzUeC-vpI__poWJLlg8dmJGr4kt6ws5TbcY';

// Funktio hakee tiedot Google Sheetsistä ja lisää ne HTML-sivulle
// Update the function to accept range parameter
function getSheetData(range) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/1XgKMmJLKHzUeC-vpI__poWJLlg8dmJGr4kt6ws5TbcY/values/${range}?key=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const asideContainer = document.querySelector('aside#virkkaus');

        // Clear the container before adding new data
        asideContainer.innerHTML = '';

        // Assuming your data contains only one row
        const row = data.values[0];

        // Format time string "H:Min:Sec" from the data in A1, A2, and A3
        const timeString = `${row[0]}`;

        // Create a new <div> for the data
        const dataDiv = document.createElement('div');

        const titleParagraph = document.createElement('h2');
        titleParagraph.textContent = 'Virkkausaika';
        dataDiv.appendChild(titleParagraph);

        // Create a <p> element for the time string and append it to the data <div>
        const timeParagraph = document.createElement('p');
        timeParagraph.textContent = timeString;
        dataDiv.appendChild(timeParagraph); 

        const timetextParagraph = document.createElement('h3');
        timetextParagraph.textContent = 'H:MIN:S';
        dataDiv.appendChild(timetextParagraph);
        
        // Append the data <div> to the <aside> container
        asideContainer.appendChild(dataDiv);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Call the function with the specified range
getSheetData('Kokonaisaika!A2'); // Update range as needed

