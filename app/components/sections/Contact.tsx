'use client';

import React, { useState } from 'react';
import { Button } from '../Button';
import { LINKS } from '../../data/profile';
import { sendContact } from '../../actions';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '40px',
  padding: '0 16px',
  fontFamily: "'DM Sans',system-ui,sans-serif",
  fontSize: '13px',
  color: '#FAFAFA',
  backgroundColor: '#111113',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '6px',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  color: '#A1A1AA',
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const mailto = `mailto:${LINKS.email}`;

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const result = await sendContact(form);

    if (result.ok) {
      setStatus('sent');
    } else {
      setStatus('error');
      setErrorMsg(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <section
      className="section"
      id="contact"
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <style>{`
        .contact-name-email {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .contact-name-email {
            grid-template-columns: 1fr;
          }
        }
        .contact-input:focus {
          border-color: rgba(255,255,255,0.24);
        }
      `}</style>
      <div className="container">
        <div style={{ maxWidth: '560px' }}>
          <div className="section-label">CONTACT</div>
          <h2 className="section-heading">Get in touch</h2>
          <p
            style={{
              fontSize: '18px',
              color: '#71717A',
              lineHeight: '1.65',
              marginBottom: '40px',
            }}
          >
            I am open to senior and lead full-stack roles, remote-first or around the Orlando
            metro. Tell me what you are building and what you need, and I will reply within one
            business day.
          </p>

          {status === 'sent' ? (
            <div
              style={{
                padding: '32px',
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '20px',
                  color: '#22C55E',
                  marginBottom: '8px',
                }}
              >
                Message sent
              </div>
              <div style={{ fontSize: '13px', color: '#A1A1AA' }}>
                I will be in touch within one business day.
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div className="contact-name-email">
                <div style={fieldStyle}>
                  <label style={labelStyle}>Your name</label>
                  <input
                    className="contact-input"
                    style={inputStyle}
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={set('name')}
                    required
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    className="contact-input"
                    style={inputStyle}
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={set('email')}
                    required
                  />
                </div>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Message</label>
                <textarea
                  className="contact-input"
                  rows={4}
                  style={{
                    ...inputStyle,
                    height: 'auto',
                    padding: '12px 16px',
                    resize: 'vertical',
                    lineHeight: '1.6',
                  }}
                  placeholder="Tell me what you are building and what you need..."
                  value={form.message}
                  onChange={set('message')}
                  required
                />
              </div>

              {status === 'error' && errorMsg && (
                <div
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(239,68,68,0.12)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#EF4444',
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <div>
                <Button
                  variant="primary"
                  size="lg"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                </Button>
              </div>
            </form>
          )}

          <p style={{ marginTop: '24px', fontSize: '13px', color: '#71717A' }}>
            Prefer email?{' '}
            <a href={mailto} style={{ color: '#F59E0B', textDecoration: 'none' }}>
              {LINKS.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
