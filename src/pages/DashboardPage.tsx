import CreateProduct from '@/components/dashboard-page/CreateProduct';
import { Button } from '@/components/ui/button';
import Layout from '@/layout/Layout';
import { Plus } from 'lucide-react';

const DashboardPage = () => {
    return (
        <Layout>
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
        </Layout>
    );
};

export default DashboardPage;
