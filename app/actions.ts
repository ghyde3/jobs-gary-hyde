'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { name, email, message } = data;

  if (!name || !name.trim()) {
    return { ok: false, error: 'Please enter your name.' };
  }
  if (!email || !email.trim()) {
    return { ok: false, error: 'Please enter your email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (!message || !message.trim()) {
    return { ok: false, error: 'Please enter a message.' };
  }

  try {
    await resend.emails.send({
      from: 'Gary Hyde Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO || 'Gary.Robert.Hyde@gmail.com',
      replyTo: email.trim(),
      subject: `New portfolio message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    });

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'Something went wrong sending your message. Please email me directly.',
    };
  }
}
