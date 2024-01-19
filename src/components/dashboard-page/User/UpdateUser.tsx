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

import { Input } from '@/components/ui/input';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ToggleBox from './ToggleBox';
import { useParams } from 'react-router-dom';

export const formSchema = z.object({
    name: z.string().min(2, { message: 'name field has to be filled' }),
    email: z
        .string()
        .min(2, { message: 'email field has to be filled.' })
        .email('email not valid'),
    password: z.string().min(8, {
        message: 'password field has to be more than 8 character'
    }),
    is_active: z.string()
});

export default function UpdateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { currentUser } = useSelector((state: RootState) => state.user);
    const { id } = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            is_active: '1'
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
            formData.append('password', values.password);
            formData.append('is_active', values.is_active);
            formData.append('_method', 'PUT');

            if (imageFile) {
                formData.append('image', imageFile);
            }

            const url = `https://roughy-loyal-daily.ngrok-free.app/api/admin/user/${id}`;

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
        <div className="w-full h-full flex items-center justify-center p-9">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                    className="input-form"
                >
                    <Card className="md:w-[450px] bg-transparent bg-white">
                        <CardHeader>
                            <CardTitle>Update User</CardTitle>
                            <CardDescription>
                                {error && error?.message}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-[14px]">
                                <div className="flex justify-center">
                                    <Label
                                        className="cursor-pointer"
                                        htmlFor="userImage"
                                    >
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
                                            onChange={handleFileChange}
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
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="h-[60px]">
                                                <FormControl>
                                                    <Input
                                                        className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-none"
                                                        placeholder="Password"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="pb-8">
                                        <ToggleBox
                                            title="User Active"
                                            setForm={form.setValue}
                                        />
                                    </div>
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
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
