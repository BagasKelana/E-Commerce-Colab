import { useState } from 'react';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '../ui/form';
import axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const formSchema = z
    .object({
        current_password: z.string().min(8, {
            message: 'Current password must be at least 8 characters.'
        }),
        new_password: z
            .string()
            .min(8, { message: 'New password must be at least 8 characters.' }),
        new_confirm_password: z.string().min(8, {
            message: 'New confirm password must be at least 8 characters.'
        })
    })
    .refine((data) => data.new_password === data.new_confirm_password, {
        message: "New Password don't match",
        path: ['new_confirm_password']
    });

const UserChangePasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { currentUser, loading } = useSelector(
        (state: RootState) => state.user
    );

    console.log(loading);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current_password: '',
            new_password: '',
            new_confirm_password: ''
        }
    });

    const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response: AxiosResponse = await axios.post(
                'https://roughy-loyal-daily.ngrok-free.app/api/change-password',

                values,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser?.token}`
                    }
                }
            );
            console.log(response);
            const data = await response.data;
            if (data.meta.code !== 200) {
                return;
            }
        } catch (err: unknown) {
            console.log(err);
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSubmit)}
                className="w-full col-span-5 bg-white p-4 input-form"
            >
                <div className="w-full pl-5 space-y-3">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Current Password</Label>
                        <FormField
                            control={form.control}
                            name="current_password"
                            render={({ field }) => (
                                <FormItem className="h-[60px]">
                                    <FormControl>
                                        <div className="flex items-center justify-center bg-white border border-input  pr-4 select-none focus-within:ring-1 focus-within:ring-black">
                                            <Input
                                                {...field}
                                                placeholder="Masukan Password Anda.."
                                                type={
                                                    !showPassword
                                                        ? 'password'
                                                        : 'text'
                                                }
                                                className="border-none bg-transparent px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                                            />
                                            <span
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setShowPassword(
                                                        (value) => !value
                                                    );
                                                }}
                                            >
                                                {!showPassword ? (
                                                    <Eye className="h-5 w-5 text-muted-foreground" />
                                                ) : (
                                                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="new_password">New Password</Label>
                        <FormField
                            control={form.control}
                            name="new_password"
                            render={({ field }) => (
                                <FormItem className="h-[60px]">
                                    <FormControl>
                                        <div className="flex items-center justify-center bg-white border border-input  pr-4 select-none focus-within:ring-1 focus-within:ring-black">
                                            <Input
                                                {...field}
                                                placeholder="Masukan password baru anda.."
                                                type={
                                                    !showPassword
                                                        ? 'password'
                                                        : 'text'
                                                }
                                                className="border-none bg-transparent px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                                            />
                                            <span
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setShowPassword(
                                                        (value) => !value
                                                    );
                                                }}
                                            >
                                                {!showPassword ? (
                                                    <Eye className="h-5 w-5 text-muted-foreground" />
                                                ) : (
                                                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="new_confirm_password">
                            New Confirm Password
                        </Label>
                        <FormField
                            control={form.control}
                            name="new_confirm_password"
                            render={({ field }) => (
                                <FormItem className="h-[60px]">
                                    <FormControl>
                                        <div className="flex items-center justify-center bg-white border border-input  pr-4 select-none focus-within:ring-1 focus-within:ring-black">
                                            <Input
                                                {...field}
                                                placeholder="Masukan password confirm password baru anda.."
                                                type={
                                                    !showPassword
                                                        ? 'password'
                                                        : 'text'
                                                }
                                                className="border-none bg-transparent px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                                            />
                                            <span
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setShowPassword(
                                                        (value) => !value
                                                    );
                                                }}
                                            >
                                                {!showPassword ? (
                                                    <Eye className="h-5 w-5 text-muted-foreground" />
                                                ) : (
                                                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button variant="primery" type="submit">
                        Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UserChangePasswordForm;
