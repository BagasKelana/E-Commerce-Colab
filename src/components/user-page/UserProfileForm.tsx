import { useState } from 'react';
import * as z from 'zod';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RootState } from '@/redux/store';
import {
    updateUserFailure,
    updateUserSuccess,
    updateUserStart
} from '@/redux/user/userSlice';
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
import { showImageAPI } from '@/helpers/showImageAPI';

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
            name: '',
            email: '',
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
            dispatch(dispatch(updateUserStart()));
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
            dispatch(updateUserSuccess({ ...currentUser, ...data.data }));
            setUserProfile(null);
        } catch (err: unknown) {
            const error = err as AxiosError;
            dispatch(updateUserFailure(error));
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

    const urlImage = userProfile?.[0] && URL.createObjectURL(userProfile?.[0]);

    const currentImage = currentUser?.image && showImageAPI(currentUser?.image);

    return (
        <section className="p-6 bg-slate-50 border-l-0 border-t-4 lg:border-t-0 lg:border-l-4 border-teal-600 shadow shadow-slate-300">
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
                            <div className="flex md:shadow-border md:shadow-slate-300 w-full md:bg-white rounded-lg">
                                <section className="flex w-full flex-col gap-2  md:p-6 ">
                                    <div className="flex text-sm ">
                                        {currentUser?.name}
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="h-14 space-y-1">
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className=" border-sky-700 focus-within:border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-700 focus-visible:ring-offset-0 rounded"
                                                        placeholder="Masukan nama baru disini.."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs text-rose-700/80" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex text-sm ">
                                        {currentUser?.email}
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="h-14 space-y-1">
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        className="border-sky-700 focus-within:border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-700 focus-visible:ring-offset-0 rounded"
                                                        placeholder="Masukan email baru disini.."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs text-rose-700/80" />
                                            </FormItem>
                                        )}
                                    />
                                </section>
                            </div>
                            <div className="flex mt-6">
                                <Button
                                    className="rounded w-full"
                                    isLoading={loading}
                                    variant={'primery'}
                                    type="submit"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>

                        <div className="px-10 py-2 md:py-5 space-y-4 flex flex-col items-center justify-center shadow-border shadow-slate-300  h-full rounded-md bg-white">
                            <label
                                className="w-20 md:w-24 flex cursor-pointer"
                                htmlFor="image"
                            >
                                <Avatar className="h-20 w-20 md:h-24 md:w-24">
                                    <AvatarImage
                                        alt="image-avatar"
                                        src={urlImage || currentImage}
                                    />
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
