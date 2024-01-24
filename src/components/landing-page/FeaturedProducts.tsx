import ProductCard from '../Card/ProductCard';
import { Button } from '../ui/button';
import useFetch, { FetchAllProductfeatured } from '@/hook/useFetch';
import ErrorBoundary from '../ErrorBoundary';
import EmptyData from '../EmptyData';
import DataLoader from '../DataLoader';

const FeaturedProducts = () => {
    const { data, loading, error } = useFetch<FetchAllProductfeatured>(
        `${import.meta.env.VITE_DEVELOPE_API}/product/featured?limit=12`,
        null
    );
    const featuredProducts = data?.data;
    const isDataEmpty = featuredProducts?.length;

    return (
        <>
            <ErrorBoundary errorMessages={error?.message}>
                <div className="w-full p-2 mb-6 rounded shadow-sm shadow-gray-300 bg-slate-50">
                    <h2 className="text-teal-700 text-center">
                        RECOMMENDATION
                    </h2>
                </div>
                <EmptyData isLoading={loading} isDataEmpty={!isDataEmpty}>
                    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-5 place-items-stretch mb-4">
                        <DataLoader dataCount={12} isLoading={loading}>
                            {featuredProducts?.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    slug={product.slug}
                                    name={product.name}
                                    price={product.price}
                                    src={product.featured_image?.image || ''}
                                />
                            ))}
                        </DataLoader>
                    </section>
                    <div className="w-full flex p-2 justify-center">
                        <Button
                            disabled={loading}
                            className="bg-slate-50 text-black border-[1px] border-slate-200 hover:text-black/80 hover:bg-slate-50 "
                        >
                            See More
                        </Button>
                    </div>
                </EmptyData>
            </ErrorBoundary>
        </>
    );
};

export default FeaturedProducts;
