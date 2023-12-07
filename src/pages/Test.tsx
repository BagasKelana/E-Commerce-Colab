import useFetch, { FetchAllProduct, FetchAllCategory } from '@/hook/useFetch';

const Test = () => {
	const { data, error } = useFetch<FetchAllProduct>(
		'https://roughy-loyal-daily.ngrok-free.app/api/product',
		null
	);
	console.log(data);
	return (
		<div>
			{data?.data?.data.map((product) => (
				<div>{product.name}</div>
			))}
			<Go />
		</div>
	);
};

const Go = () => {
	const { data, error } = useFetch<FetchAllCategory>(
		'https://roughy-loyal-daily.ngrok-free.app/api/category',
		null
	);
	console.log(data);
	return (
		<div>
			{data?.data.map((halo) => (
				<div>{halo.name}</div>
			))}
		</div>
	);
};

export default Test;
