import { useLocation } from 'react-router-dom';
import {
    MessageSquare,
    Heart,
    ShoppingCart,
    Share2,
    UserRoundPlus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Separator } from '../../ui/separator';

import ToggleButton from '../template/ToggleButton';
import OpenModalButton from '../template/OpenModalButton';
import PopoverButton from '../template/PopoverButton';

const ProductDescriptions = () => {
    const { state } = useLocation();
    const { name, price } = state.productData;

    const formattedPrice = price?.toLocaleString('id-ID', {
        currency: 'IDR'
    });

    const buttonConfigs = [
        {
            textIcon: MessageSquare,
            text: 'Chat',
            buttonClassName:
                'flex flex-col items-center justify-center p-[.2rem]',
            iconClassName: 'w-4 h-4 sm:w-7 sm:h-7',
            textClassName: 'text-xs sm:font-base sm:text-sm sm:font-semibold select-none'
        },
        {
            textIcon: Heart,
            text: 'Wishlist',
            buttonClassName:
                'flex flex-col items-center justify-center p-[.2rem]',
            iconClassName: 'w-4 h-4 sm:w-7 h-7',
            textClassName: 'text-xs sm:font-base sm:text-sm sm:font-semibold select-none'
        }
    ];

    return (
        <div className="max-h-screen overflow-y-scroll no-scrollbar flex flex-col gap-[.5em] md:gap-[.2em]">
            <h2
                className="scroll-m-20 p-1 text-xl tracking-tight font-bold md:text-3xl md:font-semibold first:mt-1 max-w-max"
                tabIndex={0}
            >
                {name}
            </h2>
            <Separator className="my-2" />
            <div className="flex justify-between items-center py-[.8em]">
                <h4
                    className="scroll-m-20 text-lg md:text-2xl font-semibold tracking-tight p-[.3rem]"
                    tabIndex={0}
                >
                    Rp{formattedPrice}
                </h4>
                <div className="flex justify-around w-[50%] md:w-[30%]">
                    {buttonConfigs.map((config, index) => (
                        <ToggleButton key={index} {...config} />
                    ))}

                    <OpenModalButton
                        textIcon={ShoppingCart}
                        text="Cart"
                        buttonClassName="flex flex-col items-center justify-center p-[.2rem]"
                        iconClassName="w-4 h-4 sm:w-7 sm:h-7"
                        textClassName="text-xs sm:font-base sm:text-sm sm:font-semibold select-none"
                    />

                    <PopoverButton
                        textIcon={Share2}
                        text="Cart"
                        buttonClassName="flex flex-col items-center justify-center p-[.2rem]"
                        iconClassName="w-4 h-4 sm:w-7 sm:h-7"
                        textClassName="text-xs sm:font-base sm:text-sm sm:font-semibold select-none"
                    />
                </div>
            </div>
            <Separator className="my-2" />
            <div className="w-full flex justify-between items-center px-[.8em]">
                <div className="flex justify-center items-center gap-1">
                    <h4 className="text-sm text-white h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                        JD
                    </h4>
                    <button className="p-2 rounded-md text-sm font-semibold">
                        John Doe
                    </button>
                </div>
                <ToggleButton
                    textIcon={UserRoundPlus}
                    text="Follow"
                    buttonClassName="flex items-center justify-center p-2 gap-1 border border-slate-500"
                    iconClassName="w-4 h-4"
                />
            </div>
            <Tabs defaultValue="descriptions" className="w-full">
                <TabsList className="w-full gap-[.2em] text-sm p-1">
                    <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
                    <Separator className="rotate-90 w-[1em]" />
                    <TabsTrigger value="specifications">
                        Specifications
                    </TabsTrigger>
                    <Separator className="rotate-90 w-[1em]" />
                    <TabsTrigger value="Q & A">Q & A</TabsTrigger>
                </TabsList>
                <TabsContent value="descriptions">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
                    quis dolorem porro sed consectetur totam soluta, voluptates
                    saepe provident nostrum a alias minus animi corrupti modi
                    perferendis distinctio ea sint sit, hic, earum autem minima!
                    Totam quod rerum obcaecati omnis officia nostrum. Omnis
                    praesentium nesciunt quibusdam iusto odio modi aliquid vero
                    ut sed, amet aperiam tempora sapiente quisquam suscipit
                    voluptas magni neque tempore aspernatur doloremque molestias
                    provident possimus quidem ducimus est? Necessitatibus,
                    repellendus aperiam tenetur, sequi adipisci amet
                    exercitationem accusamus magnam quidem non nesciunt
                    dignissimos, doloremque laborum ipsa distinctio iure.
                    Delectus saepe voluptas eos mollitia sequi ea libero, ullam
                    quam blanditiis in fuga aliquam commodi alias vero assumenda
                    similique. Odio deleniti ducimus animi adipisci nostrum
                    facere eos, corporis cumque fuga vel quasi vero reiciendis
                    officia eveniet voluptas commodi excepturi, molestiae
                    placeat recusandae doloremque eius temporibus voluptatem
                    nemo eaque. Incidunt iure quis adipisci odit. Vel commodi
                    laboriosam hic rem officia adipisci animi, excepturi ullam!
                    Distinctio cupiditate quasi praesentium sunt at
                    reprehenderit delectus, asperiores, id debitis illo a fugit
                    eaque, recusandae officiis sit officia doloremque sint
                    dignissimos? Pariatur tenetur ipsum laborum animi at
                    dignissimos in voluptatum tempore quia, cupiditate placeat
                    odio alias accusamus culpa quis suscipit soluta
                    reprehenderit explicabo accusantium ipsam eius?
                </TabsContent>
                <TabsContent value="specifications">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
                    magnam voluptatibus minus. Rem maiores molestiae soluta
                    necessitatibus voluptatibus, molestias asperiores assumenda
                    cupiditate odit nemo animi, earum illo? Vitae, minima
                    quaerat!
                </TabsContent>
                <TabsContent value="Q & A" tabIndex={-1}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
                    magnam voluptatibus minus. Rem maiores molestiae soluta
                    necessitatibus voluptatibus, molestias asperiores assumenda
                    cupiditate odit nemo animi, earum illo? Vitae, minima
                    quaerat!
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProductDescriptions;
