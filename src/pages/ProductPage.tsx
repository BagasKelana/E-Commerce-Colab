import Pagination from '@/components/Pagination';
import Product from '@/components/product-page/Product';
import Layout from '@/layout/Layout';

const ProductPage = () => {
	return (
		<Layout>
			<div className="w-full">
				<div id="PRODUCT_FILTER"></div>
				<div
					id="PRODUCT_CONTAINER"
					className="w-full pl-4 md:px-20 my-6">
					<Product />
				</div>
			</div>
			<div>
				<Pagination />
			</div>
		</Layout>
	);
};

export default ProductPage;
