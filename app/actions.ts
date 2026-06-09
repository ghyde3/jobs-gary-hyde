'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(data: {
  name: string;
  email: string;
  message: string;
  company?: string;
  role?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { name, email, message, company, role } = data;

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

  const roleTag =
    company && role ? ` [${company}/${role}]` : '';

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || 'Gary Hyde Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO || 'Gary.Robert.Hyde@gmail.com',
      replyTo: email.trim(),
      subject: `New portfolio message from ${name.trim()}${roleTag}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}${roleTag ? `\nRole page: ${company}/${role}` : ''}\n\nMessage:\n${message.trim()}`,
    });

    if (error) {
      console.error('Resend send failed:', error);
      return {
        ok: false,
        error: 'Something went wrong sending your message. Please email me directly.',
      };
    }

    return { ok: true };
  } catch (err) {
    console.error('Contact send threw:', err);
    return {
      ok: false,
      error: 'Something went wrong sending your message. Please email me directly.',
    };
  }
}
