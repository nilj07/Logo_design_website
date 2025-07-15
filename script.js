// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Admin panel functionality
// Admin panel functionality
const addLogoForm = document.getElementById('addLogoForm');
const galleryGrid = document.getElementById('galleryGrid');
const galleryIframe = document.getElementById('galleryIframe');

// Load saved logos from localStorage
function loadLogos() {
    const savedLogos = JSON.parse(localStorage.getItem('logos')) || [];
    savedLogos.forEach(logo => {
        addLogoToGallery(logo.title, logo.image, logo.category);
    });
}

function addLogoToGallery(title, image, category) {
    const newItem = document.createElement('div');
    newItem.classList.add('gallery-item', 'bg-gray-800', 'rounded-lg', 'overflow-hidden', 'relative');
    newItem.innerHTML = `
        <img src="${image}" alt="${title}" class="w-full h-48 object-cover">
        <div class="p-4">
            <h3 class="text-xl font-bold">${title}</h3>
            <p class="text-gray-400">${category}</p>
            <button class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
        </div>
    `;
    newItem.querySelector('.delete-btn').onclick = function() {
        removeLogo(title);
        newItem.remove();
    };
    galleryGrid.appendChild(newItem);
}

function saveLogo(title, image, category) {
    const logos = JSON.parse(localStorage.getItem('logos')) || [];
    logos.push({ title, image, category });
    localStorage.setItem('logos', JSON.stringify(logos));
}

function removeLogo(title) {
    let logos = JSON.parse(localStorage.getItem('logos')) || [];
    logos = logos.filter(logo => logo.title !== title);
    localStorage.setItem('logos', JSON.stringify(logos));
}

if (addLogoForm) {
    addLogoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const logoTitle = this.logoTitle.value.trim();
        const logoImage = this.logoImage.value.trim();
        const logoCategory = this.logoCategory.value;

        // Create a new gallery item
         // Save and display the new logo
        saveLogo(logoTitle, logoImage, logoCategory);
        addLogoToGallery(logoTitle, logoImage, logoCategory);
        
        // Sync with gallery.html
        const logoData = JSON.stringify({
            title: logoTitle,
            image: logoImage,
            category: logoCategory
        });
        document.getElementById('logoData').value = logoData;
        document.getElementById('syncForm').submit();
        
        // Reset the form
        this.reset();
    });
}

// Add event listener to delete buttons
galleryGrid.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentNode.remove();
    }
});

document.addEventListener('DOMContentLoaded', loadLogos);
