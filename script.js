// get references to the form and table
const bookingForm = document.getElementById('bookingForm');
const bookingDetailsTable = document.getElementById('bookingDetails').getElementsByTagName('tbody')[0];

// listen for form submission
bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // get form values
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const pc = document.getElementById('pcSelect').value;
  const time = parseInt(document.getElementById('timeSelect').value);
  const payment = parseFloat(document.getElementById('paymentInput').value);

  // create booking object
  const booking = {
    name: name,
    email: email,
    time: time,
    payment: payment,
    timestamp: Date.now()
  };

  // store booking object in localStorage
  localStorage.setItem(pc, JSON.stringify(booking));

  // reset form
  bookingForm.reset();
});

// display booked PCs with remaining time
function displayBookingDetails() {
  // clear existing table rows
  bookingDetailsTable.innerHTML = '';

  // loop through all localStorage keys and display booking details for booked PCs
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key
