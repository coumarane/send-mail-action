# How to

## Running the Code Locally

1. Set up environment variables to simulate inputs:

```bash
export INPUT_API_KEY='your-mailjet-api-key'
export INPUT_API_SECRET='your-mailjet-api-secret'
export INPUT_FROM_EMAIL='c.coumarane@gmail.com'
export INPUT_TO_EMAIL='c.coumarane@gmail.com'
export INPUT_SUBJECT='Test Email'
export INPUT_MESSAGE='This is a test email from Mailjet!'
```

*Note*: By default, the @actions/core library looks for inputs in the form of `INPUT_<input_name>` in the environment variables.

2. Run the script:
```bash
node index.js
```

## Use Action in a Workflow

1. Create a .github/workflows/send-mail.yml file in any repository:

```bash
name: Send Mail using Mailjet

on:
  push:
    branches:
      - main

jobs:
  send_email:
    runs-on: ubuntu-latest
    steps:
      - name: Use Send Mail Action
        uses: coumarane/send-mail-action@v1
        with:
          api_key: ${{ secrets.MAILJET_API_KEY }}
          api_secret: ${{ secrets.MAILJET_API_SECRET }}
          from_email: 'you@example.com'
          to_email: 'recipient@example.com'
          subject: 'Hello from GitHub Actions'
          message: 'This is a test email sent via Mailjet!'
```