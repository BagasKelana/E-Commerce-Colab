import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';


import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <Card className="flex flex-col items-center justify-center h-96 w-80">
                <CardHeader>
                    <CheckCircle2 className='w-28 h-28 text-teal-700'/>
                </CardHeader>
                <CardContent className="flex flex-col items-center w-full gap-3 ">
                    <h1 className="text-3xl">Successful!</h1>
                    <p className="text-sm text-center">
                        Thank you for your order! Your purchase is now complete
                    </p>
                </CardContent>
                <CardFooter>
                    <Link to={'/'}>
                        <Button className="w-full bg-gradient-to-l from-teal-700 to-teal-800">
                            Continue Shopping
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SuccessPage;
