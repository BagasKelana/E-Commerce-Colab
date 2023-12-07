import useFetch, { FetchAllProduct, FetchAllCategory } from '@/hook/useFetch';
import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import ProductCard from '../Card/ProductCard';
import SkeletonCard from '../Card/SkeletonCard';
import { cn } from '@/lib/utils';
import { Input, InputProps } from '../ui/input';
import { Button } from '../ui/button';

type Filter = {
	term?: string | null;
	category_id?: string | null;
	page?: string | null;
	min?: string | null;
	max?: string | null;
};

const Product: React.FC = () => {
	const [queryParameters] = useSearchParams();

	const [filter, setFilter] = useState<Filter>({
		term: queryParameters.get('q'),
		category_id: queryParameters.get('category_id'),
		page: queryParameters.get('page'),
		min: queryParameters.get('min'),
		max: queryParameters.get('max'),
	});

	useEffect(() => {
		const initialFilterState = {
			term: queryParameters.get('q'),
			category_id: queryParameters.get('category_id'),
			page: queryParameters.get('page'),
			min: queryParameters.get('min'),
			max: queryParameters.get('max'),
		};
		{
			setFilter((current) => ({
				...current,
				...initialFilterState,
			}));
		}
	}, [queryParameters]);

	const querySearch = useMemo(() => {
		return `?q=${filter.term || ''}&category_id=${
			filter.category_id || ''
		}${filter.min ? `&min=${filter.min}` : ''}${
			filter.max ? `&max=${filter.max}` : ''
		}`;
	}, [filter]);

	const { data, error, loading } = useFetch<FetchAllProduct>(
		`${import.meta.env.VITE_DEVELOPE_API}/product${querySearch}`,
		null
	);
	console.log(data);

	const renderComponents = () => {
		return Array.from({ length: 10 }, (_, index) => (
			<SkeletonCard key={index} />
		));
	};

	return (
		<div className="w-full">
			<div className="flex h-full w-full  ">
				<FilterComponent filter={filter} />
				{error ? (
					<div className="w-5/6 min-h-[200px] flex items-center justify-center  text-3xl">
						{' '}
						Error Bos
					</div>
				) : (
					<section className="grid grid-cols-5 gap-x-4 gap-y-5  place-items-stretch mb-4 w-5/6">
						{loading
							? renderComponents()
							: data?.data.data?.map((product) => (
									<ProductCard
										key={product.id}
										name={product.name}
										src={product.product_image?.[0]?.image}
										price={product.price}
									/>
							  ))}
					</section>
				)}
			</div>
		</div>
	);
};

type FilterComponentProps = {
	filter: Filter;
};

