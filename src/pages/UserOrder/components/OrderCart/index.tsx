import { Circle } from 'lucide-react';

import { products } from '@/assets/dummyOrder';
import { Button } from '@/components/ui/button';
import { readableDate } from '@/helpers/readableDate';

const OrderCart = () => {
  const dummy = products[1];
  return (
    <section className="w-full flex flex-col gap-5 bg-slate-100 px-6 pt-6 pb-8 shadow shadow-slate-200 border-l-0 border-t-4 lg:border-l-4 lg:border-t-0 border-teal-700">
      <div className="w-full flex items-center gap-2">
        <Circle className="bg-teal-700 rounded-full text-teal-700 h-3 w-3" />
        <span className="text-teal-700 font-medium">Dikirim</span>
        <span>{readableDate('2023-11-26T10:57:15.000000Z')}</span>
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
              <p className="text-teal-700 font-medium">
                {dummy.price.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                })}
              </p>
            </div>
          </section>
        </div>
        <div className="w-full lg:w-2/5 flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full font-semibold bg-transparent border-sky-700 hover:border-sky-700/80 rounded p-6 text-sky-700 hover:text-sky-700/80"
          >
            Lihat Detail Pembelian
          </Button>
          <Button
            variant="primery"
            className="w-full font-semibold rounded p-6"
          >
            Beli Lagi
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrderCart;
