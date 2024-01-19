import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
    name: z.string().min(2, { message: 'name field has to be filled' }),
    email: z
        .string()
        .min(2, { message: 'email field has to be filled.' })
        .email('email not valid')
});

export default function AddUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { currentUser } = useSelector((state: RootState) => state.user);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: ''
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
            formData.append('email', values.email);

            if (imageFile) {
                formData.append('image', imageFile);
            }

            const url =
                'https://roughy-loyal-daily.ngrok-free.app/api/admin/user';

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
            <DialogTrigger asChild>
                <Button variant="primery">Add User</Button>
            </DialogTrigger>
            <DialogContent className="p-0 w-[400px] z-[100]">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleOnSubmit)}
                        className="input-form"
                    >
                        <Card className="md:w-full bg-transparent border-none">
                            <CardHeader>
                                <CardTitle>Add User</CardTitle>
                                <CardDescription>
                                    {error && error?.message}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-[14px]">
                                    <div className="flex justify-center">
                                        <Label htmlFor="userImage">
                                            <Avatar className="h-14 w-14">
                                                <AvatarImage
                                                    src={
                                                        imageFile
                                                            ? URL.createObjectURL(
                                                                  imageFile
                                                              )
                                                            : ''
                                                    }
                                                />
                                                <AvatarFallback>
                                                    <img
                                                        src="/images/profile_3135715.png"
                                                        alt="fallback for avatar user"
                                                    />
                                                </AvatarFallback>
                                            </Avatar>
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

                                    <div className="space-y-[10px]">
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
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="h-[60px]">
                                                    <FormControl>
                                                        <Input
                                                            className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-none"
                                                            placeholder="Email"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <Button
                                            disabled={loading}
                                            className="w-full"
                                            variant="primery"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                                <Separator />
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
