import React from 'react';
import { MapPin } from 'lucide-react';

interface MapWidgetProps {
  mapSrc?: string;      // The embed link for the iframe
  directionLink?: string; // The link for the 'Get Directions' button
  className?: string;   // To add extra styles if needed
}

const MapWidget: React.FC<MapWidgetProps> = ({ 
  // Default to your main store location if no props are passed
  mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.335079778723!2d72.77838407604284!3d23.33987190441149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395dd2155430750d%3A0xe07a0a8c8082809e!2sSapana%20Fertilizers!5e0!3m2!1sen!2sca!4v1766252134518!5m2!1sen!2sca" ,
  directionLink = "https://maps.app.goo.gl/XTdTuGwX67PK6cfy9",
  className = ""
}) => {
  return (
    <div className={`h-full min-h-[400px] rounded-2xl overflow-hidden shadow-md border border-gray-200 relative group ${className}`}>
      {/* Map Iframe */}
      <iframe 
        src={mapSrc}
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
        title="Sapana Fertilizers Location"
      ></iframe>

      {/* Floating 'Get Directions' Button */}
      <div className="absolute bottom-6 right-6">
        <a 
          href={directionLink}
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transform hover:-translate-y-1 transition-all"
        >
          <MapPin size={20} />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
};

export default MapWidget;