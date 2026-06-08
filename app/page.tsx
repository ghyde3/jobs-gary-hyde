import React from 'react';
import { NavBar } from './components/NavBar';
import { Button } from './components/Button';
import { Hero } from './components/sections/Hero';
import { Work } from './components/sections/Work';
import { Skills } from './components/sections/Skills';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

export default function Home() {
  return (
    <>
      <NavBar
        logo={
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
        }
        links={[
          { label: 'Work', href: '#work' },
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
        <Hero />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
