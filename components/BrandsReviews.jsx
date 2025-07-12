import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

const BrandsReviews = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const { t, ready } = useTranslation('common');

    const texts = t('brands.aiHighlights', { returnObjects: true });

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                setIsTransitioning(false);
            }, 300);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        setTimeout(() => setIsVisible(true), 100);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { i18n } = useTranslation();

    const partners = [
        [
            { name: 'All Hands', logo: '/allhands.png' },
            { name: 'Anthropic', logo: './anthropic.png' },
            { name: 'Braintrust', logo: './braintrust.webp' },
            { name: 'Browserbase', logo: './browserbase.png' },
            { name: 'Cognition', logo: './cognition.png' },
            { name: 'Crew AI', logo: './crewai.png' }
        ],
        [
            { name: 'Fireworks AI', logo: './fireworksai.png' },
            { name: 'Gemini', logo: './gemini.png' },
            { name: 'Groq', logo: './groq.png' },
            { name: 'Harvey', logo: './harvey.png' },
            { name: 'Langfuse', logo: './langfuse.svg' },
            { name: 'LangGraph', logo: './langgraph.svg' }
        ],
        [
            { name: 'Letta', logo: './letta.png' },
            { name: 'MemGPT', logo: './memgpt.png' },
            { name: 'MultiOn', logo: './multion.png' },
            { name: 'Ollama', logo: './ollama.png' },
            { name: 'OpenAI', logo: './openai.png' },
            { name: 'Perplexity', logo: './perplexity.png' }
        ],
        [
            { name: 'Pinecone', logo: './pinecone.webp' },
            { name: 'Replit', logo: './replit.png' },
            { name: 'Sierra', logo: './sierra.png' },
            { name: 'Supabase', logo: './supabase.png' },
            { name: 'Together', logo: './together.png' },
            { name: 'Weaviate', logo: './weaviate.webp' }
        ]
    ];

    const floatingAnimation = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            50% { transform: translateY(-5px) rotate(-1deg); }
            75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
            50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.7); }
        }
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        .float { animation: float 6s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .shimmer { 
            background: linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #3b0764 100%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }
        .bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
    `;

    return (
        <>
            <style>{floatingAnimation}</style>
            <section
                className="relative text-gray-800 min-h-screen"
                style={{
                    backgroundImage: 'url("./brand.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div
                    className="absolute top-0 left-0 right-0 h-40 z-10"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 100%)'
                    }}
                />

                <div
                    className="absolute bottom-0 left-0 right-0 h-32 z-10"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)'
                    }}
                />

                <div className="absolute inset-0 overflow-hidden z-0" style={{ pointerEvents: 'none' }}>
                    <div
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"
                        style={{
                            animation: 'pulse 8s ease-in-out infinite',
                            animationDelay: '0s'
                        }}
                    />
                    <div
                        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse"
                        style={{
                            animation: 'pulse 8s ease-in-out infinite',
                            animationDelay: '4s'
                        }}
                    />
                    <div
                        className="absolute top-3/4 left-3/4 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-pulse"
                        style={{
                            animation: 'pulse 6s ease-in-out infinite',
                            animationDelay: '2s'
                        }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 w-48 h-48 bg-violet-400/15 rounded-full blur-3xl animate-pulse"
                        style={{
                            animation: 'pulse 10s ease-in-out infinite',
                            animationDelay: '6s'
                        }}
                    />
                </div>

                <div className="pt-24 pb-8 md:pb-12 lg:pb-20 px-4 max-w-6xl mx-auto text-center relative z-20">
                    <div className="mb-16">
                        <div className="relative h-32 md:h-40 flex items-center justify-center overflow-hidden">
                            <div
                                className={`transition-all duration-600 ease-in-out ${isTransitioning
                                    ? 'opacity-0 transform translate-y-4'
                                    : 'opacity-100 transform translate-y-0'
                                    }`}
                            >
                                <h2 className="text-3xl md:text-5xl font-bold">
                                    <span className="inline-block text-white">
                                        {texts[currentTextIndex]?.text}
                                    </span>{' '}
                                    <span
                                        className="text-white inline-block animate-pulse"
                                        style={{
                                            textShadow: '0 0 20px rgba(96, 165, 250, 0.6)'
                                        }}
                                    >
                                        {texts[currentTextIndex]?.highlight}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <p
                            className="text-xl max-w-3xl mx-auto leading-relaxed font-bold transition-all duration-1000 ease-out"
                            style={{
                                color: "#FFD86B",
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
                            }}
                        >
                            {t('brands.aiBrandspara')}
                        </p>
                    </div>

                    <div className="space-y-6 md:space-y-8 mb-20">
                        {partners.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="flex flex-wrap justify-center items-center gap-6 md:gap-8 transition-all duration-800 ease-out"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible
                                        ? 'translateX(0)'
                                        : rowIndex % 2 === 0
                                            ? 'translateX(-50px)'
                                            : 'translateX(50px)',
                                    transitionDelay: `${rowIndex * 200}ms`
                                }}
                            >
                                {row.map((partner, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center justify-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl min-h-[65px] w-[120px] sm:w-[140px] md:w-[160px]"
                                    >
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-[40px] max-w-[100px] object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-400"
                                            onError={(e) => {
                                                e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                                                <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="100" height="40" fill="#f3f4f6"/>
                                                    <text x="50" y="25" text-anchor="middle" font-family="Arial" font-size="12" fill="#6b7280">${partner.name}</text>
                                                </svg>
                                            `)}`;
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="max-w-6xl mx-auto text-center relative z-50 px-2 mt-8 md:mt-16 lg:mt-24">
                        <div className="relative mb-8">
                            <div
                                className={`absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col items-center transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                    }`}
                                style={{ transitionDelay: '200ms', pointerEvents: 'none' }}
                            >
                                <div className="relative group">
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 md:p-3 shadow-lg float opacity-90">
                                        <div className="text-center">
                                            <div className="text-sm md:text-lg font-bold text-white">10+</div>
                                            <div className="text-[8px] md:text-[10px] text-white">Partners</div>
                                        </div>
                                    </div>
                                    <div className="absolute -inset-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
                                </div>
                            </div>

                            <div
                                className={`absolute left-40 top-1/2 transform -translate-y-1/50 hidden lg:flex flex-col items-center transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                    }`}
                                style={{ transitionDelay: '200ms', pointerEvents: 'none' }}
                            >
                                <div
                                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 md:p-3 shadow-lg float opacity-90"
                                    style={{ animationDelay: '2s' }}>
                                    <div className="text-center">
                                        <div className="text-sm md:text-lg font-bold text-white">A★</div>
                                        <div className="text-[8px] md:text-[10px] text-white">Rating</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-5 left-[-70px] md:left-[-120px] hidden sm:block" style={{ pointerEvents: 'none' }}>
                                <div className="relative w-28 h-28">
                                    <div
                                        className="w-full h-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg float opacity-90"
                                        style={{ animationDelay: '2s' }}
                                    ></div>
                                    <div
                                        className="absolute -top-3 -left-3 w-16 h-16 bg-pink-400/20 border border-pink-500/30 rounded-full blur-sm animate-pulse"
                                        style={{ animationDuration: '4s' }}
                                    ></div>
                                </div>
                            </div>

                            <div className="absolute top-4 right-10 md:right-[-90px] hidden sm:block" style={{ pointerEvents: 'none' }}>
                                <div className="relative w-36 h-36">
                                    <div
                                        className="w-full h-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg float opacity-90"
                                        style={{ animationDelay: '2s' }}
                                    ></div>
                                    <div
                                        className="absolute -top-4 -right-4 w-20 h-20 bg-purple-400/20 border border-purple-500/30 rounded-full blur-sm animate-pulse"
                                        style={{ animationDuration: '4s' }}
                                    ></div>
                                </div>
                            </div>

                            <div
                                className="transition-all duration-1000 ease-out"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.75) translateY(12px)'
                                }}
                            >
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight relative px-4">
                                    <span className="inline-block">
                                        {t('partners.partnersheading')}
                                    </span>
                                    <span className="relative inline-block ml-2">
                                        <div
                                            className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-2 h-2 md:w-3 md:h-3 bg-violet-300 rounded-full opacity-80 animate-ping"
                                            style={{ animationDuration: '2s' }}
                                        />
                                        <div
                                            className="absolute -bottom-0.5 -left-0.5 md:-bottom-1 md:-left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-300 rounded-full opacity-60 animate-pulse"
                                            style={{ animationDuration: '3s' }}
                                        />
                                    </span>
                                </h2>
                            </div>

                            <div
                                className="mx-auto mt-3 h-1 bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-1000 ease-out"
                                style={{
                                    width: isVisible ? '80px' : '0px',
                                    opacity: isVisible ? 1 : 0,
                                    transitionDelay: '500ms'
                                }}
                            />
                        </div>

                        <div
                            className="mb-8 transition-all duration-1000 ease-out"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0)' : 'translateX(-12px)',
                                transitionDelay: '300ms'
                            }}
                        >
                            <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto leading-relaxed relative px-4">
                                {t('partners.partnerspara')}
                                <span
                                    className="absolute -top-2 -left-2 md:-top-4 md:-left-4 text-2xl md:text-4xl text-violet-300 opacity-30 md:opacity-50 transition-transform duration-6000 ease-in-out"
                                    style={{
                                        transform: isVisible ? 'translateY(0px) rotate(0deg)' : 'translateY(-10px) rotate(5deg)',
                                        animation: isVisible ? 'bounce 6s ease-in-out infinite' : 'none',
                                        pointerEvents: 'none'
                                    }}
                                >"</span>
                                <span
                                    className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 text-2xl md:text-4xl text-violet-300 opacity-30 md:opacity-50 transition-transform duration-6000 ease-in-out"
                                    style={{
                                        transform: isVisible ? 'translateY(0px) rotate(0deg)' : 'translateY(10px) rotate(-5deg)',
                                        animation: isVisible ? 'bounce 6s ease-in-out infinite 3s' : 'none',
                                        pointerEvents: 'none'
                                    }}
                                >"</span>
                            </p>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 transition-all duration-1000 ease-out relative z-50"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                                transitionDelay: '700ms'
                            }}
                        >
                            <div className="relative group">
                                <div
                                    className="absolute -inset-2 bg-gradient-to-r from-violet-400 via-purple-400 to-violet-300 rounded-full opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:duration-200"
                                    style={{ animation: 'pulse 3s ease-in-out infinite', pointerEvents: 'none' }}
                                />
                                <div
                                    className="absolute -inset-1 bg-gradient-to-r from-violet-400 via-purple-400 to-violet-300 rounded-full opacity-40 group-hover:opacity-80 blur-lg transition duration-300 group-hover:duration-200"
                                    style={{ pointerEvents: 'none' }}
                                />
                                <button
                                    className="relative bg-white/95 text-gray-800 px-6 py-3 md:px-8 md:py-3 rounded-full font-medium text-sm md:text-base hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-xl group-hover:shadow-2xl overflow-hidden backdrop-blur-sm cursor-pointer z-50"
                                    onClick={() => {
                                        const lang = i18n?.language || 'en';
                                        const path = `${lang === 'en' ? '' : '/' + lang}/contactus`;
                                        window.location.href = path;
                                    }}
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    <span className="relative z-10">
                                        {t('partners.buttonpartnerwithus')}
                                    </span>
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-violet-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </button>
                            </div>

                            <button
                                className="text-gray-100 font-medium text-sm md:text-base hover:text-white transition-all duration-300 px-4 py-3 relative group overflow-hidden transform hover:scale-105 hover:-translate-y-1 cursor-pointer z-50"
                                onMouseEnter={(e) => {
                                    e.target.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.textShadow = 'none';
                                }}
                                onClick={() => {
                                    const lang = i18n?.language || 'en';
                                    const path = `${lang === 'en' ? '' : '/' + lang}/casestudies`;
                                    window.location.href = path;
                                }}
                                style={{ pointerEvents: 'auto' }}
                            >
                                <span className="relative z-10">{t('partners.buttonViewAll')}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 z-20"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(30,0,60,0.6) 80%, rgba(0,0,0,0.9) 100%)',
                        pointerEvents: 'none'
                    }}
                ></div>
            </section >
        </>
    );
};

export default BrandsReviews;
