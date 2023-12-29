import { Button } from '../ui/button';

const AdsProduct = () => {
    return (
        <div className="w-full h-[200px] bg-gradient-to-l from-gray-300 to-gray-100 rounded relative overflow-hidden mb-5">
            <div>
                <img
                    width={320}
                    height={320}
                    className="h-[300px] w-[300px] md:h-[320px] md:w-[320px] absolute -top-16 -right-24 md:-right-16"
                    src="/images/special-offer/pngwing.com (5).png"
                    alt="AdsProduct"
                />
            </div>
            <div className="flex flex-col w-full h-full justify-center pl-8">
                <h1>HEADPHONE</h1>
                <small className="font-semibold ">
                    <span className="text-red-800 ">{'50% OFF '}</span>
                    FOR EVERYONE
                </small>
                <Button className="w-fit px-6 mt-5 text-lg bg-teal-700 hover:bg-teal-600">
                    Get Now
                </Button>
            </div>
        </div>
    );
};

export default AdsProduct;
