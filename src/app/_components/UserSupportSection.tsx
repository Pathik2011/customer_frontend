"use client";

export default function UserSupportSection() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Support Banner */}
                <div className="relative rounded-3xl overflow-hidden flex items-center justify-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[400px]">
                    {/* Mobile Background - Optimized for 393x523 aspect ratio */}
                    <div
                        className="absolute inset-0 lg:hidden"
                        style={{
                            backgroundImage: "url('/images/Frame_mobile.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    ></div>

                    {/* Desktop Background */}
                    <div
                        className="absolute inset-0 hidden lg:block"
                        style={{
                            backgroundImage: "url('/images/Frame.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    ></div>

                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-md mx-auto lg:max-w-none">
                        {/* Main Heading */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 lg:mb-12 leading-tight">
                            If you have any questions?
                        </h2>

                        {/* Contact Button */}
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg transition-colors duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl">
                            Contact Us
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Decorative Elements - Optional ornamental patterns */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 opacity-30">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                            <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                                <path d="M20,20 Q30,10 40,20 Q50,30 40,40 Q30,50 20,40 Q10,30 20,20 Z" opacity="0.3" />
                                <path d="M60,60 Q70,50 80,60 Q90,70 80,80 Q70,90 60,80 Q50,70 60,60 Z" opacity="0.2" />
                            </svg>
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 opacity-30">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                            <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                                <path d="M15,15 Q25,5 35,15 Q45,25 35,35 Q25,45 15,35 Q5,25 15,15 Z" opacity="0.2" />
                                <path d="M55,25 Q65,15 75,25 Q85,35 75,45 Q65,55 55,45 Q45,35 55,25 Z" opacity="0.3" />
                                <path d="M25,65 Q35,55 45,65 Q55,75 45,85 Q35,95 25,85 Q15,75 25,65 Z" opacity="0.2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}