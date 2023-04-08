// Import the pc-booking-sorter package
import { sortBookedPCs } from 'pc-booking-sorter';

// Define variables for DOM elements
const bookingDetailsTable = document.getElementById('bookingDetails');
const pcCountDisplay = document.getElementById('pcCount');
const nameInput = document.getElementById('name');
const timeInput = document.getElementById('time');
const paymentInput = document.getElementById('payment');
const submitButton = document.getElementById('submit');
const totalPCs = 10; // Assuming there are 10 PCs available for booking

// Function to display booking details
function displayBookingDetails() {
  // Clear existing table rows
  bookingDetailsTable.innerHTML = '';

  // Initialize PC count
  let pcCount = 0;

  // Create array to store booked PCs
  const bookedPCs = [];

  // Loop through all localStorage keys and display booking details for booked PCs
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('pc') && localStorage.getItem(key) !== null) {
      const bookingDetails = JSON.parse(localStorage.getItem(key));
      const pcNumber = key.substr(2);
      const remainingTime = Math.round((new Date(bookingDetails.timestamp).getTime() + bookingDetails.time * 60 * 60 * 1000 - Date.now()) / (60 * 60 * 1000) * 10) / 10;
      if (remainingTime > 0) {
        // Add booked PC to array
        bookedPCs.push({
          pcNumber: pcNumber,
          remainingTime: remainingTime,
          bookingDetails: bookingDetails
        });

        // Increment PC count
        pcCount++;
      } else {
        // Remove expired booking details from localStorage
        localStorage.removeItem(key);
      }
    }
  }

  // Sort booked PCs by remaining time
  const sortedBookedPCs = sortBookedPCs(bookedPCs);

  // Display sorted booked PCs in table
  sortedBookedPCs.forEach(bookedPC => {
    // Create table row and cells
    const row = bookingDetailsTable.insertRow();
    const pcNumberCell = row.insertCell();
    const timeCell = row.insertCell();
    const paymentCell = row.insertCell();
    const remainingTimeCell = row.insertCell();

    // Set cell values
    pcNumberCell.innerText = bookedPC.pcNumber;
    timeCell.innerText = bookedPC.bookingDetails.time + ' hours';
    paymentCell.innerText = bookedPC.bookingDetails.payment;
    remainingTimeCell.innerText = bookedPC.remainingTime + ' hours';
  });

  // Update PC count display
  pcCountDisplay.innerText = pcCount;
}

// Call displayBookingDetails function on page load and every 10 seconds
displayBookingDetails();
setInterval(displayBookingDetails, 10000);

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
  
    // Get form values
    const name = nameInput.value;
    const time = parseInt(timeInput.value);
    const payment = paymentInput.value;
  
    // Find the first available PC and book it
    let pcNumber = null;
    for (let i = 1; i <= 10; i++) {
      if (localStorage.getItem('pc' + i) === null) {
        pcNumber = i;
        break;
      }
    }
  
    if (pcNumber) {
      // Set booking details in local storage
      const timestamp = new Date();
      const bookingDetails = {
        timestamp: timestamp.toISOString(),
        time: time,
        payment: payment
      };
      localStorage.setItem(`pc${pcNumber}`, JSON.stringify(bookingDetails));
    }
  
    // Clear form inputs
    nameInput.value = '';
    timeInput.value = '';
    paymentInput.value = '';
  
    // Update booking details display
    displayBookingDetails();
  }
  
