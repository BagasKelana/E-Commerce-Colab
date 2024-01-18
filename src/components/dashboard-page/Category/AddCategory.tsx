import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().min(2, { message: 'name field has to be filled' })
});

export default function AddCategory({ isDisabled }: { isDisabled: boolean }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { currentUser } = useSelector((state: RootState) => state.user);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = event.target.files;
            setImageFile(files[0]);
        }
    };
    const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            setLoading(true);
            setError(null);
            const formData = new FormData();

            formData.append('name', values.name);

            if (imageFile) {
                formData.append('image', imageFile);
            }

            const url =
                'https://roughy-loyal-daily.ngrok-free.app/api/admin/category';

            const response: AxiosResponse = await axios.post(url, formData, {
                headers: { Authorization: 'Bearer ' + currentUser?.token }
            });

            console.log(response);
            const data = await response.data;

            if (data.meta.code !== 200) {
                return;
            }
        } catch (err: unknown) {
            const error = err as AxiosError;

            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger disabled={isDisabled} asChild>
                <Button variant="primery">Add Category</Button>
            </DialogTrigger>
            <DialogContent className="p-0 w-[400px] z-[100]">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleOnSubmit)}
                        className="input-form"
                    >
                        <Card className="md:w-full bg-transparent border-none">
                            <CardHeader>
                                <CardTitle>Add Category</CardTitle>
                                <CardDescription>
                                    {error && error?.message}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-[14px]">
                                    <div className="flex justify-center">
                                        <Label htmlFor="userImage">
                                            <img
                                                height={350}
                                                width={350}
                                                className="object-cover h-[250px] aspect-[1/1]"
                                                src={
                                                    imageFile
                                                        ? URL.createObjectURL(
                                                              imageFile
                                                          )
                                                        : '/images/categories/Porodo Gaming PS5 Edge Controller 6in1 Thumb Stick Caps + Back Buttons combo.jpg'
                                                }
                                            />

                                            <Input
                                                id="userImage"
                                                name="userImage"
                                                type="file"
                                                className=" hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-none"
                                                placeholder="Images"
                                                onChange={(event) => {
                                                    handleFileChange(event);
                                                }}
                                                accept="image/*"
                                            />
                                        </Label>
                                    </div>

                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="h-[60px]">
                                                    <FormControl>
                                                        <Input
                                                            className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-none"
                                                            placeholder="Name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="w-full flex flex-col">
                                            <Button
                                                disabled={loading}
                                                className="w-full rounded-none"
                                                variant="primery"
                                                type="submit"
                                            >
                                                Add Category
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
