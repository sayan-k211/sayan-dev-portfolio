const nodemailer = require('nodemailer');

exports.send = async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  try {
    const {
      SMTP_HOST,
      SMTP_PORT = '587',
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      return res.status(500).json({ success: false, error: 'Mail server not configured' });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"Portfolio Website" <${SMTP_USER}>`,   
      to: CONTACT_TO,                               
      replyTo: `${name} <${email}>`,                
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><b>From:</b> ${name} &lt;${email}&gt;</p>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error('contact error', err);
    res.status(500).json({ success: false, error: 'Mail failed' });
  }
};
