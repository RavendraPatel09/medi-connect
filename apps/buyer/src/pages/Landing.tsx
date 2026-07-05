import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@medicycle/ui";
import { gsap } from "gsap";
import { ArrowRight, Pill, ShieldCheck, Leaf } from "lucide-react";
import Hero3D from "../components/Hero3D";

const Landing = () => {
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.4"
      );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Hero3D />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow-primary">
            <Pill className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            MediCycle
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#trust" className="hover:text-white transition-colors">Trust & Safety</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md">
            <ShieldCheck size={16} className="text-success" />
            <span>Verified and safe medicine resale marketplace</span>
          </div>
          
          <h1 
            ref={headlineRef}
            className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            Don't let good <br />
            <span className="text-gradient">medicine</span> go to waste.
          </h1>
          
          <p 
            ref={subtitleRef}
            className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl"
          >
            Buy and sell unused, unexpired medicines safely. Join the revolution in reducing medical waste while making healthcare more affordable.
          </p>
          
          <div ref={ctaRef} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" rightIcon={<ArrowRight size={18} />}>
              Start Buying
            </Button>
            <Button size="lg" variant="glass" leftIcon={<Leaf size={18} />}>
              Become a Seller
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
