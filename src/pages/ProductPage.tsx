
import ProductSection from '@/components/product-page/ProductSection';
import DeleteFilterProduct from '@/components/product-page/filter/DeleteFilterProduct';
import FilterComponent from '@/components/product-page/filter/FilterComponent';
import useSearchProduct from '@/hook/useSearchProduct';
import Layout from '@/layout/Layout';

const ProductPage = () => {
    const { productData, isLoading, errorProduct, filter } = useSearchProduct();
    return (
        <Layout>
            <section className="w-full h-full px-4 md:px-20 pt-4">
                <div className="h-full w-full flex gap-6 mb-4">
                    <FilterComponent isLoading={isLoading} filter={filter} />
                    <ProductSection
                        data={productData}
                        loading={isLoading}
                        error={errorProduct}
                        term={filter.term}
                    >
                        <div className="flex items-center gap-2">
                            <DeleteFilterProduct filterProduct={filter} />
                        </div>
                    </ProductSection>
                </div>
            </section>
        </Layout>
    );
};

export default ProductPage;
