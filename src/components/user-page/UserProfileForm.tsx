import { useState } from 'react';
import * as z from 'zod';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RootState } from '@/redux/store';
import { signInStart, signInSuccess } from '@/redux/user/userSlice';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '../ui/form';

import { Circle } from 'lucide-react';

// const isImageFile = (fileName: string): boolean => {
//     const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
//     const fileExtension = fileName
//         .toLowerCase()
//         .slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
//     return allowedExtensions.includes('.' + fileExtension);
// };

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = [
//     'image/jpeg',
//     'image/jpg',
//     'image/png',
//     'image/webp'
// ];

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'This field has to be filled.' })
        .max(50),
    email: z
        .string()
        .min(2, { message: 'This field has to be filled.' })
        .email('email not valid'),
    image: z.any().nullable(),
    _method: z.string()
});

const UserProfileForm = () => {
    const dispatch = useDispatch();
    const { currentUser, loading } = useSelector(
        (state: RootState) => state.user
    );

    const [userProfile, setUserProfile] = useState<File[] | null>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            image: null,
            _method: 'PUT'
        }
    });

    const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();

        values.image && formData.append('image', values.image);
        formData.append('email', values.email);
        formData.append('name', values.name);
        formData.append('_method', 'PUT');

        try {
            dispatch(dispatch(signInStart()));
            const response: AxiosResponse = await axios.post(
                '/api/profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${currentUser?.token}`
                    }
                }
            );
            const data = await response.data;
            dispatch(signInSuccess({ ...currentUser, ...data.data }));
            setUserProfile(null);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        const { setValue } = form;
        if (files) {
            setUserProfile(files ? Array.from(files) : null);
            setValue('image', files[0]);
        }
    };

    const urlImage = userProfile?.[0]
        ? URL.createObjectURL(userProfile?.[0])
        : currentUser?.image
        ? `${import.meta.env.VITE_API_IMG}/${currentUser?.image}`
        : '/images/profile_3135715.png';

    return (
        <section className="p-6 bg-slate-100 border-l-0 border-t-4 lg:border-t-0 lg:border-l-4 border-teal-700 shadow shadow-slate-300">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                    className="input-form flex flex-col gap-4"
                >
                    <div className="w-full flex items-center gap-2">
                        <Circle className="bg-teal-700 rounded-full text-teal-700 h-3 w-3 animate-pulse" />
                        <span className="text-teal-700">
                            Perubahan berhasil
                        </span>
                    </div>
                    <section className="flex flex-col-reverse md:flex-row gap-6">
                        <div className="w-full flex flex-col">
                            <div className="flex md:shadow-md md:shadow-slate-300">
                                <section className="hidden xl:flex flex-col gap-2 bg-white rounded-s py-6 pl-6 pr-2 text-black font-normal">
                                    <div className="flex text-sm pb-2 whitespace-nowrap">
                                        Current Name
                                    </div>
                                    <div className="h-10 mb-4 flex items-center text-sm">
                                        Name
                                    </div>
                                    <div className="flex text-sm pb-2 whitespace-nowrap">
                                        Current Email
                                    </div>
                                    <div className="h-10 mb-4 flex items-center text-sm">
                                        Email
                                    </div>
                                </section>
                                <section className="flex flex-col gap-2 md:bg-white rounded w-full md:p-6 ">
                                    <div className="flex text-sm pb-2">
                                        {currentUser?.name}
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="h-14 space-y-0">
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className=" border-sky-700 focus-within:border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-700 focus-visible:ring-offset-0 rounded"
                                                        placeholder="Masukan nama baru disini.."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex text-sm pb-2">
                                        {currentUser?.email}
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="h-14 space-y-0">
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        className="border-sky-700 focus-within:border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-700 focus-visible:ring-offset-0 rounded"
                                                        placeholder="Masukan email baru disini.."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </section>
                            </div>
                            <div className="flex mt-6">
                                <Button
                                    className="rounded w-full"
                                    disabled={loading}
                                    variant={'primery'}
                                    type="submit"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>

                        <div className="px-10 py-2 md:py-5 space-y-4 flex flex-col items-center justify-center md:border md:border-sky-700 h-full rounded-md ">
                            <label
                                className="w-20 md:w-24 flex cursor-pointer"
                                htmlFor="image"
                            >
                                <Avatar className="h-20 w-20 md:h-24 md:w-24">
                                    <AvatarImage
                                        alt="image-avatar"
                                        src={urlImage}
                                    />
                                    <AvatarFallback>
                                        <img
                                            src="/images/profile_3135715.png"
                                            alt="user-image"
                                        />
                                    </AvatarFallback>
                                </Avatar>
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    name="image"
                                                    onChange={handleOnChange}
                                                    className="hidden"
                                                    id="image"
                                                    type="file"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Input
                                    onChange={handleOnChange}
                                    className="hidden"
                                    id="image=@"
                                    name="image=@"
                                    type="file"
                                />
                            </label>
                            <label
                                className="flex text-xs md:text-sm text-sky-700 rounded-md justify-center w-24 whitespace-nowrap p-2 border border-sky-700 items-center gap-2 cursor-pointer select-none"
                                htmlFor="image=@"
                            >
                                Select Image
                            </label>
                            <div className="text-xs text-neutral-500 whitespace-nowrap">
                                <p>Ukuran gambar: maks. 8 MB</p>
                                <p>Format gambar: .JPEG, .PNG</p>
                            </div>
                        </div>
                    </section>
                </form>
            </Form>
        </section>
    );
};

export default UserProfileForm;
