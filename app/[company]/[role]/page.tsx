import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { NavBar } from '../../components/NavBar';
import { RoleHero } from '../../components/sections/RoleHero';
import { RoleSection } from '../../components/sections/RoleSection';
import { Skills } from '../../components/sections/Skills';
import { Models } from '../../components/sections/Models';
import { HeroTerminal } from '../../components/sections/HeroTerminal';
import { Notes } from '../../components/sections/Notes';
import { About } from '../../components/sections/About';
import { Footer } from '../../components/sections/Footer';
import { ROLES, getAllRoleSlugs } from '../../data/roles/index';

interface Params {
  company: string;
  role: string;
}

export function generateStaticParams(): Params[] {
  return getAllRoleSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { company, role } = await params;
  const data = ROLES[`${company}/${role}`];

  if (!data) {
    return {
      title: 'Not found',
      robots: { index: false, follow: false },
    };
  }

  const title =
    data.seoTitle ?? `Gary Hyde For -> ${data.roleTitle} at ${data.companyName}`;
  const description =
    data.seoDescription ??
    `Gary Hyde's application for the ${data.roleTitle} role at ${data.companyName}.`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function RolePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { company, role } = await params;
  const data = ROLES[`${company}/${role}`];

  if (!data) {
    notFound();
  }

  // NavBar accepts logo (ReactNode), links (optional, defaults []), cta (optional).
  // The logo prop is the same JSX used on the homepage.
  const navLinks = [
    { label: 'Why I fit', href: '#role' },
    { label: 'Selected work', href: '#work' },
    { label: 'Ask me', href: '#ask' },
    { label: 'Materials', href: '#materials' },
    { label: 'Contact', href: '#contact' },
  ];

  const logoNode = (
    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img src="/logo.svg" width={26} height={26} alt="GH" />
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '-0.02em',
          color: 'var(--text-1)',
        }}
      >
        Gary Hyde
      </span>
    </span>
  );

  return (
    <>
      <NavBar logo={logoNode} links={navLinks} />
      <main style={{ paddingTop: '60px' }}>
        <RoleHero
          headline={data.hero.headline}
          subhead={data.hero.subhead}
        />
        <RoleSection role={data} />
        <Skills />
        <Models />
        <section
          id="ask"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '80px 0',
          }}
        >
          <div className="container">
            <div className="section-label">ASK ME ANYTHING</div>
            <h2 className="section-heading" style={{ marginBottom: '12px' }}>An AI agent trained on my background</h2>
            <p style={{ fontSize: '17px', color: '#71717A', maxWidth: '520px', lineHeight: '1.65', marginBottom: '40px' }}>
              Ask about my experience, how I approach a problem, or anything else. It has full context on my background and the work I have shipped.
            </p>
            <HeroTerminal boot="ask why should we hire gary?" />
          </div>
        </section>
        <Notes />
        <About />
      </main>
      <Footer />
    </>
  );
}
