import twilio from "twilio";

const accountSid = "ACd15699cca76ee13de8c4e3d2b3b7d7b2";
const authToken = "f3eb6841e4053987bbf7a83c33080746";

const client = twilio(accountSid, authToken);

export const sendWhatsappMsg = async (msg) => {
  const message = await client.messages.create({
    body: msg,
    from: "whatsapp:+14155238886",
    to: 'whatsapp:+971558655214'
  });
};
