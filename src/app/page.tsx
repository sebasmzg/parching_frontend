"use client"

import Footer from "@/components/common/footer/footer";
import NavBar from "@/components/common/navbar/navBar";
import Section from "@/components/sections/section/section";
import Seccion1 from "@/components/sections/section1/section1";
import Seccion2 from "@/components/sections/section2/section2";
import Seccion3 from "@/components/sections/section3/section3";
import Section5 from "@/components/sections/section5/section5";

export default function Home() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main >
      <Seccion1/>
      <Section/>
      <Seccion2/>
      <Seccion3/>
      <Section5 />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
