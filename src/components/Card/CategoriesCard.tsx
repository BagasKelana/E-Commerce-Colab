import { cn } from '@/lib/utils';

import { Card, CardContent } from '@/components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;

type CategoriesCardProps = CardProps & {
	title: string;
	src: string;
};

const CategoriesCard = ({ className, title, src }: CategoriesCardProps) => {
	return (
		<div
			className={cn(
				'inline-block m-0 p-0 flex-shrink-0 w-full  ',
				className
			)}>
			<div className="mb-2 px-0.5 md:px-2 relative min-w-full">
				<div className="h-full ">
					<Card className=" min-w-[100px] md:min-w-[182.333px]  rounded-md">
						<img
							className="object-cover md:w-[182.333px] w-full "
							height={512}
							width={512}
							src={src}
							alt="card-img"
						/>

						<hr />
						<CardContent className="text-center p-4">
							<h3 className="font-bold">{title}</h3>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default CategoriesCard;
