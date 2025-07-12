import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeSection from "../components/LandingHome";
import WhyCaseStudies from "../components/WhyCaseStudies";
import BrandsReviews from "../components/BrandsReviews";
import Partnership from "../components/Partnership";
import AgencyComparison from '../components/AgencyComparison';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <HomeSection />
      <WhyCaseStudies />
      <BrandsReviews />
      <Partnership />
      <AgencyComparison />
      <FAQ />
      <Footer />
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Home;
