import React from 'react';

const brands = [
  "Coromandel", "Bayer", "Dharmaj", "UPL", "Swal", "FMC", "Sumitomo", 
  "Megmani", "Sulphur Mills", "IGL", "Privi", "Margo", "Dhanuka", "Adama"
];

const BrandMarquee = ({ title, desc }: { title: string, desc: string }) => {
  return (
    <section className="py-16 bg-emerald-900 text-white overflow-hidden">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-emerald-200">{desc}</p>
      </div>
      
      {/* Infinite Scroll Container */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-8 py-4">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span key={i} className="text-2xl font-bold text-emerald-100/50 hover:text-white transition-colors cursor-default px-4">
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Add this style for animation if not in Tailwind config */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default BrandMarquee;