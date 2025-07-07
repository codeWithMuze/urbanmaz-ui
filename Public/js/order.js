 // Cart object to store items
 let cart = [];

 // Initialize the page
 document.addEventListener('DOMContentLoaded', () => {
     // Mobile menu toggle
     const menuToggle = document.getElementById('menu-toggle');
     const nav = document.getElementById('nav');
     
     menuToggle.addEventListener('click', () => {
         nav.classList.toggle('active');
         menuToggle.classList.toggle('active');
     });
 
     // Initialize cart from localStorage if available
     if (localStorage.getItem('cart')) {
         cart = JSON.parse(localStorage.getItem('cart'));
         updateCartDisplay();
     }
 });
 
 // Filter menu items by category
 function filterCategory(category) {
     const sections = document.querySelectorAll('.menu-section');
     const buttons = document.querySelectorAll('.category-btn');
 
     sections.forEach(section => {
         if (category === 'all' || section.dataset.category === category) {
             section.classList.remove('hidden');
         } else {
             section.classList.add('hidden');
         }
     });
 
     buttons.forEach(btn => {
         btn.classList.remove('active');
         if (btn.getAttribute('onclick') === `filterCategory('${category}')`) {
             btn.classList.add('active');
         }
     });
 }
 
 // Change quantity of menu items
 function changeQuantity(button, change) {
     const quantityElement = button.parentElement.querySelector('.quantity');
     let quantity = parseInt(quantityElement.textContent);
     quantity = Math.max(0, quantity + change);
     quantityElement.textContent = quantity;
 
     // Update cart
     const menuItem = button.closest('.menu-item');
     const itemName = menuItem.querySelector('h3').textContent;
     const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
 
     updateCart(itemName, quantity, itemPrice);
 }
 
 // Update cart array and display
 function updateCart(itemName, quantity, price) {
     // Remove item if quantity is 0
     if (quantity === 0) {
         cart = cart.filter(item => item.name !== itemName);
     } else {
         // Check if item exists in cart
         const existingItem = cart.find(item => item.name === itemName);
         if (existingItem) {
             existingItem.quantity = quantity;
         } else {
             cart.push({ name: itemName, quantity, price });
         }
     }
 
     // Save to localStorage
     localStorage.setItem('cart', JSON.stringify(cart));
     updateCartDisplay();
 }
 
 // Update cart summary display
 function updateCartDisplay() {
     const cartItemsContainer = document.getElementById('cart-items');
     const cartTotalElement = document.getElementById('cart-total');
     
     if (cart.length === 0) {
         cartItemsContainer.innerHTML = '<p style="text-align: center; opacity: 0.7;">No items in cart</p>';
         cartTotalElement.textContent = 'Total: $0.00';
         return;
     }
 
     let total = 0;
     cartItemsContainer.innerHTML = '';
     
     cart.forEach(item => {
         const itemTotal = item.quantity * item.price;
         total += itemTotal;
         
         const cartItem = document.createElement('div');
         cartItem.className = 'cart-item';
         cartItem.innerHTML = `
             <span>${item.name} x${item.quantity}</span>
             <span>$${itemTotal.toFixed(2)}</span>
         `;
         cartItemsContainer.appendChild(cartItem);
     });
 
     cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
 }
 
 // Scroll to order form
 function scrollToOrderForm() {
     const orderForm = document.getElementById('order-form');
     orderForm.scrollIntoView({ behavior: 'smooth' });
 }
 
 // Handle form submission
 function submitOrder(event) {
     event.preventDefault();
     
     if (cart.length === 0) {
         alert('Please add items to your cart before placing an order.');
         return;
     }
 
     const form = event.target;
     const formData = new FormData(form);
     const orderData = {
         name: formData.get('name'),
         phone: formData.get('phone'),
         email: formData.get('email'),
         delivery: formData.get('delivery'),
         address: formData.get('address'),
         notes: formData.get('notes'),
         items: cart,
         total: cart.reduce((sum, item) => sum + (item.quantity * item.price), 0)
     };
 
     // Here you would typically send orderData to a server
     console.log('Order submitted:', orderData);
     
     // Show confirmation
     alert('Order placed successfully! Thank you for your order.');
     
     // Reset cart and form
     cart = [];
     localStorage.removeItem('cart');
     updateCartDisplay();
     form.reset();
 }