import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const UserOrder = () => {
    return (
        <main className="w-full col-span-5 ">
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
        </main>
    );
};

export default UserOrder;
