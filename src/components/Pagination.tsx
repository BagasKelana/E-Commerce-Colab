import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Pagination() {
	const buttonData = [1, 2, 3, 4, 5];
	return (
		<>
			<div>
				{buttonData.map((number) => (
					<Link
						key={number}
						className={buttonVariants({ variant: 'outline' })}
						to={''}>
						{number}
					</Link>
				))}
			</div>
		</>
	);
}
