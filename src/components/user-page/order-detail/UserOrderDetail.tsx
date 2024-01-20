import { fakeOrder } from '@/assets/fakeOrder';
import { Button } from '@/components/ui/button';
import { firstLetterToUpper } from '@/helpers/firstLetterToUpper';
import { formatRupiah } from '@/helpers/formatRupiah';

const UserOrderDetail = () => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-xl">Detail Transaksi</h1>
            <div className="w-full grid-cols-1  grid md:grid-cols-12 gap-4 ">
                <div className="col-span-8 overflow-auto ">
                    <OrderCartDetail />
                </div>
                <div className="w-full col-span-8 md:col-span-4 ">
                    <div className="p-4 flex flex-col w-full gap-2">
                        <Button variant="primery" className="w-full">
                            Beri Ulasan
                        </Button>
                        <Button variant="outline" className="w-full">
                            Chat Admin
                        </Button>
                        <Button variant="outline" className="w-full">
                            Bantuan
                        </Button>
                        <Button variant="outline" className="w-full">
                            Lihat Bukti Pembayaran
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// const OrderCart = () => {
//     return (
//         <>
//             {fakeOrderDetail.data.data.map((order) => {
//                 return (
//                     <div className="mb-4 border border-teal-700 p-4 rounded bg-gradient-to-r from-slate-200 to-slate-100">
//                         <div className="w-full flex flex-col mb-2 p-4 border border-slate-300 rounded bg-white">
//                             <div className="w-full flex justify-between">
//                                 <h2>{order.order_status.name.toUpperCase()}</h2>
//                                 <span className="text-teal-700 font-medium text-sm self-center">
//                                     Lihat Detail
//                                 </span>
//                             </div>
//                             <div className="w-full flex justify-between">
//                                 <p>No. Invoice</p>
//                                 <span className="text-teal-700 font-medium">
//                                     {order.invoice}
//                                 </span>
//                             </div>
//                             <div className="w-full flex justify-between">
//                                 <p>Tanggal Pembelian</p>
//                                 <span>{order.date}</span>
//                             </div>
//                         </div>
//                         {order?.order_product?.map((orderProduct) => {
//                             return (
//                                 <section className="flex w-full justify-between p-6 gap-5 border border-slate-300 rounded bg-white">
//                                     <div className="w-full flex  gap-2">
//                                         <div className="flex gap-2 justify-center p-2">
//                                             <div className="w-[50px] h-[50px]">
//                                                 <img
//                                                     className="object-cover aspect-square"
//                                                     src={
//                                                         '/images/product/1ee9fd68-309c-473f-b5f9-b28c13c59d7b.png'
//                                                     }
//                                                     alt="product-order"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="w-full py-2">
//                                             <h2 className="line-claps-with-ellipsis font-semibold text-base">
//                                                 {orderProduct.name}
//                                             </h2>
//                                             <p className="text-sm text-slate-600">
//                                                 {orderProduct?.qty} x{' '}
//                                                 {orderProduct?.product?.price?.toLocaleString(
//                                                     'id-ID',
//                                                     {
//                                                         style: 'currency',
//                                                         currency: 'IDR'
//                                                     }
//                                                 )}
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <div className="w-full flex flex-col items-center gap-2 text-end pt-2">
//                                         <div className="w-full">
//                                             <p>Total Harga</p>
//                                             <h2 className="text-base font-semibold">
//                                                 Rp
//                                                 {formatRupiah(
//                                                     orderProduct.subtotal
//                                                 )}
//                                             </h2>
//                                             <Button
//                                                 size="sm"
//                                                 variant="outlinePrimery"
//                                                 className="w-32 mt-2"
//                                             >
//                                                 Beli Lagi
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </section>
//                             );
//                         })}
//                     </div>
//                 );
//             })}
//         </>
//     );
// };

const OrderCartDetail = () => {
    return (
        <div className="mb-4 p-2 bg-slate-200">
            <div className="w-full flex flex-col mb-2 p-4 rounded bg-white">
                <div className="w-full flex justify-between mb-3">
                    <h2 className="text-lg">
                        {firstLetterToUpper(fakeOrder.data.order.status)}
                    </h2>
                    <span className="text-teal-700 font-medium text-sm self-center">
                        Lihat Detail
                    </span>
                </div>
                <div className="w-full flex justify-between">
                    <p className="text-sm">No. Invoice</p>
                    <span className="text-teal-700 font-medium">
                        {fakeOrder.data.order.invoice}
                    </span>
                </div>
                <div className="w-full flex justify-between">
                    <p className="text-sm">Tanggal Pembelian</p>
                    <span className="text-sm">{fakeOrder.data.order.date}</span>
                </div>
            </div>
            <div className="p-4 bg-white">
                <div className="flex justify-between mb-2">
                    <h2 className="text-lg">Detail Product</h2>
                </div>
                {fakeOrder?.data.products.data.map((orderProduct) => {
                    return (
                        <section className="flex w-full justify-between p-6 gap-5 border border-slate-300 rounded bg-white">
                            <div className="w-full flex  gap-2">
                                <div className="flex gap-2 justify-center p-2">
                                    <div className="w-[50px] h-[50px]">
                                        <img
                                            className="object-cover aspect-square"
                                            src={
                                                '/images/product/1ee9fd68-309c-473f-b5f9-b28c13c59d7b.png'
                                            }
                                            alt="product-order"
                                        />
                                    </div>
                                </div>
                                <div className="w-full py-2">
                                    <h2 className="line-claps-with-ellipsis font-semibold text-base">
                                        {orderProduct.product.name}
                                    </h2>
                                    <p className="text-sm text-slate-600">
                                        {orderProduct?.qty} x{' '}
                                        {formatRupiah(
                                            orderProduct?.product?.price
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center gap-2 text-end pt-2">
                                <div className="w-full">
                                    <p>Total Harga</p>
                                    <h2 className="text-base font-semibold">
                                        Rp
                                        {formatRupiah(orderProduct.subtotal)}
                                    </h2>
                                    <Button
                                        size="sm"
                                        variant="outlinePrimery"
                                        className="w-32 mt-2"
                                    >
                                        Beli Lagi
                                    </Button>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
            <div className="w-full flex flex-col mt-2 p-4 rounded bg-white">
                <div className="w-full flex justify-between mb-3">
                    <h2 className="text-lg">Info Pengiriman</h2>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                    <div className="w-full flex justify-between">
                        <p>Nama</p>
                        <span>{fakeOrder.data.order.name}</span>
                    </div>
                    <div className="w-full flex justify-between">
                        <p>Lokasi Pengiriman</p>
                        <span>{fakeOrder.data.order.address}</span>
                    </div>
                    <div className="w-full flex justify-between">
                        <p>Nomer Hp</p>
                        <span>{fakeOrder.data.order.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrderDetail;
