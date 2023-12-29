import LandingHero from '@/components/landing-page/LandingHero';
import PopulerCategories from '@/components/landing-page/PopulerCategories';
import { Button } from '@/components/ui/button';
import ProductSection from '@/components/landing-page/ProductSection';

import Layout from '@/layout/Layout';

const LandingPage = () => {
    return (
        <Layout>
            <LandingHero />
            <PopulerCategories />
            <section className="w-full pl-4 md:px-20 py-6  border border-input">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center ">
                    <div className="w-full h-[180px] bg-gradient-to-l from-gray-300 to-gray-100 rounded relative overflow-hidden">
                        <div>
                            <img
                                className="h-[300px] md:h-[320px] absolute  -top-16 -right-24 md:-right-16"
                                src="/images/special-offer/pngwing.com (5).png"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col w-full h-full justify-center pl-8 ">
                            <h1>HEADPHONE</h1>
                            <small className="font-semibold ">
                                <span className="text-red-700 ">
                                    {'50% OFF '}
                                </span>
                                FOR EVERYONE
                            </small>
                            <Button className="w-fit px-6 mt-5 text-lg bg-teal-700 hover:bg-teal-700/90">
                                Get Now
                            </Button>
                        </div>
                    </div>
                    <div className="w-full xl:w-[376px] h-[180px] xl:h-[376px] bg-slate-900 rounded row-span-auto xl:row-span-2 relative overflow-hidden">
                        <div>
                            <img
                                className="h-[400px] absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2  drop-shadow-md  "
                                src="/images/special-offer/pngwing.com (7).png"
                                alt="Apple"
                            />
                        </div>
                        <div></div>
                    </div>

                    <div className="w-full h-[180px] bg-gradient-to-tl from-slate-400 to-slate-300 rounded relative overflow-hidden ">
                        <div>
                            <img
                                className="h-[400px] absolute -top-36 -right-16 -rotate-0 scale-y-90 -scale-x-90 drop-shadow-md  "
                                src="/images/special-offer/pngwing.com (11).png"
                                alt=""
                            />
                        </div>
                        <div></div>
                    </div>

                    <div className="w-full h-[180px] bg-gradient-to-tl from-slate-500 to-slate-600 rounded relative overflow-hidden ">
                        <div>
                            <img
                                className="h-[360px] absolute -top-44 -left-28  drop-shadow-lg rotate-3 "
                                src="/images/special-offer/pngwing.com (2).png"
                                alt=""
                            />
                        </div>
                        <div></div>
                    </div>
                    <div className="w-full h-[180px] bg-gradient-to-tl from-gray-700 to-gray-600 rounded relative overflow-hidden col-auto lg:col-span-2 xl:col-auto">
                        <div>
                            <img
                                className="h-[320px] absolute -top-16 -left-16 -rotate-0 scale-y-90 -scale-x-90 drop-shadow-md  "
                                src="/images/special-offer/pngwing.com (9).png"
                                alt=""
                            />
                        </div>
                        <div></div>
                    </div>
                </div>
            </section>
            <PopulerCategories />
            <hr />
            <ProductSection />
        </Layout>
    );
};

export default LandingPage;
