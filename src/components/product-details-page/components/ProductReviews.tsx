import ProductRate from '../template/ProductRate';
import { Star } from 'lucide-react';
import Pagination from '@/components/Pagination';

const ProductReviews = () => {
    return (
        <section className="flex items-start gap-[1em] min-h-screen mb-4">
            <div className="flex flex-col w-1/4 gap-4 select-none">
                <div className="flex items-center gap-[.5em] pl-4">
                    <Star className="text-yellow-500 fill-yellow-500 w-[20%] h-[20%]" />
                    <h4 className="text-5xl">
                        4,5<span className="text-3xl text-slate-400">/5</span>
                    </h4>
                </div>

                <ul className="w-full">
                    <li className="w-full flex items-center gap-[.4rem]">
                        <span className="font-bold">5</span>
                        <ProductRate
                            value={95}
                            color="bg-yellow-500"
                            background="shadow-sm shadow-slate-500 bg-transparent border border-yellow-300"
                        />
                    </li>
                    <li className="w-full flex items-center gap-[.4rem]">
                        <span className="font-bold">4</span>
                        <ProductRate
                            value={65}
                            color="bg-yellow-500"
                            background="shadow-sm shadow-slate-500 bg-transparent border border-yellow-300"
                        />
                    </li>
                    <li className="w-full flex items-center gap-[.4rem]">
                        <span className="font-bold">3</span>
                        <ProductRate
                            value={5}
                            color="bg-yellow-500"
                            background="shadow-sm shadow-slate-500 bg-transparent border border-yellow-300"
                        />
                    </li>
                    <li className="w-full flex items-center gap-[.4rem]">
                        <span className="font-bold">2</span>
                        <ProductRate
                            value={0}
                            color="bg-yellow-500"
                            background="shadow-sm shadow-slate-500 bg-transparent border border-yellow-300"
                        />
                    </li>
                    <li className="w-full flex items-center gap-[.4rem]">
                        <span className="font-bold">1</span>
                        <ProductRate
                            value={3}
                            color="bg-yellow-500"
                            background="shadow-sm shadow-slate-500 bg-transparent border border-yellow-300"
                        />
                    </li>
                </ul>
            </div>
            <div className="w-[60%] h-screen rounded-xl p-[1em]">
                <div className="mb-4">
                    <div className="flex items-center gap-1">
                        <h4 className="text-sm text-white h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                            JD
                        </h4>
                        <button className="p-2 rounded-md text-sm font-semibold">
                            John Doe
                        </button>
                        <span className="w-1 h-1 bg-black rounded-full"></span>
                        <p className="text-slate-400">100 years ago</p>
                    </div>
                    <div className="flex item-center gap-2">
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                    </div>
                    <div className="text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis quibusdam maxime consectetur distinctio omnis
                        odio quia molestias laborum nihil qui harum fugit,
                        nostrum totam? Illum aperiam qui maxime beatae iusto.
                    </div>
                </div>
                <div className="mb-5">
                    <div className="flex items-center gap-1">
                        <h4 className="text-sm text-white h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                            EX
                        </h4>
                        <button className="p-2 rounded-md text-sm font-semibold">
                            Example
                        </button>
                        <span className="w-1 h-1 bg-black rounded-full"></span>
                        <p className="text-slate-400">10 years ago</p>
                    </div>
                    <div className="flex item-center gap-2">
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </div>
                    <div className="flex items-center w-full gap-[.5em]">
                        <div className="w-20 h-20 bg-red-500 rounded-2xl"></div>
                        <div className="w-20 h-20 bg-red-500 rounded-2xl"></div>
                        <div className="w-20 h-20 bg-red-500 rounded-2xl"></div>
                    </div>
                    <div className="text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis quibusdam maxime consectetur distinctio omnis
                        odio quia molestias laborum nihil qui harum fugit,
                        nostrum totam? Illum aperiam qui maxime beatae iusto.
                    </div>
                </div>
                <div className="mb-5">
                    <div className="flex items-center gap-1">
                        <h4 className="text-sm text-white h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                            EX
                        </h4>
                        <button className="p-2 rounded-md text-sm font-semibold">
                            Example
                        </button>
                        <span className="w-1 h-1 bg-black rounded-full"></span>
                        <p className="text-slate-400">10 years ago</p>
                    </div>
                    <div className="flex item-center gap-2">
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                        <Star className="fill-yellow-500 stroke-yellow-500" />
                        <Star />
                    </div>
                    <div className="flex items-center w-full gap-[.5em]">
                        <div className="w-20 h-20 bg-red-500 rounded-2xl"></div>
                        <div className="w-20 h-20 bg-red-500 rounded-2xl"></div>
                        <div className="w-20 h-20 bg-red-500 rounded-2xl"></div>
                        <div className="w-20 h-20 bg-red-500 rounded-2xl"></div>
                        <div className="w-20 h-20 bg-red-500 rounded-2xl"></div>
                    </div>
                    <div className="text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis quibusdam maxime consectetur distinctio omnis
                        odio quia molestias laborum nihil qui harum fugit,
                        nostrum totam? Illum aperiam qui maxime beatae iusto.
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Pagination />
                </div>
            </div>
            <div className="w-[15%] h-full">
                <h4 className="font-bold text-center">From Seller</h4>
                <div className="w-full h-40 bg-red-500 rounded-2xl mb-5"></div>
                <div className="w-full h-40 bg-red-500 rounded-2xl mb-5"></div>
                <div className="w-full h-40 bg-red-500 rounded-2xl mb-5"></div>
            </div>
        </section>
    );
};

export default ProductReviews;
