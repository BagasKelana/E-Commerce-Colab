import { products } from '@/assets/products';
import ProductCard from '../Card/ProductCard';
import { Button } from '../ui/button';

const ProductSection = () => {
    return (
        <section className="w-full pl-4 md:px-20 my-6">
            <div className="w-full  p-2 mb-4 rounded border-[1px] border-amber-600 bg-amber-500 ">
                <h2 className="text-white text-center">RECOMMENDATION</h2>
            </div>
            <section className="grid grid-cols-6 gap-x-4 gap-y-5  place-items-stretch mb-4">
                {products.map((product) => (
                    <ProductCard
                        name={product.name}
                        price={product.price}
                        src={product.img}
                    />
                ))}
            </section>
            <div className="w-full flex p-2 justify-center ">
                <Button className="bg-slate-50 text-black border-[1px] border-slate-200 hover:text-black/80 hover:bg-slate-50 ">
                    See More
                </Button>
            </div>
        </section>
    );
};

export default ProductSection;
