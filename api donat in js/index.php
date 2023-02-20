<?php  

const stripe = require('stripe')('your_stripe_secret_key');

app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Donation'
        },
        unit_amount: amount * 100
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: 'https://yourwebsite.com/thank-you',
    cancel_url: 'https://yourwebsite.com/donation'
  });

  res.json({ id: session.id });
});

?>