const imagesData = [
    "https://cdn.pixabay.com/photo/2024/06/29/10/13/girl-8861154_1280.png",
    "https://cdn.pixabay.com/photo/2023/10/24/02/49/bike-8337261_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/05/20/15/17/flower-8775511_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/03/19/05/31/flower-7861942_1280.jpg"
];


const frame = document.querySelector(".frame");
const dotsContainer = document.querySelector(".dotsContainer");

const initializeImages = () => {
    const imagesSlider = document.createElement("div");
    imagesSlider.classList.add("imagesSlider");
    frame.appendChild(imagesSlider);

    const createImgElement = (imageSrc) =>{
        const img = document.createElement('img');
        img.src = imageSrc;
        img.loading = 'lazy';
        img.classList.add("slideImage");
        imagesSlider.appendChild(img);
    }

    const createDotsElement = () => {
        const dotsButton = document.createElement("button");
        dotsButton.classList.add("dot");
        dotsContainer.appendChild(dotsButton);
    }

    imagesData.forEach((imageSrc) => {
        createImgElement(imageSrc);
        createDotsElement();
    })
}

initializeImages();



const arrowNext = document.querySelector(".arrowNext");
const arrowPrevious = document.querySelector(".arrowPrevious");
const imagesSlider = document.querySelector(".imagesSlider");
const dots = Array.from(dotsContainer.children);

let imageCounter = 0;

arrowNext.addEventListener("click" , () =>{
    imageCounter++;
    if(imageCounter === imagesData.length){
        imageCounter = 0;
    }
    sliderPosition(imageCounter);
});

arrowPrevious.addEventListener("click" , () =>{
    if(imageCounter === 0){
        imageCounter = imagesData.length;
    }
    imageCounter--;
    sliderPosition(imageCounter);
});

const sliderPosition = (activeImageCounter) => {
    const frameWidth = frame.clientWidth;
    imagesSlider.style.transform = `translateX(-${frameWidth * activeImageCounter}px)`;
    updateActiveDot(activeImageCounter);
    imageCounter = activeImageCounter;
};

const updateActiveDot = (index) =>{
    dots.forEach((dot, i) => dot.classList.toggle("active" , i === index));
}

dotsContainer.addEventListener("click", (e) =>{
    const target = e.target;

    if(target.classList.contains("dot")){
        const getIndex = dots.indexOf(target);
        sliderPosition(getIndex);
    }
})

updateActiveDot(imageCounter);


let autoSlideInterval;

const startAutoSlide = () => {

    autoSlideInterval = setInterval(()=>{
        imageCounter++;
        if(imageCounter === imagesData.length){
            imageCounter = 0;
        }
        sliderPosition(imageCounter);
    }, 6000); 
}

const stopAutoSlide = () =>{
    clearInterval(autoSlideInterval);
}

startAutoSlide();

frame.addEventListener("mouseenter", stopAutoSlide);
frame.addEventListener("mouseleave", startAutoSlide);

window.addEventListener('resize', () => {
    sliderPosition(imageCounter);
});