const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateMessage = ({ message, to, subject }) => ({
  to,
  from: process.env.FROM_EMAIL, // Use the email address or domain you verified above
  subject,
  html: message,
});


const emailTemplate =({name,qty,price})=> `
<div>
<h1>Your order has beed Placed</h1>
<div>Product: ${name}</div>
<div>Qty: ${qty}</div>
<div>Price: $${price}</div>
<div>
`

async function sendOrderConfirmEmail({
  to,
  message
}) {
  const msg = generateMessage({
    message,
    to,
    subject: "Order Placed!",
  });

  sgMail.send(msg).then(
    () => {
        console.info("ORDER PLACED!!!")
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
}

module.exports ={
    sendOrderConfirmEmail,
    emailTemplate
}