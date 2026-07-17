import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Telemedicine } from "@/components/site/Telemedicine";
import { Trust } from "@/components/site/Trust";
import { Services } from "@/components/site/Services";
import { Plans } from "@/components/site/Plans";
import { Emotional } from "@/components/site/Emotional";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Servicios Médicos MB — Atención médica premium a domicilio en Santiago" },
      { name: "description", content: "Médico a domicilio, enfermería, cuidadoras y atención integral del adulto mayor en la Región Metropolitana. Atención 24/7." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Telemedicine />
        <Trust />
        <Services />
        <Plans />
        <Emotional />
        <HowItWorks />
        <Testimonials />
        <Gallery />
        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
