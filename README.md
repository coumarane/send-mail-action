# How to Use the Send Mail Action

## Running the Code Locally

1. Set up environment variables to simulate inputs:
- **For Windows:** Use Git Bash.
- **For macOS or Linux:** Use Bash.

```bash
export INPUT_API_KEY='your-mailjet-api-key'
export INPUT_API_SECRET='your-mailjet-api-secret'
export INPUT_FROM_EMAIL='c.coumarane@gmail.com'
export INPUT_TO_EMAIL='c.coumarane@gmail.com'
export INPUT_SUBJECT='Test Email'
export INPUT_MESSAGE='This is a test email from Mailjet!'
```

> **_NOTE:_** : The `@actions/core `library automatically reads inputs from environment variables prefixed with `INPUT_` followed by the input name.

1. Run the script:
```bash
node index.js
```

## Using the Action in a Workflow
To use this action in a GitHub workflow:

### 1. Add Mailjet Credentials to GitHub Secrets
Securely store your Mailjet API key and secret as GitHub Secrets:
1. Navigate to your repository on GitHub.
2. Go to **Settings > Security > Secrets and variables > Actions > Environment secrets > Manage environment secrets**.
3. Add the following secrets:
   - **Name**: `MAILJET_API_KEY`, **Value**: Your Mailjet API Key.
   - **Name**: `MAILJET_API_SECRET`, **Value**: Your Mailjet API Secret.

### 2. Create the Workflow File
Create a `.github/workflows/send-mail.yml` file in your repository with the following content:

```yaml
name: Send Mail using Mailjet

on:
  push:
    branches:
      - main

jobs:
  send_email:
    runs-on: ubuntu-latest
    environment: dev # Reference the environment name here
    steps:
      - name: Use Send Mail Action
        uses: coumarane/send-mail-action@v1.1.2
        with:
          api_key: ${{ secrets.MAILJET_API_KEY }}
          api_secret: ${{ secrets.MAILJET_API_SECRET }}
          from_email: 'you@example.com'
          to_email: 'recipient@example.com'
          subject: 'Hello from GitHub Actions'
          message: 'This is a test email sent via Mailjet!'

```

**Workflow Description:**
* **Trigger:** The workflow is triggered on a push event to the main branch.
* **Job:** `send-email` runs on an `ubuntu-latest` runner and references the dev environment.
* **Action:** Uses the `coumarane/send-mail-action` action to send an email with the specified inputs.
