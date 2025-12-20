'use client';

import React from 'react';

// Layout Imports (Reusing your existing components)
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

// The new content component we just made
import ContactDripContent from '@/components/drip/ContactDripContent';

export default function ContactDripPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 1. Header Stack */}
      <TopBar />
      <Header />
      <NavBar />

      {/* 2. Main Page Content */}
      <main>
        <ContactDripContent />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}