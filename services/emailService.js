const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendMail = async ({
  to,
  cc,
  subject,
  html,
  attachments = [],
}) => {
  try {
    const response = await resend.emails.send({
      from:"Alira Pharmaceuticals <no-reply@errorr.in>",
      to: Array.isArray(to) ? to : [to],
      cc: cc
        ? Array.isArray(cc)
          ? cc
          : [cc]
        : undefined,
      subject,
      html,
      attachments: attachments.length
        ? attachments.map((file) => ({
            filename: file.filename,
            content: file.content,
          }))
        : undefined,
    });

    return response;
  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }
};
