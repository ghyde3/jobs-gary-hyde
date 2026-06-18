import React from 'react';
import { NavBar } from './components/NavBar';
import { Button } from './components/Button';
import { HeroConsole } from './components/sections/HeroConsole';
import { PROFILE } from './data/profile';
import { Work } from './components/sections/Work';
import { Skills } from './components/sections/Skills';
import { Models } from './components/sections/Models';
import { Notes } from './components/sections/Notes';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

export default function Home() {
  return (
    <>
      <NavBar
        logo={
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/gh-logo-3d.png" width={28} height={28} alt="GH" />
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
        }
        links={[
          { label: 'Work', href: '#work' },
          { label: 'Models', href: '#models' },
          { label: 'Notes', href: '#notes' },
          { label: 'About', href: '#about' },
          { label: 'Contact', href: '#contact' },
        ]}
        cta={
          <Button variant="primary" size="sm" href="#contact">
            Get in touch
          </Button>
        }
      />
      <main style={{ paddingTop: '60px' }}>
        <HeroConsole
          headline={PROFILE.title}
          intro={PROFILE.summary}
          ctaPrimary={{ label: 'View my work', href: '#work' }}
          ctaSecondary={{ label: 'Get in touch', href: '#contact' }}
        />
        <Work />
        <Skills />
        <Models />
        <Notes />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
