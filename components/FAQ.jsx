import { useState } from "react";
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { t, i18n, ready } = useTranslation('common');
    const faqData = t('faqData', { returnObjects: true });
    const router = useRouter();
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <section
            className="relative bg-black pt-16 pb-20 px-4 md:px-8 lg:px-16 bg-cover bg-center font-inter"
            style={{ backgroundImage: "url('/faq-bg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
            <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-center text-4xl md:text-4xl font-semibold mb-16 text-white tracking-tight">
                    {t('faqtitletext')} {' '}
                    <span className="text-white">{t('faqtitletext2')}</span>
                </h2>

                <div className="space-y-4 mb-20">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl 
                                transition-all duration-300 ease-in-out backdrop-blur-sm
                                hover:bg-opacity-8 hover:border-opacity-20 hover:-translate-y-0.5 
                                hover:shadow-xl hover:shadow-black hover:shadow-opacity-30`}
                        >
                            <button
                                className={`w-full bg-transparent border-none text-white text-xl font-medium 
                                    py-6 px-7 text-left cursor-pointer flex justify-between items-center 
                                    transition-colors duration-300 focus:outline-none
                                    ${activeIndex === index ? 'text-green-400' : 'hover:text-green-400'}`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span
                                    className={`text-2xl font-light text-green-400 transition-transform duration-300
                                        ${activeIndex === index ? 'rotate-45' : 'rotate-0'}`}
                                >
                                    +
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out
                                    ${activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-7 pb-7 text-white text-opacity-80 text-base leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative overflow-hidden rounded-2xl max-w-6xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center px-8 py-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {t('starttitle')}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-4xl mx-auto">
                            {t('startpara')}
                        </p>
                        <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                            onClick={() => {
                                const currentLang = i18n.language?.toLowerCase() || 'en';
                                const isUkrainian = currentLang.includes('ua') || currentLang.includes('uk');
                                const path = isUkrainian ? '/ua/contactus' : '/contactus';
                                router.push(path);
                            }}>
                            {t('tryagentsifybutton')}
                            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default FAQ;
