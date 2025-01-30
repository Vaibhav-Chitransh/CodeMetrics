import { MailtrapClient } from "mailtrap-client";
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const client = new MailtrapClient({
  token: TOKEN,
  endpoint: ENDPOINT
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "MailTrap",
};
const recipients = [
  {
    email: "vaibhavchitranshbdn@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);