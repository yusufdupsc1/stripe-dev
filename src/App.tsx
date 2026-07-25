import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import WebhookTrace from './components/WebhookTrace';
import AboutExpertise from './components/AboutExpertise';
import Projects from './components/Projects';
import Contact  from './components/Contact';
import Footer   from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#050508] text-[#e4e4f0] min-h-screen antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <WebhookTrace />
        <AboutExpertise />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
