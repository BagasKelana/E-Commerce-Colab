import Product from '@/components/product-page/Product';
import Layout from '@/layout/Layout';

const ProductPage = () => {
    return (
        <Layout>
            <section className="w-full h-full px-4 md:px-20 pt-4">
                <Product />
            </section>
        </Layout>
    );
};

export default ProductPage;
