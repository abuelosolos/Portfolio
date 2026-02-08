class ImageSlider {
    constructor(sliderIndex) {
        this.sliderIndex = sliderIndex;
        this.currentIndex = 0;
        this.track = document.querySelector(`.slider-track[data-slider="${sliderIndex}"]`);
        this.images = this.track.querySelectorAll('.slider-image-wrapper');
        this.totalImages = this.images.length;
        this.prevBtn = document.querySelector(`.prev-btn[data-slider="${sliderIndex}"]`);
        this.nextBtn = document.querySelector(`.next-btn[data-slider="${sliderIndex}"]`);
        this.counter = this.track.closest('.slider-container').querySelector('.slider-counter');
        this.dots = document.querySelectorAll(`.slider-dots[data-slider="${sliderIndex}"] .slider-dot`);
        
        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
        });

        // Click to open modal
        this.images.forEach((wrapper, index) => {
            wrapper.addEventListener('click', () => {
                openModal(this.sliderIndex, index);
            });
        });

        this.updateUI();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.updateUI();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.updateUI();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateUI();
    }

    updateUI() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        this.counter.querySelector('.current').textContent = this.currentIndex + 1;
        this.counter.querySelector('.total').textContent = this.totalImages;

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.totalImages - 1;
    }
}

// Initialize all sliders
const sliders = [];
for (let i = 0; i < 5; i++) {
    sliders.push(new ImageSlider(i));
}

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModalBtn = document.getElementById('closeModal');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalCounter = document.getElementById('modalCounter');

let currentModalSlider = 0;
let currentModalIndex = 0;

function openModal(sliderIndex, imageIndex) {
    currentModalSlider = sliderIndex;
    currentModalIndex = imageIndex;
    updateModalImage();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateModalImage() {
    const slider = sliders[currentModalSlider];
    const imageSrc = slider.images[currentModalIndex].querySelector('img').src;
    modalImage.src = imageSrc;
    modalCounter.textContent = `${currentModalIndex + 1} / ${slider.totalImages}`;
    
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.style.opacity = '1';
    }, 100);
}

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

modalPrev.addEventListener('click', () => {
    const slider = sliders[currentModalSlider];
    currentModalIndex = (currentModalIndex - 1 + slider.totalImages) % slider.totalImages;
    updateModalImage();
});

modalNext.addEventListener('click', () => {
    const slider = sliders[currentModalSlider];
    currentModalIndex = (currentModalIndex + 1) % slider.totalImages;
    updateModalImage();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            modalPrev.click();
        } else if (e.key === 'ArrowRight') {
            modalNext.click();
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
