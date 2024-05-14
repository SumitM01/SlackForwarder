const { App } = require('@slack/bolt');

// Initialize the Slack app
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

// Handle the /forward command
app.command('/forward', async ({ command, ack, client }) => {
  try {
    // Acknowledge the command
    await ack();

    // Get the message text
    const messageText = command.text;

    // Send the message to Channel 2 in uppercase
    const result = await client.chat.postMessage({
      channel: process.env.CHANNEL2_ID,
      text: messageText.toUpperCase()
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

// Start the Slack app
(async () => {
  await app.start(3000);
  console.log('Slack app is running!');
})();