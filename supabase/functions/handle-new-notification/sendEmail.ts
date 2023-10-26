import { sendMail } from "https://deno.land/x/sendgrid@0.0.3/mod.ts";

const EMAIL_NOTIFICATION_TEMPLATE_ID = "d-49412af7fc844297b21e1cea8465352a";
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");

type SendEmailInput = {
  to: string;
  data: {
    createdAt: string;
    type: string;
    message: string;
  };
};

export const sendEmail = ({ to, data }: SendEmailInput) => {
  return sendMail(
    {
      templateId: EMAIL_NOTIFICATION_TEMPLATE_ID,
      from: {
        email: "szilard@audiocalendar.app",
        name: "Szilard from Audiocalendar",
      },
      personalizations: [
        {
          to: [{ email: to }],
          // @ts-ignore: This seems to be badly typed in the package. content is not required when using a dynamic template
          content: [],
          dynamicTemplateData: data,
        },
      ],
    },
    { apiKey: SENDGRID_API_KEY }
  );
};
