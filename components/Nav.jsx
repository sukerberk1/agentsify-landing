import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { HiViewColumns, HiRectangleGroup, HiBars3, HiXMark } from "react-icons/hi2";
import { HiGlobeAlt, HiChevronDown } from "react-icons/hi2";

export const navData = [
  { name: "services", path: "/services", Icon: HiRectangleGroup },
  { name: "caseStudies", path: "/casestudies", Icon: HiViewColumns },
  { name: "aboutUs", path: "/about", Icon: HiViewColumns },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ua', name: 'Українська', flag: '🇺🇦' },
];

const Nav = () => {
  const router = useRouter();
  const { t, i18n, ready } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(true);
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const translateRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollStartY = useRef(0);
  const isScrollingUp = useRef(false);
  const scrollThreshold = 200;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    console.log('=== TRANSLATION DEBUG ===');
    console.log('Translation ready:', ready);
    console.log('Current i18n language:', i18n.language);
    console.log('Router locale:', router.locale);
    console.log('Available languages:', i18n.languages);
    console.log('Services translation:', t('services'));
    console.log('Current URL:', router.asPath);
    console.log('Current pathname:', router.pathname);
    console.log('========================');
  }, [ready, i18n.language, router.locale, t, isHydrated, router.asPath]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (translateRef.current && !translateRef.current.contains(event.target)) {
        setIsTranslateOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileLangOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const isMobile = window.innerWidth < 1280;

      if (isMobile) {
        if (currentScrollY < 100) {
          setIsVisible(true);
        } else if (scrollDirection === 'up') {
          setIsVisible(true);
        } else if (scrollDirection === 'down') {
          setIsVisible(false);
        }
      } else {
        if ((scrollDirection === 'up' && !isScrollingUp.current) ||
          (scrollDirection === 'down' && isScrollingUp.current)) {
          scrollStartY.current = lastScrollY.current;
          isScrollingUp.current = scrollDirection === 'up';
        }
        const totalScrollDistance = Math.abs(currentScrollY - scrollStartY.current);
        if (currentScrollY < 200 ||
          (scrollDirection === 'up' &&
            totalScrollDistance > scrollThreshold &&
            scrollStartY.current > scrollableHeight * 0.7)) {
          setIsVisible(true);
        } else if (currentScrollY > 200 && scrollDirection === 'down') {
          setIsVisible(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageSelect = async (languageCode) => {
    try {
      console.log('Changing language to:', languageCode);
      console.log('Current router state:', {
        pathname: router.pathname,
        asPath: router.asPath,
        locale: router.locale
      });

      setIsLanguageChanging(true);
      setIsTranslateOpen(false);
      setIsMobileLangOpen(false);
      setIsMobileMenuOpen(false);

      const { pathname, query } = router;

      // Force the locale to be 'ua' instead of 'uk'
      const targetLocale = languageCode === 'ua' ? 'ua' : languageCode;

      console.log('Target locale:', targetLocale);

      await router.push(
        {
          pathname: pathname,
          query: query,
        },
        router.asPath,
        {
          locale: targetLocale,
          scroll: false
        }
      );

      console.log('After language change:', {
        pathname: router.pathname,
        asPath: router.asPath,
        locale: router.locale
      });

    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsLanguageChanging(false);
    }
  };

  const getCurrentLanguage = () => {
    // Ensure we're matching the correct locale
    const currentLang = languages.find(lang => lang.code === router.locale);
    return currentLang || languages[0];
  };

  // Helper function to check if a link is active
  const isActiveLink = (linkPath) => {
    return router.pathname === linkPath;
  };

  return (
    <div className="relative z-[100]">
      <div className={`hidden xl:block fixed top-[36px] right-8 z-[101] transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-20'
        }`}>
        <Link
          href="/contactus"
          className="relative flex items-center gap-2 px-6 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 transition-all duration-300 shadow-lg"
        >
          <span className="relative z-10">📞</span>
          <span className="relative z-10">{t('contactUs')}</span>
        </Link>
      </div>

      <div className={`hidden xl:block fixed top-[36px] right-60 z-[101] transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-20'
        }`} ref={translateRef}>
        <button
          onClick={() => setIsTranslateOpen(!isTranslateOpen)}
          className="relative flex items-center gap-3 px-5 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg min-w-[200px] justify-between"
          disabled={isLanguageChanging}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <HiGlobeAlt className="w-4 h-4 flex-shrink-0" />
            <span className="truncate text-left">{t('translate')}</span>
          </div>
          <HiChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isTranslateOpen ? 'rotate-180' : ''}`} />
        </button>

        {isTranslateOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  disabled={isLanguageChanging}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-white/50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                    ${router.locale === language.code ? 'bg-white/30 font-medium' : ''}`}
                >
                  <span className="text-base">{language.flag}</span>
                  <span>{language.name}</span>
                  {router.locale === language.code && <span className="ml-auto">✓</span>}
                  {isLanguageChanging && router.locale !== language.code && (
                    <span className="ml-auto">⏳</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`xl:hidden fixed top-4 right-4 z-[101] transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-20'
        }`}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <HiXMark className="w-6 h-6" />
          ) : (
            <HiBars3 className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-[102] bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div
        ref={mobileMenuRef}
        className={`xl:hidden fixed top-0 right-0 h-full w-72 bg-white/95 backdrop-blur-sm z-[103] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-800">{t('menu')}</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <HiXMark className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="space-y-2 mb-8">
            {navData.map((link, i) => {
              const IconComponent = link.Icon;
              return (
                <Link
                  href={link.path}
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${isActiveLink(link.path)
                    ? "text-white bg-gradient-to-r from-orange-500 to-pink-500"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{t(link.name)}</span>
                </Link>
              );
            })}
          </div>

          <div className="mb-6">
            <button
              onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HiGlobeAlt className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{getCurrentLanguage().name}</span>
              </div>
              <HiChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isMobileLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMobileLangOpen && (
              <div className="mt-2 space-y-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    disabled={isLanguageChanging}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors disabled:opacity-50 ${router.locale === language.code
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <span className="text-base">{language.flag}</span>
                    <span className="flex-1 text-left">{language.name}</span>
                    {router.locale === language.code && <span className="text-blue-600">✓</span>}
                    {isLanguageChanging && router.locale !== language.code && (
                      <span className="text-gray-400">⏳</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto">
            <Link
              href="/contactus"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold hover:from-pink-600 hover:to-yellow-600 transition-all duration-300"
            >
              <span>📞</span>
              <span>{t('contactUs')}</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className={`hidden xl:block fixed left-1/2 -translate-x-1/2 top-[36px] z-[100] transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-20'
        }`}>
        <div className="flex justify-center items-center bg-white/10 backdrop-blur-sm mx-auto max-w-max rounded-full px-4 py-2 gap-x-8">
          {navData.map((link, i) => (
            <Link
              href={link.path}
              key={i}
              className={`relative px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all duration-300 ${isActiveLink(link.path)
                ? "text-white bg-gradient-to-r from-orange-500 to-pink-500"
                : "text-white hover:bg-white/10"
                }`}
            >
              {t(link.name)}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
