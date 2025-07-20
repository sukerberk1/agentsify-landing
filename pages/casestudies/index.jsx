import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Award, X, Clock, CheckCircle, FileText, Zap, Shield } from 'lucide-react';
import Footer from '../../components/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { MdReportProblem } from "react-icons/md";

const CaseStudiesTab = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const { t, i18n, ready } = useTranslation('common');

  const iconMap = {
    Clock,
    Shield,
    Zap,
    FileText,
    CheckCircle
  };

  useEffect(() => {
    if (ready && !activeFilter) {
      setActiveFilter('all');
    }
  }, [ready, activeFilter]);


  const caseStudies = ready ? t('casestudiestab.caseStudiestiles', { returnObjects: true }) : [];
  const filters = ready ? t('casestudiestab.filters', { returnObjects: true }) : [];
  const ctaData = ready ? t('casestudiestab.cta', { returnObjects: true }) : {};
  const modalData = ready ? t('casestudiestab.modal', { returnObjects: true }) : {};


  const safeCaseStudies = Array.isArray(caseStudies) ? caseStudies : [];
  const safeFilters = Array.isArray(filters) ? filters : [];


  useEffect(() => {
    if (ready) {
      console.log('Current language:', i18n.language);
      console.log('Translation ready:', ready);
      console.log('Filters:', filters);
      console.log('Active filter:', activeFilter);
      console.log('Case studies:', caseStudies);
      console.log('Safe case studies:', safeCaseStudies);
    }
  }, [ready, i18n.language, filters, activeFilter, caseStudies, safeCaseStudies]);

  const filteredCases = !activeFilter || activeFilter === 'all'
    ? safeCaseStudies
    : safeCaseStudies.filter(cs => {
      console.log('Comparing:', `"${cs.category}"`, 'vs', `"${activeFilter}"`);
      return cs.category === activeFilter;
    });

  const handleFilterClick = useCallback((filterKey, event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveFilter(filterKey);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && selectedCase) {
      setSelectedCase(null);
    }
  }, [selectedCase]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCase]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <section className="pt-40 pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                {t('casestudiestab.heading')}
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12">
                {t('casestudiestab.subpara')}
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {safeFilters && safeFilters.length > 0 && safeFilters.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={(e) => handleFilterClick(key, e)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border backdrop-blur-sm cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${activeFilter === key
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {filteredCases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {filteredCases.map((caseStudy, index) => (
                  <div
                    key={caseStudy.id}
                    className="group relative opacity-0 animate-fadeInUp"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div
                      className={`relative ${caseStudy.tileBackground} backdrop-blur-xl border border-gray-200/20 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20`}
                    >

                      <div className="relative h-60 overflow-hidden">
                        <img
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                              <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
                                <rect width="400" height="200" fill="#f3f4f6"/>
                                <text x="200" y="100" text-anchor="middle" dy="0.3em" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">
                                  ${caseStudy.title}
                                </text>
                              </svg>
                            `)}`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        {caseStudy.developmentTime && (
                          <div className={`absolute top-4 right-4 ${caseStudy.category === 'Legal Tech' ? 'bg-indigo-500/90' : 'bg-emerald-500/90'} text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm`}>
                            {caseStudy.developmentTime} {modalData.prototypeLabel || 'prototype'}
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-black bg-gray-300/60 px-2 py-1 rounded-full">
                            {caseStudy.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                          {caseStudy.title}
                        </h3>

                        <p className="text-black text-sm mb-4 leading-relaxed line-clamp-3">
                          {caseStudy.description}
                        </p>

                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {caseStudy.metrics && caseStudy.metrics.slice(0, 3).map((metric, idx) => {
                            const IconComponent = iconMap[metric.icon];
                            return (
                              <div key={idx} className="text-center">
                                {IconComponent && <IconComponent className="w-4 h-4 text-black mx-auto mb-1" />}
                                <div className="text-lg font-bold text-black">{metric.value}</div>
                                <div className="text-xs text-gray-950 leading-tight">{metric.label}</div>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setSelectedCase(caseStudy)}
                          className="w-full bg-gray-500 hover:bg-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm"
                        >
                          {modalData.viewCaseStudy || 'View Case Study'}
                          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/70 py-20">
                <p className="text-lg">No case studies found. Please check your translation files.</p>
              </div>
            )}
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-50 to-amber-100 shadow-xl border border-orange-100 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
                {ctaData.heading}
              </h2>
              <p className="text-orange-700 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {ctaData.subpara}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white"
                  onClick={() => {
                    const lang = i18n?.language || 'en';
                    const path = `${lang === 'en' ? '' : '/' + lang}/contactus`;
                    window.location.href = path;
                  }}>
                  {ctaData.button}
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div >

      {selectedCase && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedCase(null);
            }
          }}
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedCase.title}</h2>
                  <div className="flex items-center gap-4">
                    <span className={`${selectedCase.category === 'Legal Tech' ? 'text-indigo-400' : 'text-emerald-400'} text-medium font-medium bg-white px-2 py-1 border-full`}>{selectedCase.category}</span>
                    {selectedCase.developmentTime && (
                      <span className="text-white/60 text-sm bg-white/10 px-3 py-1 rounded-full">
                        {modalData.prototypeLabel}: {selectedCase.developmentTime}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <img
                src={selectedCase.image}
                alt={selectedCase.title}
                className="w-full h-80 md:h-70 object-cover rounded-2xl mb-6"
                loading="lazy"
                onError={(e) => {
                  e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 300">
                      <rect width="800" height="300" fill="#374151"/>
                      <text x="400" y="150" text-anchor="middle" dy="0.3em" font-family="Arial, sans-serif" font-size="24" fill="#9ca3af">
                        ${selectedCase.title}
                      </text>
                    </svg>
                  `)}`;
                }}
              />

              {selectedCase.problems && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <MdReportProblem className="w-5 h-5 mr-2 text-red-400" />
                    {modalData.problemsHeading}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCase.problems.map((problem, idx) => (
                      <div key={idx} className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <p className="text-white/80 text-sm leading-relaxed">{problem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCase.solutions && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
                    {modalData.solutionsHeading}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCase.solutions.map((solution, idx) => (
                      <div key={idx} className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-white/80 text-sm leading-relaxed">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">{modalData.overviewHeading}</h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                  {selectedCase.description}
                </p>
                <p className="text-white/70 text-base leading-relaxed">
                  {selectedCase.detaileddescription}
                </p>
              </div>

              <div className={`bg-gradient-to-r ${selectedCase.category === 'Legal Tech' ? 'from-indigo-500/10 to-purple-500/10 border-indigo-500/20' : 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20'} border rounded-2xl p-6`}>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Award className={`w-5 h-5 mr-2 ${selectedCase.category === 'Legal Tech' ? 'text-indigo-400' : 'text-emerald-400'}`} />
                  {modalData.outcomesHeading}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-5">
                  {selectedCase.metrics.map((metric, idx) => {
                    const IconComponent = iconMap[metric.icon];
                    return (
                      <div key={idx} className="bg-white/5 rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm border border-white/10">
                        <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mx-auto mb-3" />
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{metric.value}</div>
                        <div className="text-white/60 text-sm">{metric.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div >
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default CaseStudiesTab;
