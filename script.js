// ─── Smooth Scroll ───────────────────────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}


// ─── Navbar Shadow on Scroll ─────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0,0,0,0.08)'
      : 'none';
  }
});


// ─── Pricing: Show Payment Box ───────────────────────────────────────────────
function showPayment() {
  const box = document.getElementById('paymentBox');
  if (!box) return;
  box.style.display = 'block';
  setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
}

function confirmPayment() {
  alert('🎉 Payment received! Daniel will contact you shortly. Thank you!');
}


// ─── Booking: Validate → Show Payment Box ────────────────────────────────────
function showBookingPayment() {
  const name    = document.getElementById('clientName').value.trim();
  const phone   = document.getElementById('clientPhone').value.trim();
  const service = document.getElementById('clientDesign').value;

  if (!name || !phone || !service) {
    alert('Please fill in all fields before proceeding.');
    return;
  }

  const box = document.getElementById('bookingBox');
  if (!box) return;
  box.style.display = 'block';
  setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
}


// ─── Booking: Confirm & Show Summary ─────────────────────────────────────────
function confirmBooking() {
  const name    = document.getElementById('clientName').value.trim();
  const phone   = document.getElementById('clientPhone').value.trim();
  const service = document.getElementById('clientDesign').value;
  const result  = document.getElementById('bookingResult');

  if (!name || !phone || !service) {
    alert('Please fill in all fields.');
    return;
  }

  if (!result) return;

  result.style.display = 'block';
  result.innerHTML = `
    <h3>✅ Booking Confirmed!</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p style="margin-top:12px; color:var(--muted)">
      Payment will be verified manually. Daniel will be in touch soon!
    </p>
  `;

  setTimeout(() => result.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
}


// ─── EmailJS: Contact Form ────────────────────────────────────────────────────
function sendEmail() {
  emailjs.init("YOUR_PUBLIC_KEY"); // 🔑 Replace with your EmailJS public key

  const name    = document.querySelector('#contact input[type="text"]').value.trim();
  const email   = document.querySelector('#contact input[type="email"]').value.trim();
  const message = document.querySelector('#contact textarea').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all contact fields.');
    return;
  }

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name: name,
    reply_to:  email,
    message:   message,
  })
  .then(() => {
    alert('✅ Message sent! Daniel will get back to you soon.');
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    alert('❌ Failed to send message. Please try again.');
  });
}
