import { Link } from 'react-router-dom';
import {
  Sparkles,
  PlayCircle,
  ArrowRight,
  Code,
  Smartphone,
  Layout,
  UploadCloud,
  Cpu,
  Zap,
  Eye,
  CheckCircle2,
  Copy,
} from 'lucide-react';

const Header = () => (
  <header className="sticky top-0 z-50 w-full bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <img src="/logo.png" alt="UIForge AI Logo" className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105" />
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
        <a href="#frameworks" className="hover:text-blue-600 transition-colors">Supported Frameworks</a>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md shadow-blue-600/20"
        >
          Start Creating
        </Link>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="pt-24 pb-16 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-tight">
        Turn Your UI Designs Into <br className="hidden md:block" />
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Code with AI</span>
      </h1>
      
      <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
        Upload a UI screenshot and generate frontend code automatically with AI. Built for high-velocity teams with zero authentication needed.
      </p>
      
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/create"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20 w-full sm:w-auto"
        >
          Start Creating
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-3.5 rounded-full font-semibold transition-all w-full sm:w-auto">
          <PlayCircle className="w-5 h-5 text-slate-400" />
          See How It Works
        </button>
      </div>

      {/* Mock Visual Representation */}
      <div className="mt-20 relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center perspective-1000">
        
        {/* UI Mockup Card (Left) */}
        <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 transform md:-rotate-y-6 md:rotate-z-2 transition-transform hover:rotate-0 duration-500 h-80 flex flex-col relative group">
          <div className="h-8 border-b border-slate-800 flex items-center px-4 gap-2 bg-slate-900/50">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
             <div className="mx-auto text-[10px] text-slate-500 font-mono">dashboard_ui.png</div>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="h-4 w-32 bg-slate-800 rounded-md"></div>
              <div className="h-8 w-8 bg-slate-800 rounded-full"></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 bg-blue-600/20 border border-blue-500/30 rounded-xl p-3 flex flex-col justify-end">
                 <div className="h-2 w-12 bg-blue-400/50 rounded mt-auto"></div>
              </div>
              <div className="h-20 bg-slate-800 rounded-xl p-3 flex flex-col justify-end">
                 <div className="h-2 w-16 bg-slate-600 rounded mt-auto"></div>
              </div>
              <div className="h-20 bg-slate-800 rounded-xl p-3 flex flex-col justify-end">
                 <div className="h-2 w-10 bg-slate-600 rounded mt-auto"></div>
              </div>
            </div>
            <div className="flex-1 bg-slate-800 rounded-xl mt-2 relative overflow-hidden flex items-end">
               <svg className="absolute bottom-0 w-full h-full text-blue-500/20" preserveAspectRatio="none" viewBox="0 0 100 100">
                 <path d="M0 100 C 20 80, 40 90, 60 50 C 80 10, 100 40, 100 100 Z" fill="currentColor" />
               </svg>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur text-[10px] text-slate-400 px-2 py-1 rounded border border-slate-700">
            Resolution: 1170 x 2532
          </div>
        </div>

        {/* AI Sparkle Center Element */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center">
           <div className="bg-blue-100 p-4 rounded-full border-4 border-slate-50 shadow-xl shadow-blue-500/20">
             <Sparkles className="w-8 h-8 text-blue-600" />
           </div>
        </div>

        {/* Code Mockup Card (Right) */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transform md:rotate-y-6 md:-rotate-z-2 transition-transform hover:rotate-0 duration-500 h-80 flex flex-col relative group">
           <div className="h-8 border-b border-slate-100 flex items-center px-4 justify-between bg-slate-50">
             <div className="text-[10px] text-slate-500 font-mono font-medium flex items-center gap-2">
                <Code className="w-3 h-3" /> Dashboard.tsx
             </div>
             <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm">
                <Copy className="w-3 h-3" /> Copy
             </button>
          </div>
          <div className="p-6 flex-1 bg-slate-50/50 font-mono text-[11px] leading-relaxed overflow-hidden text-slate-600">
            <div><span className="text-purple-600">export const</span> <span className="text-blue-600">Dashboard</span> = () =&gt; {'{'}</div>
            <div className="pl-4 mt-2">
              <span className="text-purple-600">return</span> (
            </div>
            <div className="pl-8 text-slate-500">
               &lt;<span className="text-blue-500">div</span> <span className="text-teal-600">className</span>=<span className="text-amber-600">"min-h-screen bg-slate-900 p-6"</span>&gt;<br/>
               &nbsp;&nbsp;&lt;<span className="text-blue-500">header</span> <span className="text-teal-600">className</span>=<span className="text-amber-600">"flex justify-between"</span>&gt;<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-500">h1</span> <span className="text-teal-600">className</span>=<span className="text-amber-600">"text-white font-bold"</span>&gt;Overview&lt;/<span className="text-blue-500">h1</span>&gt;<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-500">UserAvatar</span> /&gt;<br/>
               &nbsp;&nbsp;&lt;/<span className="text-blue-500">header</span>&gt;<br/>
               &nbsp;&nbsp;&lt;<span className="text-blue-500">div</span> <span className="text-teal-600">className</span>=<span className="text-amber-600">"grid grid-cols-3 gap-4 mt-6"</span>&gt;<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-500">StatCard</span> <span className="text-teal-600">title</span>=<span className="text-amber-600">"Revenue"</span> <span className="text-teal-600">value</span>=<span className="text-amber-600">"$14k"</span> <span className="text-teal-600">trend</span>=<span className="text-amber-600">"+12%"</span> /&gt;<br/>
               &nbsp;&nbsp;&lt;/<span className="text-blue-500">div</span>&gt;<br/>
               &lt;/<span className="text-blue-500">div</span>&gt;
            </div>
            <div className="pl-4">);</div>
            <div>{'}'};</div>
          </div>
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur text-[10px] text-green-600 px-2 py-1 rounded border border-green-100 flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3 h-3" /> React (Tailwind)
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ExportFeatures = () => {
  const features = [
    {
      title: "React Native",
      icon: <Smartphone className="w-6 h-6 text-blue-600" />,
      badge: "Stylesheet + Flexbox",
      desc: "Clean mobile targets for iOS & Android. Generates typed props, SafeAreaView boundaries, and responsive Flexbox alignments."
    },
    {
      title: "React.js",
      icon: <Code className="w-6 h-6 text-blue-600" />,
      badge: "Tailwind CSS 3.4",
      desc: "Next.js app router compatible JSX markup with utility-first Tailwind classes, semantic DOM nodes, and strict TypeScript types."
    },
    {
      title: "Flutter",
      icon: <Layout className="w-6 h-6 text-blue-600" />,
      badge: "Dart 3.0 Widgets",
      desc: "Widget trees with clean nesting constraints, EdgeInsets geometry, BoxDecoration styling, and Material 3 design tokens."
    }
  ];

  return (
    <section id="frameworks" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">Export Production-Ready Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-blue-50 p-3 rounded-xl">
                  {feature.icon}
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                {feature.desc}
              </p>
              <div className="mt-auto flex justify-end">
                <ArrowRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSteps = () => {
  const steps = [
    {
      num: "01",
      title: "Upload Design",
      icon: <UploadCloud className="w-5 h-5 text-blue-600" />,
      desc: "Upload your UI screenshot or mockups directly via drag & drop, clipboard paste, or file upload."
    },
    {
      num: "02",
      title: "AI Analysis",
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      desc: "AI identifies components, layout hierarchies, padding values, typography, and precise design tokens."
    },
    {
      num: "03",
      title: "Generate Code",
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      desc: "Instantly synthesize production-ready syntax in React, React Native, or Flutter with clean component composition."
    },
    {
      num: "04",
      title: "Refine & Compare",
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      desc: "Evaluate visual similarity score and iterate in real-time with conversational AI prompt adjustments."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">From Raw Pixels to Pure Code in Seconds</h2>
          <p className="text-slate-500 text-lg">
            Our specialized vision-transformer breaks down UI screenshots into logical semantic trees and generates deterministic, readable syntax.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-bold text-blue-200">{step.num}</span>
                <div className="bg-blue-50 p-2.5 rounded-xl">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-24 px-6 bg-slate-50">
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl p-10 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            No signup hurdles. <br/> No credit cards. <br/> No waiting.
          </h2>
          <p className="text-slate-500 text-lg mb-6">
            Every conversion executes inside an ephemeral high-memory runner. Paste any screen from Figma, Dribbble, or iOS simulator and receive deterministic code within half a second.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium font-mono">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> ZERO DEPENDENCIES</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> PRODUCTION READY CODE</span>
          </div>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <Link
            to="/create"
            className="w-full md:w-auto flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-600/20 text-lg"
          >
            Start Creating Now
            <Code className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-slate-200 bg-slate-50 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
        <img src="/logo.png" alt="UIForge AI Logo" className="h-9 w-auto object-contain" />
      </Link>
      <div className="text-slate-400 text-sm">
        © 2026 UIForge AI. Built for the developer community.
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      <main>
        <Hero />
        <ExportFeatures />
        <ProcessSteps />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}