import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { DetailProductProps } from '@/fetchUser';
import { formatRupiah } from '@/helpers/formatRupiah';
import { showImageAPI } from '@/helpers/showImageAPI';
import useFetch from '@/hook/useFetch';
import Layout from '@/layout/Layout';
import { cn } from '@/lib/utils';

const ProductDetailsPage = () => {
  const { slug } = useParams();

  const url = `/api/product/${slug}`;
  const { data } = useFetch<DetailProductProps>(url, null);
  const product = data?.data;
  const [imageIndex, setImageIndex] = useState(0);

  const handleOnMouseEnter = (index: number) => {
    setImageIndex(() => index);
  };
  return (
    <Layout>
      <div className="px-16">
        <div className="flex gap-4">
          <div className="w-2/5">
            <div className="flex overflow-hidden h-[450px] relative">
              {product?.product_image?.map((product, index) => {
                return (
                  index === imageIndex && (
                    <div
                      key={product.id}
                      className="flex w-full items-center justify-center rounded overflow-hidden"
                    >
                      <img
                        src={showImageAPI(product.image)}
                        alt="images-product"
                        className="object-cover h-full"
                      />
                    </div>
                  )
                );
              })}
            </div>
            <div className="grid grid-cols-5 w-full gap-2 mt-2">
              {product?.product_image?.map((product, index) => {
                return (
                  <div
                    key={product.id}
                    className={cn(
                      'rounded aspect-[6/5] flex justify-center border-2',
                      index === imageIndex && 'border-teal-600'
                    )}
                  >
                    <img
                      onMouseEnter={() => {
                        handleOnMouseEnter(index);
                      }}
                      src={showImageAPI(product.image)}
                      alt="images-product"
                      className="cursor-pointer h-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-3/5 flex flex-col">
            <h2 className="text-xl font-semibold">{product?.name}</h2>
            <h1>Rp {formatRupiah(product?.price)}</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
