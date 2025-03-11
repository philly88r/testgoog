# Google Pay Integration with Stripe

This repository contains a production-ready Google Pay integration with Stripe.

## Features

- Google Pay button integration in production mode
- Stripe payment processing
- Minimum payment amount enforcement ($0.50)
- Error handling for payment requests
- Debug panel (accessible via `?debug=true` URL parameter)
- Support for custom payment amounts via `?jobrate=X.XX` URL parameter
- Support for custom job IDs via `?job_id=XXX` URL parameter

## Configuration

The integration is configured with:

- Environment: PRODUCTION
- Merchant ID: BCR2DN4T77AI7IZ7
- Business name: pwndu.ai
- Stripe publishable key: pk_live_51QvqNUGWV02yv11osCwuRWoFsn4dJ2kohOemtSOHXdQ5WkSGyWmcr5gRdjalxdm0tT33Xk4kwB6YCEbcQdMQTiy900uGPUBybL

## Testing

You can test the integration with the following URLs:

- Basic test: `https://your-site.com/index.html`
- Debug mode: `https://your-site.com/index.html?debug=true`
- Custom amount: `https://your-site.com/index.html?jobrate=1.50`

## Requirements

- Must be served over HTTPS (required by Google Pay)
- Merchant account must be verified with Google Pay

## Troubleshooting

If you encounter any issues:

1. Ensure your merchant account is fully verified with Google Pay
2. Check that you're serving the page over HTTPS
3. Try using the debug mode to see detailed logs
4. Make sure the payment amount is at least $0.50 (Stripe requirement)
