import React from 'react';
import AutoScrollHandler from '../components/AutoScrollHandler/AutoScrollHandler';
import Hero from '../sections/Hero/Hero';
import AboutStack from '../sections/AboutStack/AboutStack';
import Portfolio from '../sections/Portfolio/Portfolio';
import ContactSection from '../sections/Contact/Contact';

const MainPage: React.FC = () => {
  return (
    <AutoScrollHandler>
      <Hero />
      <AboutStack />
      <Portfolio />
      <ContactSection />
    </AutoScrollHandler>
  );
};

export default React.memo(MainPage);