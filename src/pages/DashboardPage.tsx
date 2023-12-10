import { Plus } from 'lucide-react';

import CreateProduct from '@/components/dashboard-page/CreateProduct';
import { Button } from '@/components/ui/button';


const DashboardPage = () => {
    return (
        <>
            <div className="flex justify-between w-full pl-4 md:px-10 my-6 ">
                <div>
                    <h1>Products</h1>
                </div>
                <div>
                    <Button>
                        <Plus /> Add New
                    </Button>
                </div>
            </div>
            <section className="w-full pl-4 md:px-10 my-6 ">
                <CreateProduct />
            </section>
        </>
    );
};

export default DashboardPage;
