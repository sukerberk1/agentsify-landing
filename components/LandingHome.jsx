import { useState, useEffect } from "react";
import ParticlesContainer from "./ParticlesContainer";
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

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
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
                <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">

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

                        <div className="absolute right-32 top-48 w-96 h-96 z-20 animate-float">
                            <img
                                src="/chatbot.jpg"
                                alt="AI Chatbot Assistant"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                        <div className="w-full xl:w-[1250px] h-[100vh] absolute right-0 top-0 pointer-events-none">
                            <div className="w-full h-full">
                                <ParticlesContainer />
                            </div>
                        </div>
                    </div>

                    <div className="xl:hidden relative min-h-screen-mobile">
                        <div className="absolute inset-0 opacity-30">
                            <ParticlesContainer />
                        </div>

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
