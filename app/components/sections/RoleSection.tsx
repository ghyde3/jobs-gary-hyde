'use client';

import React, { useState } from 'react';
import { Card } from '../Card';
import { Divider } from '../Divider';
import { Button } from '../Button';
import { ProjectCard } from './ProjectCard';
import { PROJECTS, LINKS } from '../../data/profile';
import { sendContact } from '../../actions';
import { BOOKING_URL } from '../../lib/constants';
import type { RoleData } from '../../data/roles/types';

interface RoleSectionProps {
  role: RoleData;
}

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

export function RoleSection({ role }: RoleSectionProps) {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    const result = await sendContact({
      ...form,
      company: role.company,
      role: role.role,
    });
    if (result.ok) {
      setStatus('sent');
    } else {
      setStatus('error');
      setErrorMsg(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  // Resolve curated projects.
  // Undefined = use all PROJECTS in default order.
  // Explicit empty array = hide projects entirely.
  const curatedProjects = (() => {
    if (role.projects === undefined) {
      return PROJECTS.map((p) => ({ project: p, framing: undefined }));
    }
    return role.projects
      .map((cp) => {
        const project = PROJECTS.find((p) => p.title === cp.projectTitle);
        if (!project) return null;
        return { project, framing: cp.framing };
      })
      .filter(
        (x): x is { project: (typeof PROJECTS)[number]; framing: string | undefined } =>
          x !== null,
      );
  })();

  const bookingUrl = role.bookingUrl ?? BOOKING_URL;
  const mailto = `mailto:${LINKS.email}`;

  return (
    <section
      className="section"
      id="role"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#111113',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <style>{`
        .req-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .req-col-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #52525B;
          margin-bottom: 6px;
        }
        .req-text {
          font-size: 14px;
          color: #A1A1AA;
          line-height: 1.55;
        }
        .req-proof {
          font-size: 14px;
          color: #FAFAFA;
          line-height: 1.55;
        }
        .contact-name-email-role {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .req-grid { grid-template-columns: 1fr; }
          .contact-name-email-role { grid-template-columns: 1fr; }
        }
        .role-contact-input:focus {
          border-color: rgba(255,255,255,0.24);
        }
      `}</style>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Note */}
        <div className="section-label">BUILT FOR YOU</div>
        <p
          style={{
            fontSize: '18px',
            color: '#A1A1AA',
            lineHeight: '1.65',
            maxWidth: '640px',
            marginBottom: '48px',
          }}
        >
          {role.note}
        </p>

        <Divider label="REQUIREMENT TO PROOF" spacing="sm" />

        {/* Requirement-proof pairs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '24px',
            marginBottom: '48px',
          }}
        >
          {role.requirements.map((rp, i) => (
            <Card key={i} padding="md">
              <div className="req-grid">
                <div>
                  <div className="req-col-label">REQUIREMENT</div>
                  <div className="req-text">{rp.requirement}</div>
                </div>
                <div>
                  <div className="req-col-label">PROOF</div>
                  <div className="req-proof">{rp.proof}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Curated projects */}
        {curatedProjects.length > 0 && (
          <>
            <Divider label="SELECTED WORK" spacing="sm" />

            {role.breadthNote && (
              <p
                style={{
                  fontSize: '16px',
                  color: '#71717A',
                  lineHeight: '1.65',
                  marginTop: '24px',
                  marginBottom: '32px',
                  maxWidth: '600px',
                }}
              >
                {role.breadthNote}
              </p>
            )}

            <div
              className="work-bands"
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: role.breadthNote ? '0' : '24px',
                marginBottom: '48px',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              {curatedProjects.map(({ project, framing }, i) => {
                const displayProject = framing ? { ...project, sub: framing } : project;
                return (
                  <ProjectCard key={project.id} project={displayProject} index={i} />
                );
              })}
            </div>
          </>
        )}

        {/* Conversion block */}
        <Divider label="NEXT STEP" spacing="sm" />

        <div style={{ marginTop: '40px' }}>
          {/* Primary CTA */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '22px',
                color: '#FAFAFA',
                letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}
            >
              Book a call
            </div>
            <p
              style={{
                fontSize: '15px',
                color: '#71717A',
                lineHeight: '1.6',
                marginBottom: '20px',
                maxWidth: '480px',
              }}
            >
              Pick a slot and I will come prepared. Thirty minutes is plenty.
            </p>
            <Button variant="primary" size="lg" href={bookingUrl}>
              Book a call
            </Button>
          </div>

          <Divider spacing="sm" />

          {/* PDF downloads */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '22px',
                color: '#FAFAFA',
                letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}
            >
              Download my materials
            </div>
            <p
              style={{
                fontSize: '15px',
                color: '#71717A',
                lineHeight: '1.6',
                marginBottom: '20px',
                maxWidth: '480px',
              }}
            >
              Both documents are tailored to this role.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" size="md" href={role.artifacts.resumePdf}>
                Download resume
              </Button>
              <Button variant="secondary" size="md" href={role.artifacts.coverLetterPdf}>
                Download cover letter
              </Button>
            </div>
          </div>

          <Divider spacing="sm" />

          {/* Contact form - id="contact" so the hero's "Get in touch" anchor works */}
          <div id="contact" style={{ maxWidth: '560px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '22px',
                color: '#FAFAFA',
                letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}
            >
              Send a message
            </div>
            <p
              style={{
                fontSize: '15px',
                color: '#71717A',
                lineHeight: '1.6',
                marginBottom: '24px',
              }}
            >
              Prefer to write? I read everything and reply within one business day.
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
                <div className="contact-name-email-role">
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Your name</label>
                    <input
                      className="role-contact-input"
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
                      className="role-contact-input"
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
                    className="role-contact-input"
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
                    type="submit"
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
      </div>
    </section>
  );
}
