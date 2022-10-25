const slides = Array.from(document.querySelector(".slider").children);
const backArrow = document.querySelector(".arrow-back");
const forwardArrow = document.querySelector(".arrow-forward");
const dots = Array.from(document.querySelector(".dots").children);
let slideShow;
let isPlaying;

const previousImage = () => {
  clearInterval(slideShow);
  slideShow = null;
  isPlaying = false;
  slides.map((slide, i) => {
    if (slides[0].classList.contains("show-img")) {
      dots[0].classList.remove("solid");
      slide.classList.remove("show-img");
      slide.classList.add("hide-img");
      slides[slides.length - 1].classList.remove("hide-img");
      slides[slides.length - 1].classList.add("show-img");
      Array.from(dots[dots.length - 1].classList.add("solid"));
    } else if (slide.classList.contains("show-img")) {
      dots[i].classList.remove("solid");
      slides[i].classList.remove("show-img");
      slides[i].classList.add("hide-img");
      slides[i - 1].classList.remove("hide-img");
      dots[i - 1].classList.add("solid");
      Array.from(slides[i - 1].classList.add("show-img"));
    }
  });
};

const nextImage = () => {
  clearInterval(slideShow);
  slideShow = null;
  isPlaying = false;
  slides.map((slide, i) => {
    if (slides[slides.length - 1].classList.contains("show-img")) {
      dots[dots.length - 1].classList.remove("solid");
      dots[0].classList.add("solid");
      slides[slides.length - 1].classList.remove("show-img");
      slides[slides.length - 1].classList.add("hide-img");
      slide.classList.remove("hide-img");
      slide.classList.add("show-img");
    } else if (slide.classList.contains("show-img")) {
      dots[i].classList.remove("solid");
      dots[i + 1].classList.add("solid");
      slide.classList.remove("show-img");
      slide.classList.add("hide-img");
      slides[i + 1].classList.remove("hide-img");
      Array.from(slides[i + 1].classList.add("show-img"));
    }
  });
};

const dotClicked = (index) => {
  if (isPlaying) {
    clearTimeout(slideShow);
    isPlaying = false;
  }
  const otherDots = dots.filter((dot) => dot != dots[index]);
  const otherSlides = slides.filter((slide) => slide != slides[index]);

  // console.log(otherDots, otherSlides);
  otherDots.forEach((dot) => {
    dot.classList.remove("solid");
  });

  otherSlides.forEach((slide) => {
    if (slide.classList.contains("show-img")) {
      slide.classList.remove("show-img");
      slide.classList.add("hide-img");
    }
  });
  dots[index].classList.add("solid");
  slides[index].classList.remove("hide-img");
  slides[index].classList.add("show-img");
};

const setUpDots = () => {
  dots.map((dot, i) => {
    dot.addEventListener("click", () => {
      dotClicked(i);
    });
  });
};

const playSlides = () => {
  if (!slideShow) {
    slideShow = setInterval(() => {
      slides.map((slide, i) => {
        if (slides[slides.length - 1].classList.contains("show-img")) {
          dots[dots.length - 1].classList.remove("solid");
          dots[0].classList.add("solid");
          slides[slides.length - 1].classList.remove("show-img");
          slides[slides.length - 1].classList.add("hide-img");
          slides[0].classList.remove("hide-img");
          Array.from(slides[0].classList.add("show-img"));
        } else if (slide.classList.contains("show-img")) {
          dots[i].classList.remove("solid");
          dots[i + 1].classList.add("solid");
          slide.classList.remove("show-img");
          slide.classList.add("hide-img");
          slides[i + 1].classList.remove("hide-img");
          Array.from(slides[i + 1].classList.add("show-img"));
        }
      });
    }, "2000");
    isPlaying = true;
  }
};

playSlides();
setUpDots();
