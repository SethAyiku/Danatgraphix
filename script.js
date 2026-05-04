document.addEventListener("DOMContentLoaded", () => {
  const portfolioBtn = document.getElementById('view-portfolio');

  if (portfolioBtn) {
    portfolioBtn.onclick = function () {
      console.log('Direct click trigger fired!');
      scrollToSection('portfolio');
    };
  }
});


function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'})
}


function showPayment(){
  const b=document.getElementById('paymentBox');
  b.style.display='block';
  setTimeout(()=>b.scrollIntoView({behavior:'smooth',block:'center'}),50)
}
function confirmPayment(){
  alert('🎉 Payment received! Daniel will contact you shortly. Thank you!')
}
function showBookingPayment(){
  const n=document.getElementById('clientName').value.trim(),
  p=document.getElementById('clientPhone').value.trim(),
  d=document.getElementById('clientDesign').value;
  if(!n||!p||!d){
    alert('Please fill in all fields before proceeding.');
    return
  }
  const b=document.getElementById('bookingBox');
  b.style.display='block';
  setTimeout(()=>b.scrollIntoView({behavior:'smooth',block:'center'}),50)}
  
function confirmBooking(){
  const n=document.getElementById('clientName').value.trim(),
  p=document.getElementById('clientPhone').value.trim(),
  d=document.getElementById('clientDesign').value,
  r=document.getElementById('bookingResult');
  r.style.display='block';
  r.innerHTML=`<h3>✅ Booking Confirmed!</h3><p><strong>Name:</strong> ${n}</p><p><strong>Phone:</strong> ${p}</p><p><strong>Service:</strong> ${d}</p><p style="margin-top:12px;color:var(--muted)">Payment will be verified manually. Daniel will be in touch soon!</p>`;
  r.scrollIntoView({behavior:'smooth',block:'center'})}
  
window.addEventListener('scroll',()=>{document.querySelector('nav').style.boxShadow=window.scrollY>20?'0 4px 30px rgba(0,0,0,0.08)':'none'})




function send_email() {
  emailjs.init("YOUR_PUBLIC_KEY");
  
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
  from_name: "Seth",
  message: "Hello from my static app!",
  reply_to: "seth@example.com",
  })
  .then(() => console.log("Email sent!"))
  .catch((err) => console.error("Failed:", err));
}