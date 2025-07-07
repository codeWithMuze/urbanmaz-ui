 // Mobile menu toggle
 const menuToggle = document.getElementById('menu-toggle');
 const nav = document.getElementById('nav');

 menuToggle.addEventListener('click', function() {
     nav.classList.toggle('active');
 });

 // Close mobile menu when clicking on a link
 document.querySelectorAll('.nav-link').forEach(link => {
     link.addEventListener('click', function() {
         nav.classList.remove('active');
     });
 });

 // Close mobile menu when clicking outside
 document.addEventListener('click', function(e) {
     if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
         nav.classList.remove('active');
     }
 });

 // Form submission handling
 const contactForm = document.getElementById('contact-form');
 contactForm.addEventListener('submit', function(e) {
     e.preventDefault(); // Prevent default form submission

     // Get form values
     const name = contactForm.querySelector('input[name="name"]').value;
     const email = contactForm.querySelector('input[name="email"]').value;
     const subject = contactForm.querySelector('input[name="subject"]').value;
     const message = contactForm.querySelector('textarea[name="message"]').value;

     // Construct mailto link
     const mailtoLink = `mailto:maazmuhammed08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
         `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
     )}`;

     // Open the user's email client
     window.location.href = mailtoLink;

     // Optional: Reset form after submission
     contactForm.reset();
 });