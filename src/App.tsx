import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import About    from './components/About';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Contact  from './components/Contact';
import Footer   from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#050508] text-[#e4e4f0] min-h-screen antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
