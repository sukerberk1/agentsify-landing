import { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';

const customStyles = `
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-gradient-shift {
    animation: gradient-shift 3s ease-in-out infinite;
  }

  @keyframes wave {
    0% { 
      transform: translateY(-15px) translateX(0px) rotate(0deg);
    }
    25% { 
      transform: translateY(0px) translateX(10px) rotate(1deg);
    }
    50% { 
      transform: translateY(15px) translateX(0px) rotate(0deg);
    }
    75% { 
      transform: translateY(0px) translateX(-10px) rotate(-1deg);
    }
    100% { 
      transform: translateY(-15px) translateX(0px) rotate(0deg);
    }
  }

  .wavy-animation {
    animation: wave 4s ease-in-out infinite;
  }

  .wavy-animation:hover {
    animation-play-state: paused;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .float-animation {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
    50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
    100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
  }

  .pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes sailing {
    0% { transform: translateX(-50px) translateY(0px) rotate(-2deg); }
    50% { transform: translateX(50px) translateY(-20px) rotate(2deg); }
    100% { transform: translateX(-50px) translateY(0px) rotate(-2deg); }
  }

  .sailing-animation {
    animation: sailing 6s ease-in-out infinite;
  }

  @keyframes data-flow {
    0% { transform: translateY(0px) opacity(0.3); }
    50% { transform: translateY(-100px) opacity(1); }
    100% { transform: translateY(-200px) opacity(0); }
  }

  .data-flow {
    animation: data-flow 3s ease-out infinite;
  }

  @keyframes lighthouse-beam {
    0% { transform: rotate(0deg); opacity: 0.3; }
    50% { transform: rotate(180deg); opacity: 0.8; }
    100% { transform: rotate(360deg); opacity: 0.3; }
  }

  .lighthouse-beam {
    animation: lighthouse-beam 8s linear infinite;
  }

  @keyframes slide-in-left {
    0% { transform: translateX(-100px) translateY(0px) rotate(-5deg); opacity: 0; }
    50% { transform: translateX(10px) translateY(-10px) rotate(2deg); opacity: 1; }
    100% { transform: translateX(0px) translateY(0px) rotate(0deg); opacity: 1; }
  }

  .slide-in-left {
    animation: slide-in-left 4s ease-in-out infinite;
  }

  @keyframes slide-in-right {
    0% { transform: translateX(100px) translateY(0px) rotate(5deg); opacity: 0; }
    50% { transform: translateX(-10px) translateY(-10px) rotate(-2deg); opacity: 1; }
    100% { transform: translateX(0px) translateY(0px) rotate(0deg); opacity: 1; }
  }

  .slide-in-right {
    animation: slide-in-right 4s ease-in-out infinite;
  }

  @keyframes rotate-scale {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(5deg) scale(1.05); }
    50% { transform: rotate(0deg) scale(1); }
    75% { transform: rotate(-5deg) scale(0.95); }
    100% { transform: rotate(0deg) scale(1); }
  }

  .rotate-scale {
    animation: rotate-scale 5s ease-in-out infinite;
  }

  @keyframes bounce-gentle {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }

  .bounce-gentle {
    animation: bounce-gentle 2.5s ease-in-out infinite;
  }

  .min-h-screen-mobile {
    min-height: 100vh;
    min-height: 100dvh; 
  }

  .text-responsive {
    word-break: break-word;
    hyphens: auto;
  }

  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }

  .gradient-transition-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
    z-index: 5;
    pointer-events: none;
  }

  .curve-background {
    background-image: url('/curve.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
  }

  .floating-image {
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
    border: 3px solid rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 1279px) {
    .mobile-hero-container {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    
    .mobile-text-sizing {
      font-size: clamp(1.5rem, 8vw, 3rem);
      line-height: 1.2;
    }
    
    .mobile-button-sizing {
      padding: 0.875rem 1.5rem;
      font-size: 0.875rem;
    }
    
    @media (min-width: 480px) {
      .mobile-button-sizing {
        padding: 1rem 2rem;
        font-size: 1rem;
      }
    }
  }
`;

const LandingHome = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isMounted, setIsMounted] = useState(false);
  const { t, i18n, ready } = useTranslation('common');

  const textArray = [
    t('hero section.taglines.efficiency'),
    t('hero section.taglines.enterprise'),
    t('hero section.taglines.goals')
  ];

  const longestText = textArray.reduce((a, b) => a.length > b.length ? a : b);

  useEffect(() => {
    setIsMounted(true);
    setDisplayText(textArray[0]);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleTyping = () => {
      const currentFullText = textArray[currentTextIndex];

      if (isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        setTypingSpeed(75);
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, typingSpeed, textArray, isMounted]);

  const displayTextContent = isMounted ? displayText : textArray[0];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="bg-primary/60 relative min-h-screen-mobile overflow-hidden -mb-2">

        <div className="absolute inset-0 curve-background"></div>

        <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10 relative z-10">

          <div className="hidden xl:block">
            <div className="text-center flex flex-col justify-center xl:pt-16 xl:text-left h-screen xl:ml-20 xl:mr-0">

              <div className="flex items-center justify-center xl:justify-start mb-8 relative z-10 px-4 xl:px-0">
                <div className="flex items-center gap-3">
                  <i className="bi bi-check2-circle text-lg text-gray-400"></i>
                  <span className="text-gray-400 font-medium uppercase tracking-wide text-sm">
                    {t("hero section.badgeText").split(' ').join('\u00A0\u00A0')}&nbsp;<strong className="text-gray-400">{t("hero section.businessCount")}&nbsp;
                    </strong>{t("hero section.businessSuffix").split(' ').join('\u00A0\u00A0')}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl xl:text-4xl font-bold text-white relative z-10 px-4 xl:px-0 xl:pr-64 leading-snug text-responsive mb-8">
                {t("hero section.headlinePrefix").split(' ').join('\u00A0\u00A0')}
                <br />
                {t("hero section.headlineMiddle").split(' ').join('\u00A0\u00A0')}
                <br />
                <span className="text-accent inline-block min-w-fit">
                  <span
                    className="inline-block"
                    style={{ minWidth: `${longestText.length + 1}ch` }}
                  >
                    {displayTextContent}
                    {isMounted && <span className="animate-pulse">|</span>}
                  </span>
                </span>
              </h1>

              <p className="text-lg text-gray-300 max-w-sm xl:max-w-2xl mx-auto xl:mx-0 mb-10 relative z-10 px-4 xl:px-0 leading-relaxed">
                {t("hero section.homepara").split(' ').join('\u00A0\u00A0')}
              </p>

              <div className="flex justify-center xl:justify-start relative z-10 px-4 xl:px-0">
                <button className="relative inline-flex items-center justify-center px-10 py-4 font-semibold text-white rounded-full overflow-hidden group touch-target transition-transform hover:scale-105"
                  onClick={() => window.location.href = `${i18n.language === 'en' ? '' : '/' + i18n.language}/services`}>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r
                        from-purple-500 via-pink-500 via-red-500 via-orange-500
                        via-yellow-500 via-green-500 via-blue-500 via-indigo-500
                        to-purple-500 animate-gradient-shift bg-[length:200%_200%]">
                  </span>
                  <span className="absolute inset-0 rounded-full blur-sm opacity-75
                        bg-gradient-to-r
                        from-purple-500 via-pink-500 via-red-500 via-orange-500
                        via-yellow-500 via-green-500 via-blue-500 via-indigo-500
                        to-purple-500 animate-gradient-shift bg-[length:200%_200%]">
                  </span>
                  <span className="relative z-10 text-lg">
                    {t("hero section.exploreAIServices").split(' ').join('\u00A0\u00A0')}
                  </span>
                </button>
              </div>
            </div>

            <div className="absolute right-32 top-48 w-96 h-96 z-20">
              <div className="relative w-full h-full">

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sailing-animation">
                  <div className="relative">


                  </div>
                </div>

                {/* Enhanced Original Floating Info Cards */}
                {/* <div className="absolute -top-5 -left-5 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-slate-600/30 shadow-2xl float-animation hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse group-hover:bg-red-400"></div>
                    <div className="text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors">Navigating</div>
                  </div>
                  <div className="text-white text-xs mt-1 group-hover:text-gray-200 transition-colors">Solutions</div>
                </div> */}

                <div className="absolute -bottom-5 -right-5 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-slate-600/30 shadow-2xl float-animation hover:shadow-green-500/20 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse group-hover:bg-green-400"></div>
                    <div className="text-green-400 text-sm font-bold group-hover:text-green-300 transition-colors">Destination</div>
                  </div>
                  <div className="text-white text-xs mt-1 group-hover:text-gray-200 transition-colors">Business Success</div>
                </div>

                {/* Enhanced Additional Floating Cards with Unique Colors */}
                <div className="absolute -top-20 right-8 bg-gradient-to-br from-lime-500/90 to-lime-600/90 backdrop-blur-md rounded-2xl p-3 border border-lime-400/30 shadow-2xl slide-in-right hover:shadow-lime-500/40 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-lime-300 rounded-full animate-pulse group-hover:animate-bounce"></div>
                    <div className="text-white text-xs font-bold group-hover:text-lime-100 transition-colors">AI Agent</div>
                  </div>
                  <div className="text-lime-200 text-xs mt-1 group-hover:text-lime-100 transition-colors">Active</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 to-lime-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                <div className="absolute top-12 -right-20 bg-gradient-to-br from-yellow-500/90 to-yellow-600/90 backdrop-blur-md rounded-2xl p-3 border border-yellow-400/30 shadow-2xl bounce-gentle hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-lightbulb text-yellow-300 text-sm group-hover:text-yellow-200 transition-colors"></i>
                    <div className="text-white text-xs font-bold group-hover:text-yellow-100 transition-colors">Innovation</div>
                  </div>
                  <div className="text-yellow-200 text-xs mt-1 group-hover:text-yellow-100 transition-colors">Powered</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                <div className="absolute top-28 -left-20 bg-gradient-to-br from-sky-500/90 to-sky-600/90 backdrop-blur-md rounded-2xl p-3 border border-sky-400/30 shadow-2xl rotate-scale hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-graph-up text-sky-300 text-sm group-hover:text-sky-200 transition-colors"></i>
                    <div className="text-white text-xs font-bold group-hover:text-sky-100 transition-colors">Growth</div>
                  </div>
                  <div className="text-sky-200 text-xs mt-1 group-hover:text-sky-100 transition-colors">Accelerated</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-sky-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-20 -left-20 bg-gradient-to-br from-amber-700/90 to-lime-800/90 backdrop-blur-md rounded-2xl p-3 border border-stone-400/30 shadow-2xl slide-in-left hover:shadow-stone-500/40 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '2.5s' }}>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-shield-check text-stone-300 text-sm group-hover:text-stone-200 transition-colors"></i>
                    <div className="text-white text-xs font-bold group-hover:text-stone-100 transition-colors">Security</div>
                  </div>
                  <div className="text-stone-200 text-xs mt-1 group-hover:text-stone-100 transition-colors">Ensured</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-stone-400 to-stone-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                <div className="absolute top-6 left-12 bg-gradient-to-br from-slate-500/90 to-slate-600/90 backdrop-blur-md rounded-2xl p-3 border border-slate-400/30 shadow-2xl float-animation hover:shadow-slate-500/40 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '0.8s' }}>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-stars text-slate-300 text-sm group-hover:text-slate-200 transition-colors"></i>
                    <div className="text-white text-xs font-bold group-hover:text-slate-100 transition-colors">Analytics</div>
                  </div>
                  <div className="text-slate-200 text-xs mt-1 group-hover:text-slate-100 transition-colors">Enhanced</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-slate-400 to-slate-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                <div className="absolute top-40 right-12 bg-gradient-to-br from-blue-500/90 to-indigo-700/90 backdrop-blur-md rounded-2xl p-3 border border-gray-400/30 shadow-2xl slide-in-right hover:shadow-gray-500/40 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '2.2s' }}>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-gear text-gray-300 text-sm group-hover:text-gray-200 transition-colors"></i>
                    <div className="text-white text-xs font-bold group-hover:text-gray-100 transition-colors">Automation</div>
                  </div>
                  <div className="text-gray-200 text-xs mt-1 group-hover:text-gray-100 transition-colors">Smart</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-16 left-20 bg-gradient-to-br from-emerald-700/90 to-emerald-800/90 backdrop-blur-md rounded-2xl p-3 border border-emerald-600/30 shadow-2xl bounce-gentle hover:shadow-emerald-700/40 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '3.5s' }}>
                  <div className="flex items-center gap-4">
                    <i className="bi bi-speedometer2 text-emerald-400 text-sm group-hover:text-emerald-300 transition-colors"></i>
                    <div className="text-white text-xs font-bold group-hover:text-emerald-200 transition-colors">Speedy</div>
                  </div>
                  <div className="text-emerald-300 text-xs mt-1 group-hover:text-emerald-200 transition-colors">Implementation</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                <div className="absolute top-16 right-28 bg-gradient-to-br from-indigo-700/90 to-indigo-800/90 backdrop-blur-md rounded-2xl p-3 border border-indigo-600/30 shadow-2xl rotate-scale hover:shadow-indigo-700/40 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '4s' }}>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-check-circle text-indigo-400 text-sm group-hover:text-indigo-300 transition-colors"></i>
                    <div className="text-white text-xs font-bold group-hover:text-indigo-200 transition-colors">Validated</div>
                  </div>
                  <div className="text-indigo-300 text-xs mt-1 group-hover:text-indigo-200 transition-colors">Solutions</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-2 bg-gradient-to-br from-purple-700/90 to-purple-800/90 backdrop-blur-md rounded-2xl p-3 border border-purple-600/30 shadow-2xl slide-in-left hover:shadow-purple-700/40 hover:scale-105 transition-all duration-300 cursor-pointer group" style={{ animationDelay: '4.5s' }}>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-sun text-purple-400 text-sm group-hover:text-purple-300 transition-colors"></i>
                    <div className="text-white text-xs font-bold group-hover:text-purple-200 transition-colors">Insights</div>
                  </div>
                  <div className="text-purple-300 text-xs mt-1 group-hover:text-purple-200 transition-colors">Actionable</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

              </div>
            </div>

          </div>

          <div className="xl:hidden relative min-h-screen-mobile">
            <div className="relative z-10 min-h-screen-mobile flex flex-col justify-center mobile-hero-container">
              <div className="px-4 sm:px-6 md:px-8 max-w-4xl mx-auto w-full">

                <div className="flex items-center justify-center mb-1">
                  <div className="flex items-center gap-2 text-center">
                    <span className="text-gray-400 font-medium uppercase tracking-wide text-xs">
                      <i className="bi bi-check2-circle text-sm text-gray-400"></i>&nbsp;{t("hero section.badgeText")} <strong className="text-gray-400">{t("hero section.businessCount")}</strong> {t("hero section.businessSuffix")}
                    </span>
                  </div>
                </div>

                <h1 className="mobile-text-sizing font-bold text-white text-center mb-6 leading-tight">
                  {t("hero section.headlinePrefix")}
                  <br />
                  {t("hero section.headlineMiddle")}
                  <br />
                  <span className="text-accent block mt-2">
                    <span className="inline-block">
                      {displayTextContent}
                      {isMounted && <span className="animate-pulse">|</span>}
                    </span>
                  </span>
                </h1>

                <p className="text-gray-300 text-center max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-8">
                  {t("hero section.homepara")}
                </p>

                <div className="flex justify-center">
                  <button
                    className="relative inline-flex items-center justify-center mobile-button-sizing font-semibold text-white rounded-full overflow-hidden group touch-target transition-transform active:scale-95 hover:scale-105"
                    onClick={() => window.location.href = `${i18n.language === 'en' ? '' : '/' + i18n.language}/services`}
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r
                                            from-purple-500 via-pink-500 via-red-500 via-orange-500
                                            via-yellow-500 via-green-500 via-blue-500 via-indigo-500
                                            to-purple-500 animate-gradient-shift bg-[length:200%_200%]">
                    </span>
                    <span className="absolute inset-0 rounded-full blur-sm opacity-75
                                            bg-gradient-to-r
                                            from-purple-500 via-pink-500 via-red-500 via-orange-500
                                            via-yellow-500 via-green-500 via-blue-500 via-indigo-500
                                            to-purple-500 animate-gradient-shift bg-[length:200%_200%]">
                    </span>
                    <span className="relative z-10 whitespace-nowrap">
                      {t("hero section.exploreAIServices")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gradient-transition-overlay"></div>
      </div >
    </>
  );
};

export default LandingHome;
