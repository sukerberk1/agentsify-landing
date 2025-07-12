import { useState, useEffect } from 'react';
import { FaCheckSquare } from "react-icons/fa";
import { BsFillXSquareFill } from "react-icons/bs";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Partnership = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t, i18n, ready } = useTranslation('common');
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const currentLang = i18n.language?.toLowerCase() || 'en';
        const isUkrainian = currentLang.includes('ua') || currentLang.includes('uk');
        const path = isUkrainian ? '/ua/contactus' : '/contactus';

        router.push(path).catch(error => {
            console.error('Navigation failed:', error);
            router.push('/contactus');
        });
    };

    return (
        <section className="py-16 flex items-center relative text-gray-900 px-6 lg:px-24 overflow-hidden">

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/partner-bg.jpg')`
                }}
            ></div>

            <div className="absolute inset-0"></div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
                    style={{
                        animation: 'float 6s ease-in-out infinite, pulse 4s ease-in-out infinite',
                        animationDelay: '0s'
                    }}></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-gray-300/10 rounded-full blur-3xl"
                    style={{
                        animation: 'float 8s ease-in-out infinite reverse, pulse 5s ease-in-out infinite',
                        animationDelay: '2s'
                    }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-3xl"
                    style={{
                        animation: 'rotate 20s linear infinite, pulse 6s ease-in-out infinite',
                        animationDelay: '1s'
                    }}></div>
            </div>

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center relative z-30 lg:ml-20">
                <div className={`space-y-6 lg:ml-12 transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                    }`}>
                    <h1 className="text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white text-glow"
                        style={{
                            animation: isVisible ? 'slideInLeft 0.8s ease-out 0.2s both, textGlow 3s ease-in-out infinite' : 'none'
                        }}>
                        {t('partnership.partnershipheading1')}{' '}
                        <span className="text-white relative inline-block"
                            style={{
                                animation: isVisible ? 'slideInLeft 0.8s ease-out 0.4s both, bounce 2s ease-in-out 2s infinite' : 'none'
                            }}>
                            {t('partnership.partnershipheading2')}
                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-teal-500"
                                style={{
                                    animation: isVisible ? 'expandWidth 1s ease-out 1s both' : 'none'
                                }}></div>
                        </span>{' '}
                        {t('partnership.partnershipheading3')}
                    </h1>

                    <p className={`text-base text-gray-200 max-w-xl leading-relaxed transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                        style={{ animationDelay: '0.6s' }}>
                        {t('partnership.partnershippara')}
                    </p>

                    <div className={`pt-4 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                        style={{ animationDelay: '0.8s' }}>
                        <div className="relative group inline-block">
                            <div className="absolute -inset-1 bg-gradient-to-r from-white rounded-xl opacity-75 group-hover:opacity-100 blur-sm transition duration-300 group-hover:duration-200 group-hover:animate-pulse"></div>

                            <button
                                className="relative bg-white hover:bg-white text-black px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl border border-fuchsia-500/50 backdrop-blur-sm group-hover:shadow-2xl"
                                style={{
                                    animation: isVisible ? 'buttonPulse 2s ease-in-out 1.5s infinite' : 'none',
                                    zIndex: 50,
                                    position: 'relative'
                                }}
                                onClick={handleButtonClick}
                            >
                                <span className="relative z-10">{t('partnership.partnershipbutton')} </span>
                            </button>
                        </div>
                    </div>

                </div>

                <div className={`space-y-10 lg:ml-8 transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                    }`}
                    style={{ animationDelay: '0.4s' }}>
                    <div className="space-y-5">
                        <h3 className="text-lg font-semibold text-teal-100"
                            style={{
                                animation: isVisible ? 'fadeInUp 0.8s ease-out 0.8s both' : 'none'
                            }}>
                            {t('partnership.partnershipRHSHeading')}
                        </h3>
                        <div className="space-y-3">
                            {[
                                t('partnership.AgentsifyPartnershipp1'),
                                t('partnership.AgentsifyPartnershipp2'),
                                t('partnership.AgentsifyPartnershipp3'),
                            ].map((benefit, i) => (
                                <div key={i}
                                    className="flex items-start gap-3 group hover:transform hover:translate-x-2 transition-all duration-300 cursor-pointer"
                                    style={{
                                        animation: isVisible ? `fadeInUp 0.6s ease-out ${1 + i * 0.2}s both` : 'none'
                                    }}>
                                    <div className="w-6 h-6 bg-teal-100 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-200 group-hover:scale-110 transition-all duration-300">
                                        <FaCheckSquare className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <span className="text-sm text-slate-300 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-lg font-semibold text-teal-100"
                            style={{
                                animation: isVisible ? 'fadeInUp 0.8s ease-out 1.4s both' : 'none'
                            }}>
                            {t('partnership.partnershipRHSHeading2')}
                        </h3>
                        <div className="space-y-3">
                            {[
                                t('partnership.NonParntershipp1'),
                                t('partnership.NonParntershipp2'),
                                t('partnership.NonParntershipp3'),
                            ].map((item, i) => (
                                <div key={i}
                                    className="flex items-start gap-3 group hover:transform hover:translate-x-2 transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100"
                                    style={{
                                        animation: isVisible ? `fadeInUp 0.6s ease-out ${1.6 + i * 0.2}s both` : 'none'
                                    }}>
                                    <div className="w-6 h-6 bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 group-hover:scale-110 transition-all duration-300">
                                        <BsFillXSquareFill className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <span className="text-sm text-slate-300 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-20px) translateX(10px); }
                    66% { transform: translateY(10px) translateX(-5px); }
                }
                
                @keyframes rotate {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                @keyframes slideInLeft {
                    from {
                        transform: translateX(-50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes expandWidth {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                
                @keyframes textGlow {
                    0%, 100% { text-shadow: 0 0 5px rgba(251, 146, 60, 0.3); }
                    50% { text-shadow: 0 0 20px rgba(251, 146, 60, 0.6), 0 0 30px rgba(251, 146, 60, 0.4); }
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-5px); }
                    60% { transform: translateY(-3px); }
                }
                
                @keyframes buttonPulse {
                    0%, 100% { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); }
                    50% { box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(20, 184, 166, 0.3); }
                }
            `}</style>
            <div className="absolute bottom-0 left-0 right-0 h-32 z-10"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(30,0,60,0.6) 80%, rgba(0,0,0,0.9) 100%)'
                }}
            ></div>
        </section>
    );
};

export default Partnership;
