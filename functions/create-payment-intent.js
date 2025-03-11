// Netlify serverless function to create a payment intent
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    
    // Validate the input
    if (!data.payment_method_id || !data.amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    // Create a PaymentIntent with the payment method ID
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: data.payment_method_id,
      amount: data.amount, // Amount in cents
      currency: 'usd',
      confirmation_method: 'manual',
      confirm: true,
      return_url: process.env.URL + '/payment_success.html', // Netlify automatically sets the URL environment variable
    });

    // Check if the payment requires additional actions
    if (paymentIntent.status === 'requires_action' && 
        paymentIntent.next_action && 
        paymentIntent.next_action.type === 'use_stripe_sdk') {
      // Tell the client to handle the action
      return {
        statusCode: 200,
        body: JSON.stringify({
          requires_action: true,
          payment_intent_client_secret: paymentIntent.client_secret,
          payment_intent_id: paymentIntent.id
        })
      };
    } else if (paymentIntent.status === 'succeeded') {
      // The payment didn't need any additional actions and completed!
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          payment_intent_id: paymentIntent.id
        })
      };
    } else {
      // Invalid status
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Unexpected payment intent status: ' + paymentIntent.status })
      };
    }
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};
