import React from 'react';
import { User, Phone, Mail, MapPin } from 'lucide-react';
import MapWidget from './MapWidget'; // Import the MapWidget we just made

// Define the shape of the data this component needs
interface ContactSectionProps {
  content: {
    title: string;
    desc: string;
    person: string;
    phone: string;
    email: string;
    address_title: string;
    address: string;
    direction_btn: string;
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({ content }) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* --- LEFT COLUMN: Contact Details --- */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{content.title}</h3>
              <p className="text-gray-600 mb-8">{content.desc}</p>
            </div>

            <div className="space-y-6">
              {/* Person */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <User size={20} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">{content.person}</p>
                  <p className="text-gray-900 font-semibold">Sapana Fertilizers</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">{content.phone}</p>
                  <div className="flex flex-col">
                    <a href="tel:+919898929874" className="text-gray-900 font-semibold hover:text-emerald-600 transition-colors">
                      +91 98989 29874
                    </a>
                    <a href="tel:+919998198083" className="text-gray-900 font-semibold hover:text-emerald-600 transition-colors">
                      +91 99981 98083
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">{content.email}</p>
                  <a href="mailto:Sapana95@yahoo.co.in" className="text-gray-900 font-semibold hover:text-emerald-600 transition-colors">
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
                  <p className="text-xs text-gray-500 font-medium uppercase">{content.address_title}</p>
                  <p className="text-gray-900 font-medium leading-relaxed">
                    {content.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Map Widget --- */}
          <div className="lg:col-span-2">
             {/* We use the shared MapWidget here */}
             <MapWidget />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;