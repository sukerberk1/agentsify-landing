import { Sora } from "next/font/google";
import Head from "next/head";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >

      <Head>
        <title>Agentsify | Custom AI Solutions & Strategy</title>
        <meta
          name="description"
          content="Transform your business with Agentsify's tailored AI solutions. We offer AI strategy consulting, custom-built systems, predictive analytics, and natural language processing tools."
        />
        <link rel="icon" type="image/png" href="/logo-small-black.png?v=1" />

        <meta property="og:description" content="Agentsify your business with agentic solutions tailored for your business needs."></meta>
        <meta property="og:title" content="Agentsify"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://agentsify.ai"></meta>
        <meta property="og:image" content="/logo-small-black.png"></meta>
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />


      {children}
    </main>
  );
};

export default Layout;
