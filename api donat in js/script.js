// Define the Stripe API key
const stripe = Stripe('your_stripe_api_key');

// Define the donation form and button elements
const donationForm = document.getElementById('donation-form');
const donationButton = document.getElementById('donation-button');

// Add an event listener to the donation form submission
donationForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Disable the donation button to prevent duplicate submissions
  donationButton.disabled = true;

  // Collect the donation amount from the form
  const donationAmount = donationForm.elements['amount'].value;

  // Create a Stripe Checkout session
  const session = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount: donationAmount })
  }).then((res) => res.json());

  // Redirect the user to the Stripe Checkout page
  stripe.redirectToCheckout({ sessionId: session.id });
});