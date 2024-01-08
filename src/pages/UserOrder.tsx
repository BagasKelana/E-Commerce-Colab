import { products } from '@/assets/dummyOrder';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';

const UserOrder = () => {
    return (
        <main className="w-full">
            <div className="w-full flex flex-col gap-4 mb-4">
                <h1 className="text-xl">Order history</h1>
                <span className="text-muted-foreground">3 orders</span>
            </div>
            <div className="w-full flex flex-col gap-6">
                <OrderCart />
                <OrderCart />
                <OrderCart />
            </div>
        </main>
    );
};

const OrderCart = () => {
    const dummy = products[1];
    return (
        <section className="w-full flex flex-col gap-5 bg-slate-100 px-6 pt-6 pb-8 shadow shadow-slate-200 border-l-0 border-t-4 lg:border-l-4 lg:border-t-0 border-teal-700">
            <div className="w-full flex items-center gap-2">
                <Circle className="bg-teal-700 rounded-full text-teal-700 h-3 w-3" />
                <span className="text-teal-700">Dikirim</span>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-6">
                <div className="bg-white w-full lg:w-3/5 shadow-slate-300/80 shadow-md">
                    <section className="flex items-center p-6 gap-5 border-b-2 rounded ">
                        <div className="flex gap-2 w-1/3 justify-center p-2">
                            <div className="w-[50px] h-[50px]">
                                <img
                                    className="object-cover aspect-square"
                                    src={dummy.img}
                                    alt="product-order"
                                />
                            </div>
                        </div>
                        <div className="w-2/3">
                            <h2 className="line-claps-with-ellipsis font-semibold text-base">
                                {dummy.name}
                            </h2>
                        </div>
                    </section>
                    <section className="flex items-center p-6 gap-5 border-b-2 rounded">
                        <div className="flex w-1/3 justify-center p-2">
                            <div className="w-[50px] h-[50px]">
                                <img
                                    className="object-cover aspect-square "
                                    src={dummy.img}
                                    alt="product-order"
                                />
                            </div>
                        </div>
                        <div className="w-2/3">
                            <h2 className="line-claps-with-ellipsis font-semibold text-base">
                                {dummy.name}
                            </h2>
                        </div>
                    </section>
                </div>
                <div className="w-full lg:w-2/5 flex flex-col gap-3">
                    <Button
                        variant="primery"
                        className="w-full font-semibold rounded p-6"
                    >
                        Beli Lagi
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full font-semibold bg-transparent border-sky-700 hover:border-sky-700/80 rounded p-6 text-sky-700 hover:text-sky-700/80"
                    >
                        Lihat Detail Pembelian
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default UserOrder;

/*  <main className="w-full col-span-5 ">
            <section className="w-full mb-3 bg-white grid grid-cols-6 text-center ">
                <NavLink className="px-2 py-3 w-full" to="">
                    <span>Semua</span>
                </NavLink>
                <NavLink className="px-2 py-3 w-full" to="">
                    <span>Belum Dibayar</span>
                </NavLink>
                <NavLink className="px-2 py-3 w-full" to="">
                    <span>Sedang Dikemas</span>
                </NavLink>
                <NavLink className="px-2 py-3 w-full" to="">
                    <span>Dikirim</span>
                </NavLink>
                <NavLink className="px-2 py-3 w-full" to="">
                    <span>Selesai</span>
                </NavLink>
                <NavLink className="px-2 py-3 w-full" to="">
                    <span>Dibatalkan</span>
                </NavLink>
            </section>
            <div className="w-full mb-3">
                <div className="w-full">
                    <section className="w-full flex flex-col gap-3 bg-white px-6 pt-6 pb-3">
                        <div className="w-full flex justify-between">
                            <span className="flex items-center whitespace-nowrap gap-2 text-sm font-semibold">
                                Shoped
                            </span>
                            <span className="flex whitespace-nowrap gap-2 text-sm items-center text-teal-700">
                                <Info className="w-[0.875rem] h-[0.875rem] text-neutral-700" />
                                <Separator orientation="vertical" />
                                SELESAI
                            </span>
                        </div>
                        <hr />
                        <div className="w-full flex">
                            <div className="w-full flex gap-2 ">
                                <div className="w-[82px] h-[82px]">
                                    <AspectRatio ratio={1 / 1}>
                                        <img
                                            className="object-cover"
                                            src="/images/product/7b1ed4b8-3651-41a9-9408-068ccdded714.png"
                                            alt="img"
                                        />
                                    </AspectRatio>
                                </div>
                                <div>
                                    <h3 className="leading-[22px]">
                                        Laptop Super Keren
                                    </h3>
                                    <small>x1</small>
                                </div>
                            </div>
                            <div className="text-teal-700 text-sm flex items-center">
                                <span> Rp399.000</span>
                            </div>
                        </div>
                    </section>
                    <hr />
                    <section className="w-full flex flex-col gap-3 bg-white px-6 pb-6 pt-3">
                        <div className="w-full flex justify-end gap-3 mt-3 mb-2 text-center items-center">
                            <div className="whitespace-nowrap flex items-center text-sm text-neutral-700">
                                <span> Total Pembayaran :</span>
                            </div>
                            <h2 className="font-normal text-2xl leading-[30px] text-teal-700">
                                Rp499.000
                            </h2>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <small className="text-neutral-700 ">
                                *Dibatalkan Penjual
                            </small>
                            <div className="flex gap-2 ">
                                <Button
                                    className="w-[150px] rounded-none"
                                    variant="primery"
                                >
                                    Beli Lagi
                                </Button>
                                <Button
                                    className="w-[150px] rounded-none"
                                    variant="outline"
                                >
                                    Hubungi Penjual
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main> */
