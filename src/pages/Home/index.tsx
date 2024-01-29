import Layout from '@/layout/Layout';

import FeaturedProducts from './components/FeaturedProducts';
import GamingSetup from './components/GamingSetup';
import LandingHero from './components/LandingHero';
import PopulerCategories from './components/PopulerCategories';

const HomePage = () => {
  return (
    <Layout className="py-0">
      <LandingHero />
      <PopulerCategories />
      <GamingSetup />
      <FeaturedProducts />
    </Layout>
  );
};

export default HomePage;
