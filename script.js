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


let selectedAmount = 0;

// ─── Called when Pay Now is clicked on a price card ──────────────────────
function selectService(serviceName, amount) {
    selectedAmount = amount;

    // Pre-select the service in the dropdown
    const dropdown = document.getElementById('clientDesign');
    for (let i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value === serviceName) {
            dropdown.selectedIndex = i;
            break;
        }
    }

    // Scroll to booking section
    scrollToSection('booking');
}

function confirmPayment() {
  alert('🎉 Payment received! Daniel will contact you shortly. Thank you!');
}


// ─── Booking: Validate → Show Payment Box ────────────────────────────────────


function showBookingPayment() {
    const name    = document.getElementById('clientName').value.trim();
    const email   = document.getElementById('clientEmail').value.trim();
    const service = document.getElementById('clientDesign').value;
    console.log(service)

    if (!name || !email || !service) {
        alert('Please fill in all fields before proceeding.');
        return;
    }
    
    let amount = 0;

    switch(service){
    
      case "Logo Design – GHS150":
        amount = 150;
        break;
    
      case "Brand Identity – GHS300":
        amount = 300;
        break;
    
      case "Social Media Design – GHS100":
        amount = 100;
        break;
    
      case "Poster Design – GHS80":
        amount = 80;
        break;
    
      default:
        amount = 0;
    }

    // Launch Paystack
    let handler = PaystackPop.setup({
        key: 'pk_test_0e7b9673fcdad06c4f9c3dda9fa02a80144be668',
        email: email,
        amount: amount * 100,
        currency: 'GHS',
        ref: 'DG_' + Math.floor(Math.random() * 1000000),
        label: service,
        channels: ['mobile_money'],
        callback: function(response) {
            confirmBooking(response.reference);
        },
        onClose: function() {
            alert('Payment was not completed.');
        }
    });

    handler.openIframe();
}


// ─── Booking: Confirm & Show Summary ─────────────────────────────────────────

function confirmBooking(paymentRef) {
    const name    = document.getElementById('clientName').value.trim();
    const email   = document.getElementById('clientEmail').value.trim();
    const service = document.getElementById('clientDesign').value;
    const result  = document.getElementById('bookingResult');

    if (!result) return;

    result.style.display = 'block';
    result.innerHTML = `
        <h3>✅ Booking Confirmed!</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Payment Ref:</strong> ${paymentRef}</p>
        <p style="margin-top:12px; color:var(--muted)">
            Payment verified. Daniel will be in touch soon!
        </p>
    `;

    setTimeout(() => result.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
}


// ─── EmailJS: Contact Form ────────────────────────────────────────────────────
function sendEmail() {

  emailjs.init("OFDjJwCpXgUr5qhY9");

  const btn = document.getElementById("sendBtn");
  const loader = document.getElementById("loader");
  const text = document.getElementById("btnText");

  const name    = document.querySelector('#contact input[type="text"]').value.trim();
  const email   = document.querySelector('#contact input[type="email"]').value.trim();
  const message = document.querySelector('#contact textarea').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all contact fields.');
    return;
  }

  // START LOADING
  loader.style.display = "block";
  text.innerHTML = "Sending...";
  btn.disabled = true;

  emailjs.send("service_t8vvg8r", "template_ldyd9if", {
    from_name: name,
    reply_to:  email,
    message:   message,
  })

  .then(() => {

    alert('✅ Message sent! Daniel will get back to you soon.');

    // RESET FORM
    document.querySelector('#contact input[type="text"]').value = "";
    document.querySelector('#contact input[type="email"]').value = "";
    document.querySelector('#contact textarea').value = "";

  })

  .catch((err) => {
    console.error('EmailJS error:', err);
    alert('❌ Failed to send message. Please try again.');
  })

  .finally(() => {

    // STOP LOADING
    loader.style.display = "none";
    text.innerHTML = "Send Message →";
    btn.disabled = false;

  });

}