import { useRef, lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import WebhookTrace from './components/WebhookTrace';
import AboutExpertise from './components/AboutExpertise';
import Projects from './components/Projects';
import ProjectCaseStudy from './pages/ProjectCaseStudy';
import Contact  from './components/Contact';
import Footer   from './components/Footer';

const CommandPalette = lazy(() => import('./components/CommandPalette'));

export default function App() {
  const paletteRef = useRef<{ open: () => void }>(null);

  return (
    <div className="min-h-screen antialiased overflow-x-hidden">
      <Navbar paletteRef={paletteRef} />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <WebhookTrace />
              <AboutExpertise />
              <Projects />
              <Contact />
            </>
          } />
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        </Routes>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <CommandPalette innerRef={paletteRef} />
      </Suspense>
    </div>
  );
}
