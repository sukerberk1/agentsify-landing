import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiViewColumns, HiRectangleGroup } from "react-icons/hi2";

export const navData = [
  { name: "Services", path: "/services", Icon: HiRectangleGroup },
  { name: "Case Studies", path: "/casestudies", Icon: HiViewColumns },
  { name: "About Us", path: "/about", Icon: HiViewColumns },
];

const Nav = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollStartY = useRef(0);
  const isScrollingUp = useRef(false);
  const scrollThreshold = 200;

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
      }

      else {

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

  return (
    <div className="relative z-[100]">

      <div className="hidden xl:block fixed top-[36px] right-8 z-[101]">
        <Link
          href="/contactus"
          className={`relative flex items-center gap-2 px-6 py-2 rounded-full text-white font-semibold text-sm
            bg-black animate-glow border border-transparent shadow-[0_0_10px_#f472b6]
            before:absolute before:inset-0 before:rounded-full before:blur-lg before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500 before:opacity-70
            hover:scale-105 transition-all duration-300 z-10 overflow-hidden
            ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <span className="relative z-10 animate-bounce-slow text-pink-400">📞</span>
          <span className="relative z-10">Contact Us</span>
        </Link>
      </div>


      <nav className={`fixed left-0 right-0 z-[100]
        bottom-4 xl:bottom-auto xl:top-[36px] xl:left-1/2 xl:-translate-x-1/2
        transition-all duration-150 ease-out 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full xl:translate-y-[-200%] opacity-0 pointer-events-none"}`}
      >
        <div className="flex justify-center items-center bg-white/10 backdrop-blur-sm mx-auto xl:mx-auto max-w-max rounded-full px-2 xl:px-4 py-2 gap-x-2 xl:gap-x-8">
          {navData.map((link, i) => (
            <Link
              href={link.path}
              key={i}
              className={`relative px-2 xl:px-4 py-2 rounded-full text-xs xl:text-sm font-medium capitalize whitespace-nowrap
                transition-all duration-300
                ${pathname === link.path
                  ? "text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg shadow-orange-500/20"
                  : "text-white hover:text-accent hover:bg-white/10"
                }`}
            >
              <span className="xl:hidden">
                {link.name === "Case Studies" ? "Cases" :
                  link.name === "About Us" ? "About" :
                    link.name}
              </span>
              <span className="hidden xl:inline">{link.name}</span>
            </Link>
          ))}


          <Link
            href="/contactus"
            className="xl:hidden relative px-2 py-2 rounded-full text-xs font-medium whitespace-nowrap
              bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg shadow-pink-500/20
              hover:scale-105 transition-all duration-300"
          >
            📞 Call
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
