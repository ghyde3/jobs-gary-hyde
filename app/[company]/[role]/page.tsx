import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { NavBar } from '../../components/NavBar';
import { RoleHero } from '../../components/sections/RoleHero';
import { RoleSection } from '../../components/sections/RoleSection';
import { Skills } from '../../components/sections/Skills';
import { Models } from '../../components/sections/Models';
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
    data.seoTitle ?? `${data.roleTitle} at ${data.companyName} - Gary Hyde`;
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
  // Role pages show branding only: no nav links, no CTA.
  // The logo prop is the same JSX used on the homepage.
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
      <NavBar logo={logoNode} />
      <main style={{ paddingTop: '60px' }}>
        <RoleHero
          headline={data.hero.headline}
          subhead={data.hero.subhead}
          companyName={data.companyName}
          roleTitle={data.roleTitle}
        />
        <RoleSection role={data} />
        <Skills />
        <Models />
        <Notes />
        <About />
      </main>
      <Footer />
    </>
  );
}
