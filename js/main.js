// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Mobile mega menu toggle
    const menuItems = navMenu.querySelectorAll(':scope > li');
    menuItems.forEach(function(item) {
      const link = item.querySelector(':scope > a');
      const mega = item.querySelector('.mega-menu');
      if (link && mega) {
        link.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('active');
            // Close other menus
            menuItems.forEach(function(other) {
              if (other !== item) other.classList.remove('active');
            });
          }
        });
      }
    });
  }

  // Accordion
  document.querySelectorAll('.accordion-header').forEach(function(header) {
    header.addEventListener('click', function() {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });

  // Contact form - AJAX submission with modal popup
  var contactForm = document.getElementById('contact-form');
  var errorDiv = document.getElementById('form-error');
  var modal = document.getElementById('thank-you-modal');
  var modalCloseBtn = document.getElementById('modal-close-btn');

  if (contactForm) {
    // Handle URL params (fallback for non-JS)
    var params = new URLSearchParams(window.location.search);
    var urlStatus = params.get('status');
    if (urlStatus === 'success' && modal) {
      modal.classList.add('active');
    } else if (urlStatus === 'error' && errorDiv) {
      var msg = params.get('msg');
      var text = 'Une erreur est survenue. Veuillez réessayer.';
      if (msg === 'champs') text = 'Veuillez remplir tous les champs obligatoires.';
      if (msg === 'email') text = 'Adresse email invalide.';
      errorDiv.innerHTML = '<div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> ' + text + '</div>';
    }

    // AJAX submit
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = document.getElementById('submit-btn');
      var originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
      btn.disabled = true;
      if (errorDiv) errorDiv.innerHTML = '';

      var formData = new FormData(contactForm);

      fetch('/contact.php', {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: formData
      })
      .then(function(response) { return response.json(); })
      .then(function(data) {
        btn.innerHTML = originalText;
        btn.disabled = false;
        if (data.success) {
          contactForm.reset();
          if (modal) modal.classList.add('active');
        } else {
          if (errorDiv) {
            errorDiv.innerHTML = '<div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> ' + (data.error || 'Erreur lors de l\'envoi.') + '</div>';
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      })
      .catch(function() {
        btn.innerHTML = originalText;
        btn.disabled = false;
        if (errorDiv) {
          errorDiv.innerHTML = '<div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> Erreur de connexion. Appelez-nous au <a href="tel:0688803229">06 88 80 32 29</a>.</div>';
          errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    // Close modal
    if (modalCloseBtn && modal) {
      modalCloseBtn.addEventListener('click', function() {
        modal.classList.remove('active');
      });
    }
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
  }


  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
