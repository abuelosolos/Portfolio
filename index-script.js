// Portfolio project images - add your actual design images here
const portfolioImages = {
    0: [ // AI Powered Game Engine
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1563207153-f403bf289096?w=1200&h=800&fit=crop'
    ],
    1: [ // Game Asset Store
        'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop'
    ],
    2: [ // DeFi App
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop'
    ],
    3: [ // Shoe Store Site
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&h=800&fit=crop'
    ],
    4: [ // Design System
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop'
    ],
    5: [ // SaaS Platform UI
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop'
    ]
};

let currentProject = 0;
let currentImageIndex = 0;

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

// Intersection Observer for portfolio items
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, entry.target.dataset.index * 150);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-item').forEach(item => {
    observer.observe(item);
});

// Mobile tap handling for view UI buttons
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach((item) => {
    // Mobile touch handling - show/hide view button
    item.addEventListener('touchstart', function(e) {
        // Don't interfere if clicking the view button itself
        if (e.target.closest('.view-ui-btn')) {
            return;
        }
        
        // Remove active class from all other items
        portfolioItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle active class on current item
        this.classList.toggle('active');
        e.stopPropagation();
    });
});

// Close active portfolio items when tapping outside on mobile
document.addEventListener('touchstart', function(e) {
    if (!e.target.closest('.portfolio-item')) {
        portfolioItems.forEach(item => item.classList.remove('active'));
    }
});

// Modal carousel functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');
const carouselCounter = document.getElementById('carouselCounter');

console.log('Modal elements:', { modal, modalImg, closeModal, prevImage, nextImage, carouselCounter });

function updateCarousel() {
    const images = portfolioImages[currentProject];
    console.log('Updating carousel:', currentProject, currentImageIndex, images);
    modalImg.src = images[currentImageIndex];
    carouselCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    
    // Animate image change
    modalImg.style.opacity = '0';
    setTimeout(() => {
        modalImg.style.opacity = '1';
    }, 100);
}


// Add click handlers to portfolio items for image carousel modal
const portfolioItemsForModal = document.querySelectorAll('.portfolio-item');
console.log('Found portfolio items:', portfolioItemsForModal.length);

portfolioItemsForModal.forEach((item) => {
    const projectIndex = item.getAttribute('data-index');
    console.log('Adding click handler to item with index:', projectIndex);
    
    item.addEventListener('click', function(event) {
        // Don't open modal if clicking the view UI button
        if (event.target.closest('.view-ui-btn')) {
            return;
        }
        
        event.preventDefault();
        event.stopPropagation();
        
        console.log('Portfolio item clicked! Index:', projectIndex);
        currentProject = parseInt(projectIndex);
        currentImageIndex = 0;
        
        console.log('Opening modal for project:', currentProject);
        console.log('Modal element:', modal);
        
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
            updateCarousel();
            document.body.style.overflow = 'hidden';
        } else {
            console.error('Modal element not found!');
        }
    }, true); // Use capture phase
});

prevImage.addEventListener('click', function(e) {
    e.stopPropagation();
    const images = portfolioImages[currentProject];
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateCarousel();
});

nextImage.addEventListener('click', function(e) {
    e.stopPropagation();
    const images = portfolioImages[currentProject];
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateCarousel();
});

closeModal.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            const images = portfolioImages[currentProject];
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateCarousel();
        } else if (e.key === 'ArrowRight') {
            const images = portfolioImages[currentProject];
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateCarousel();
        }
    }
});

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
