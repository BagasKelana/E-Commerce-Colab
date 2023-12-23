import { AlertDialogDescription } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { ShippingForm } from './ShippingForm';

const ShoppingCartModal = () => {
    const maxCount = 14;
    const [count, setCount] = useState(1);
    const Form = ShippingForm();

    const handleIncrement = () => {
        if (count < maxCount) {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleInput = (e: {
        currentTarget: { value: string };
        target: { value: string };
    }) => {
        let input =
            e.currentTarget.value.trim() === ''
                ? 1
                : parseInt(e.target.value, 10);
        input = Math.min(Math.max(input, 1), maxCount);
        if (!isNaN(input) && input >= 1 && input <= 14) {
            setCount(input);
        }
    };

    return (
        <AlertDialogDescription className="flex flex-col gap-[.5em] max-h-72 overflow-scroll no-scrollbar p-2">
            <div className="flex flex-col gap-[.5em]">
                <h3 className="text-lg font-semibold text-black">variant :</h3>
                <div className="flex gap-[.5em]">
                    <button className="bg-yellow-500 h-8 w-8 rounded-md"></button>
                    <button className="bg-red-500 h-8 w-8 rounded-md"></button>
                    <button className="bg-purple-500 h-8 w-8 rounded-md"></button>
                    <button className="bg-slate-500 h-8 w-8 rounded-md"></button>
                </div>
            </div>
            <div className="flex flex-col gap-[.5em]">
                <h3 className="text-lg font-semibold text-black">specs :</h3>
                <div className="flex gap-[.5em]">
                    <button className="border border-green-600 p-[.5em] text-center">
                        256GB SSD
                    </button>
                    <button className="border border-green-600 p-[.5em] text-center">
                        1TB HDD
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-[.5em]">
                <h3 className="text-lg font-semibold text-black">warranty :</h3>
                <div className="flex gap-[.5em]">
                    <button className="border border-green-600 p-[.5em] text-center">
                        3 years
                    </button>
                    <button className="border border-green-600 p-[.5em] text-center">
                        8 years
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-[.5em]">
                <h3 className="text-lg font-semibold text-black">unit :</h3>
                <div className="flex">
                    <button
                        onClick={handleDecrement}
                        className="w-8 border border-blue-700"
                    >
                        -
                    </button>
                    <input
                        type="text"
                        value={count}
                        onChange={handleInput}
                        className="text-center w-16 border border-red-500 focus:border-red-600"
                    />
                    <button
                        onClick={handleIncrement}
                        className="w-8 border border-blue-700"
                    >
                        +
                    </button>
                    <h4 className="flex gap-2 font-semibold ml-2">
                        From : <span className="text-red-700">{maxCount}</span>
                    </h4>
                </div>
            </div>
            <div className="flex gap-2 text-lg font-semibold">
                <p>From :</p>
                <p>Surabaya, Indonesia</p>
            </div>
            {Form}
        </AlertDialogDescription>
    );
};

export default ShoppingCartModal;
