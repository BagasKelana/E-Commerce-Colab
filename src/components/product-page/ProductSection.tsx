import { FetchAllProduct } from '@/hook/useFetch';
import SkeletonCard from '../Card/SkeletonCard';
import ErrorHandling from './ErrorHandling';
import ProductCard from '../Card/ProductCard';
import Pagination from './Pagination';
import { useCallback, useMemo } from 'react';
import OrderBox from './OrderBox';
import { AxiosError } from 'axios';
import AdsProduct from './AdsProduct';

type ProductSectionProps = {
    term?: string | null;
    children: React.ReactNode;
    data: FetchAllProduct | null;
    error: AxiosError | null;
    loading: boolean;
};

const ProductSection: React.FC<ProductSectionProps> = ({
    term,
    children,
    data,
    loading,
    error
}) => {
    const renderSkeleton = () => {
        if (loading) {
            return Array.from({ length: 10 }, (_, index) => (
                <SkeletonCard key={index} />
            ));
        }

        return null;
    };

    const productData = useMemo(() => data, [data]);

    const productRendering = useCallback(() => {
        if (productData) {
            if (productData?.data?.data?.length > 0) {
                return productData?.data?.data?.map((product) => (
                    <ProductCard
                        slug={product.slug}
                        key={product.slug}
                        name={product.name}
                        src={product.product_image?.[0]?.image}
                        price={product.price}
                    />
                ));
            }

            return (
                <div className="col-span-5 row-span-2 place-content-center justify-items-center">
                    Product Tidak Ditemukan
                </div>
            );
        }
        return null;
    }, [productData]);


    console.log(data);

    return (
        <ErrorHandling error={error}>
            <div className="mb-4 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <div className="font-bold xl:hidden">Filter</div>
                    <div className="hidden xl:flex">
                        {loading ? (
                            <p>Mohon tunggu sebentar...</p>
                        ) : (
                            <p>
                                {term ? (
                                    <>
                                        {' '}
                                        Menampilan {data?.data?.total} product
                                        untuk <strong>"{term}"</strong>{' '}
                                        <strong>
                                            ({data?.data?.from}-{data?.data?.to} of{' '}
                                            {data?.data?.total})
                                        </strong>
                                    </>
                                ) : (
                                    <>
                                        {' '}
                                        Menampilan {data?.data?.total} product
                                        untuk <strong>"Semua Product"</strong>{' '}
                                        <strong>
                                            ({data?.data?.from}-{data?.data?.to} of{' '}
                                            {data?.data?.total})
                                        </strong>
                                    </>
                                )}
                            </p>
                        )}
                    </div>
                    <OrderBox />
                </div>
                <div className="hidden xl:block">{!loading && children}</div>
            </div>
            <AdsProduct />
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-4 gap-y-5 place-items-stretch mb-4 w-full">
                {loading ? renderSkeleton() : productRendering()}
            </section>
            <div className="w-full flex justify-center py-4 px-4">
                <Pagination
                    url={'/product'}
                    linksPagination={productData?.data?.links}
                />
            </div>
        </ErrorHandling>
    );
};

export default ProductSection;