const FilterComponent: React.FC<FilterComponentProps> = ({ filter }) => {
	const { data, error, loading } = useFetch<FetchAllCategory>(
		`${import.meta.env.VITE_DEVELOPE_API}/category`,
		null
	);

	const [queryParameters, setQueryParameters] = useSearchParams();
	const [showFilter, setShowFilter] = useState({
		categories: true,
		price: true,
	});
	const [price, setPrice] = useState({
		min: queryParameters.get('min') || '',
		max: queryParameters.get('max') || '',
		errorMessage: '',
	});

	const handleShowCategoris = () => {
		setShowFilter((value) => {
			return { ...value, categories: !value.categories };
		});
	};
	const handleShowPrice = () => {
		setShowFilter((value) => {
			return { ...value, price: !value.price };
		});
	};

	const filterCategories = (
		event: React.MouseEvent & {
			target: HTMLLIElement;
		}
	) => {
		if (event.target.id === filter.category_id) {
			queryParameters.delete('category_id');
			return setQueryParameters(queryParameters);
		}
		queryParameters.set('category_id', event.target.id);
		return setQueryParameters(queryParameters);
	};

	const handleChangePrice = (
		e: React.ChangeEvent<HTMLInputElement> & {
			target: React.ForwardRefExoticComponent<
				InputProps & React.RefAttributes<HTMLInputElement>
			>;
		}
	) => {
		const pattern = /^[0-9]*$/;
		if (e.target.id === 'min') {
			if (pattern.test(e.target.value)) {
				return setPrice((current) => ({
					...current,
					min: e.target.value,
				}));
			}
		}

		if (e.target.id === 'max') {
			if (pattern.test(e.target.value)) {
				return setPrice((current) => ({
					...current,
					max: e.target.value,
				}));
			}
		}
	};

	const handleApplyPrice = () => {
		if (price.min && price.max) {
			if (price.min <= price.max) {
				queryParameters.set('min', price.min);
				queryParameters.set('max', price.max);
				setPrice((current) => ({
					...current,
					errorMessage: '',
				}));
				return setQueryParameters(queryParameters);
			}
			return setPrice((current) => ({
				...current,
				errorMessage:
					'The minimum price must be less or equal to the maximum price',
			}));
		}
		if (price.min || price.max) {
			queryParameters.set('min', price.min);
			queryParameters.set('max', price.max);
			setPrice((current) => ({
				...current,
				errorMessage: '',
			}));
			return setQueryParameters(queryParameters);
		} else {
			queryParameters.delete('min');
			queryParameters.delete('max');
			setPrice((current) => ({
				...current,
				errorMessage: '',
			}));
			return setQueryParameters(queryParameters);
		}
	};

	return (
		<div className=" hidden h-full w-1/6 flex-col gap-4 p-4  xl:flex ">
			<div className="whitespace-nowrap flex items-center ">
				<Filter className="w-4 h-4 mr-2" />
				<h3 className="font-semibold">FILTER</h3>
			</div>
			<div className="h-full w-full shadow shadow-black">
				<div className="flex w-full flex-col ">
					<div>
						<button
							onClick={handleShowCategoris}
							className="flex cursor-pointer items-center justify-between p-2 shadow shadow-black w-full ">
							<div>Categories</div>
							<span
								className={cn(
									'transition-all duration-150 ease-in-out -rotate-180',
									!showFilter.categories && 'rotate-0'
								)}>
								<ChevronDown />
							</span>
						</button>
						<ul
							className={cn(
								'ml-5 flex origin-top flex-col overflow-auto text-sm transition-all duration-200 ease-in-out max-h-[180px] scale-y-100',
								!showFilter.categories &&
									' max-h-[0px] scale-y-0'
							)}>
							{data?.data?.map((category, index) => {
								return `${category.id}` ===
									filter.category_id ? (
									<List
										className={'bg-blue-600'}
										key={index}
										onClick={filterCategories}
										id={`${category.id}`}>
										{category.name}
									</List>
								) : (
									<List
										key={index}
										onClick={filterCategories}
										id={`${category.id}`}>
										{category.name}
									</List>
								);
							})}
						</ul>
					</div>
					<div>
						<button
							onClick={handleShowPrice}
							className="flex cursor-pointer items-center justify-between p-2 shadow shadow-black w-full ">
							<div>Price</div>
							<span
								className={cn(
									'transition-all duration-150 ease-in-out -rotate-180',
									!showFilter.price && 'rotate-0'
								)}>
								<ChevronDown />
							</span>
						</button>
						<div
							className={cn(
								'ml-2 mt-1 flex origin-top flex-col overflow-auto text-sm transition-all duration-200 ease-in-out max-h-[180px] scale-y-100',
								!showFilter.price &&
									' max-h-[0px] scale-y-0 mt-0'
							)}>
							<div className="w-full flex flex-col gap-2 py-2 px-2">
								<Input
									onChange={handleChangePrice}
									className="p-2"
									id="min"
									name="min"
									data-type="currency"
									type="text"
									placeholder="Min Price"
									value={price.min}
								/>
								<Input
									onChange={handleChangePrice}
									id="max"
									name="max"
									data-type="currency"
									type="text"
									placeholder="Max Price"
									value={price.max}
								/>
								{price.errorMessage && (
									<span className="text-rose-500 text-xs">
										{price.errorMessage}
									</span>
								)}

								<Button onClick={handleApplyPrice}>
									APPLY
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

type ListProps = {
	onClick: React.MouseEventHandler;
	id: string;
	children: React.ReactNode;
	className?: string;
};

const List: React.FC<ListProps> = ({ onClick, id, children, className }) => {
	return (
		<li
			onClick={onClick}
			id={id}
			className={`${className} cursor-pointer p-2 text-black`}>
			{children}
		</li>
	);
};

export default Product;
