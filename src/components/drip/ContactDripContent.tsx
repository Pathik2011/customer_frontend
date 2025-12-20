'use client';

import React from 'react';
import { MapPin, Phone, Mail, User, CheckCircle, ArrowRight } from 'lucide-react';

const ContactDripContent = () => {
  return (
    <div className="w-full bg-white font-jakarta">
      
      {/* --- SECTION 1: HERO & INTRO --- */}
      <section className="relative bg-[#013220] text-white py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Complete Irrigation Solutions
              <span className="block text-emerald-400 text-2xl md:text-3xl mt-2 font-medium">
                Partnering with Jain Irrigation Systems Ltd.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Empowering farmers since 2007. As an authorized partner, we bring world-class Drip & Sprinkler technology to your fields, ensuring "More Crop Per Drop" for every farmer.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <CheckCircle size={18} className="text-emerald-400" />
                <span className="text-sm font-medium">17+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <CheckCircle size={18} className="text-emerald-400" />
                <span className="text-sm font-medium">Authorized Dealer</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-900/40 to-transparent pointer-events-none" />
      </section>


      {/* --- SECTION 2: PROJECT SHOWCASE --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-sm font-bold text-emerald-600 tracking-wider uppercase mb-2">Our Success Stories</h2>
            <h3 className="text-3xl font-bold text-gray-900">Featured Project</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            {/* Left Content */}
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Jantral - Vijapur Farm Project</h4>
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full w-fit mb-6">
                Large-Scale Private Farm
              </span>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                A benchmark project demonstrating our capability to handle extensive private agricultural land. We transformed this large personal farm into a model of modern, water-efficient agriculture.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-emerald-500" />
                  <p className="text-sm text-gray-700"><strong>Scope:</strong> Complete topography survey & complex pipeline network design tailored to terrain.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-emerald-500" />
                  <p className="text-sm text-gray-700"><strong>Execution:</strong> Installation of advanced Jain Irrigation systems for uniform water distribution.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-emerald-500" />
                  <p className="text-sm text-gray-700"><strong>Result:</strong> Maximum yield with optimized water usage across the entire estate.</p>
                </li>
              </ul>
            </div>

            {/* Right Image/Placeholder Area */}
            {/* NOTE: You can replace the src below with an actual image of the Vijapur project if you have one */}
            <div className="md:w-1/2 bg-gray-200 min-h-[300px] relative">
               <img 
                 src="\Home\Dripping\2.jpg" 
                 alt="Vijapur Irrigation Project" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </section>


      {/* --- SECTION 3: MAP & CONTACT DETAILS --- */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <p className="text-gray-600 mb-8">
                  Ready to upgrade your farm? Contact us for a consultation or visit our office.
                </p>
              </div>

              <div className="space-y-6">
                {/* Contact Person */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <User size={20} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">Contact Person</p>
                    <p className="text-gray-900 font-semibold">Sapana Fertiizers</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">Phone Number</p>
                    <a href="tel:+919898929874" className="text-gray-900 font-semibold hover:text-emerald-600 transition-colors">
                      +91 98989 29874 , +91 9998198083
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">Email Address</p>
                    <a href="mailto: Sapana95@yahoo.co.in" className="text-gray-900 font-semibold hover:text-emerald-600 transition-colors">
                      Sapana95@yahoo.co.in
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">Office Address</p>
                    <p className="text-gray-900 font-medium leading-relaxed">
                      Sapana fertilizers , Near vinay kishan Petrol Pump, Ta & Dist : Gandhianagar<br />
                       Gujarat, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-2 h-full min-h-[400px] rounded-2xl overflow-hidden shadow-md border border-gray-200 relative group">
              {/* NOTE: Replace the 'src' in the iframe below with your actual Google Maps Embed Link.
                  1. Go to Google Maps -> Share -> Embed a map -> Copy HTML -> Extract the 'src' URL.
              */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.335079778723!2d72.77838407604284!3d23.33987190441149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395dd2155430750d%3A0xe07a0a8c8082809e!2sSapana%20Fertilizers!5e0!3m2!1sen!2sca!4v1766252134518!5m2!1sen!2sca" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              ></iframe>

              {/* Get Directions Button Overlay */}
              <div className="absolute bottom-6 right-6">
                <a 
                  href="https://maps.app.goo.gl/XTdTuGwX67PK6cfy9" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transform hover:-translate-y-1 transition-all"
                >
                  <MapPin size={20} />
                  Get Directions
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactDripContent;