# Google Pay with Stripe for Netlify

This repository contains a complete implementation of Google Pay with Stripe, optimized for deployment on Netlify.

## Features

- Google Pay integration with Stripe
- Serverless backend using Netlify Functions
- Debug information for troubleshooting
- Support for both test and production environments

## Setup Instructions

### 1. Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/google-pay-stripe-netlify)

Or manually deploy:

1. Push this code to a GitHub repository
2. Log in to Netlify and select "New site from Git"
3. Connect to your GitHub repository
4. Configure the build settings (they should be automatically detected)
5. Deploy the site

### 2. Configure Environment Variables

In the Netlify dashboard:

1. Go to Site settings > Build & deploy > Environment
2. Add the following environment variable:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_live_` for production or `sk_test_` for testing)

### 3. Update Configuration

In the `index.html` file, update:

1. Stripe publishable key
2. Google Pay merchant ID
3. Business name

## Testing

### Test Environment

For testing, use:
- Stripe test publishable key: `pk_test_TYooMQauvdEDq54NiTphI7jx` (or your own test key)
- Set environment to 'TEST'
- Use a dummy merchant ID (e.g., '01234567890123456789') or leave it blank for testing

### Production Environment

For production, use:
- Stripe live publishable key
- Set environment to 'PRODUCTION'
- Your Google Pay merchant ID (without the 'merchant:' prefix in the HTML form)

## Implementation Details

This implementation uses:

1. **Frontend**: HTML, CSS, and JavaScript with the Google Pay API and Stripe.js
2. **Backend**: Netlify Functions (serverless) for processing payments with Stripe

The payment flow:
1. User clicks the Google Pay button
2. Google Pay shows a payment sheet
3. After user confirms, a payment token is generated
4. The token is sent to Stripe to create a Payment Method
5. The Payment Method ID is sent to our Netlify Function
6. The function creates a Payment Intent with Stripe
7. Payment result is returned to the frontend

## Troubleshooting

If you encounter issues:

1. Check the debug panel for information
2. Ensure your Stripe account has Google Pay enabled
3. Verify your merchant ID is correct
4. Make sure you're using the correct environment settings

## Security Notes

- Never expose your Stripe secret key in client-side code
- Always use HTTPS (Netlify provides this automatically)
- Use test keys during development
