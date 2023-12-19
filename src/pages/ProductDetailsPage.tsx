import { useLocation } from 'react-router-dom';

import Layout from '@/layout/Layout';
import ProductDetails from '@/components/product-details-page/ProductDetails';
import PopulerCategories from '@/components/landing-page/PopulerCategories';
import ProductSection from '@/components/landing-page/ProductSection';
import Footer from '@/components/Footer';

const ProductDetailsPage = () => {
    const { state } = useLocation();

    if (!state || !state.productData) {
        <h1>Error!</h1>;
    }

    return (
        <Layout>
            <ProductDetails />
            <PopulerCategories />
            <ProductSection />
            <Footer />
        </Layout>
    );
};

export default ProductDetailsPage;
