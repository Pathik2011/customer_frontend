'use client';

import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Sprout, Tractor, Leaf } from 'lucide-react';
import { translations } from '@/data/aboutUsData'; // Import the data file

// Mock imports for your existing structure - Replace these with your actual imports
import ContactSection from '@/components/shared/ContactSection';
import Topbar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

// Widget Imports
import StatsCounter from '@/components/aboutus/StatsCounter';
import BrandMarquee from '@/components/aboutus/BrandMarquee';

export default function AboutUsPage() {
  const [lang, setLang] = useState<'en' | 'gu'>('en');
  const t = translations[lang];

  return (
    <div className="bg-white min-h-screen font-sans">
      <Topbar />
      <Header />
      <Navbar />

      <main>
        {/* --- LANGUAGE TOGGLE & HERO --- */}
        <section className="relative py-20 bg-gradient-to-b from-emerald-50 to-white">
          
          {/* Floating Language Switcher */}
          <div className="absolute top-6 right-4 md:right-10 z-10">
            <div className="bg-white p-1 rounded-full shadow-md border border-emerald-100 flex">
              <button 
                onClick={() => setLang('en')}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'en' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLang('gu')}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'gu' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                ગુજરાતી
              </button>
            </div>
          </div>

          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Text Content */}
              <div className="space-y-6">
                <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-semibold">
                  {t.hero.est}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  {t.hero.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t.hero.subtitle}
                </p>
                
                {/* Stats Widget Row */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                   {/* Logic to pass end number based on stat */}
                   <div className="text-center">
                      <p className="text-3xl font-bold text-emerald-600">1000+</p>
                      <p className="text-xs text-gray-500 uppercase font-bold mt-1">{t.stats.farmers}</p>
                   </div>
                   <div className="text-center border-l border-gray-200">
                      <p className="text-3xl font-bold text-emerald-600">20k+</p>
                      <p className="text-xs text-gray-500 uppercase font-bold mt-1">{t.stats.orders}</p>
                   </div>
                   <div className="text-center border-l border-gray-200">
                      <p className="text-3xl font-bold text-emerald-600">28+</p>
                      <p className="text-xs text-gray-500 uppercase font-bold mt-1">{t.stats.experience}</p>
                   </div>
                </div>
              </div>

              {/* Attractive Image Card */}
              <div className="relative">
                <div className="bg-emerald-600 rounded-3xl p-2 rotate-2 shadow-xl">
                  {/* Replace src with actual image */}
                  <img 
                    src="/about-us/Shop.png" 
                    alt="Sapana Fertilizers Store" 
                    className="w-full h-auto rounded-2xl bg-white -rotate-2 object-cover aspect-[4/3] border-4 border-white"
                  />
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-yellow-900 p-4 rounded-xl shadow-lg font-bold">
                   100% Genuine Products
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- HISTORY & EXPERTISE --- */}
        <section className="py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              {/* History Column */}
              <div className="prose prose-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                  {t.history.title}
                </h3>
                <p className="text-gray-600">{t.history.p1}</p>
                <p className="text-gray-600">{t.history.p2}</p>
              </div>

              {/* Expertise Cards Column */}
              <div className="grid gap-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                   <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                   {t.expertise.title}
                </h3>
                {t.expertise.cards.map((card, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors border border-gray-100 hover:border-emerald-200">
                    <div className="p-3 bg-white rounded-lg shadow-sm text-emerald-600">
                      {idx === 0 && <Tractor size={24} />}
                      {idx === 1 && <Sprout size={24} />}
                      {idx === 2 && <Leaf size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{card.title}</h4>
                      <p className="text-sm text-gray-600">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* --- BRAND MARQUEE --- */}
        <BrandMarquee title={t.brands.title} desc={t.brands.desc} />

        {/* --- CONTACT SECTION --- */}
        {/* ✅ This ONE LINE replaces 100+ lines of code */}
        <ContactSection content={t.contact} />
    

      </main>
      <Footer />
    </div>
  );
}