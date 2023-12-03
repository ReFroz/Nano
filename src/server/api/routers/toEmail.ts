import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const SendMailSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

const smtpOptions = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT!),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
} satisfies SMTPTransport.Options;

export const mailRouter = createTRPCRouter({
  send: publicProcedure
    .input(SendMailSchema)
    .mutation(async ({ ctx, input }) => {
      const transporter = nodemailer.createTransport(smtpOptions);
      try {
        const result = await transporter.sendMail({
          to: "rinatlausin449@gmail.com",
          subject: `Сообщение от пользователя ${input.name} сайта`,
          html: `<div>
          От <b>${input.name}</b>
          <br/>
          Почта <b>${input.email}</b>
          <br/>
          Cообщение:<b>${input.message}</b>
          </div>`,
        });
        return result.accepted;
      } catch (e) {
        return false;
      }
    }),
});
