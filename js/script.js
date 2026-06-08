// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="/"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Let the browser handle navigation for root links
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Update active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
  // Get the current file name from the URL (e.g., "projects.html")
  let currentPath = window.location.pathname.split('/').pop();
  
  // If the path is empty (meaning they are at the root of the repo), default to index.html
  if (currentPath === '') {
    currentPath = 'index.html';
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    
    // Get what the link is pointing to
    const linkHref = link.getAttribute('href');
    
    // If the current URL matches the link's href, make it active
    if (currentPath === linkHref) {
      link.classList.add('active');
    }
  });
});

function openProjectModal(card) {
  const modal = document.getElementById('projectModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalTags = document.getElementById('modalTags');
  const modalLinks = document.getElementById('modalLinks');

  const title = card.querySelector('.project-title').textContent;
  const image = card.querySelector('.project-image img');
  const description = card.querySelector('.project-description').textContent;
  const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);
  const links = Array.from(card.querySelectorAll('.project-link'));

  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modalTitle.textContent = title;
  modalDescription.textContent = description;

  modalTags.innerHTML = '';
  tags.forEach(tagText => {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tagText;
    modalTags.appendChild(tagElement);
  });

  modalLinks.innerHTML = '';
  links.forEach(link => {
    const clonedLink = link.cloneNode(true);
    clonedLink.classList.add('modal-link');
    modalLinks.appendChild(clonedLink);
  });

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('click', function(event) {
    if (event.target.closest('a')) {
      return;
    }
    openProjectModal(card);
  });
});

const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');
modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', closeProjectModal);
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

// Image viewer navigation
const imageViewers = document.querySelectorAll('.multi-image-viewer');
imageViewers.forEach(viewer => {
  const leftBtn = viewer.querySelector('.left-btn');
  const rightBtn = viewer.querySelector('.right-btn');
  const images = viewer.querySelectorAll('.viewer-image');
  let currentIndex = 0;

  function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
    // Play/pause videos when they become active/inactive
    images.forEach(el => {
      if (el.tagName && el.tagName.toLowerCase() === 'video') {
        if (el.classList.contains('active')) {
          // attempt to play; ignore promise rejection
          el.play().catch(() => {});
        } else {
          try {
            el.pause();
            el.currentTime = 0;
          } catch (e) {}
        }
      }
    });
  }

  leftBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  rightBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });
});


