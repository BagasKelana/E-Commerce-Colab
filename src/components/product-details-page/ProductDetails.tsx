import ProductImages from './components/ProductImages';
import ProductDescriptions from './components/ProductDescriptions';
import ProductReviews from './components/ProductReviews';

const ProductDetails = () => {
    return (
        <section className="px-[1.8em] flex flex-col gap-[2em]">
            <div className='flex flex-col gap-[.5em] h-full md:flex-row md:gap-[2em] md:h-[75vh]'>
                <ProductImages />
                <ProductDescriptions />
            </div>
            <ProductReviews />
        </section>
    );
};

export default ProductDetails;
