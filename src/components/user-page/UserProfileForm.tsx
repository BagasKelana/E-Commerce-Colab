import { User } from '@/fetch';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { FetchErrorType } from '@/hook/useFetch';
import { useMemo, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '../ui/form';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
    signInFailure,
    signInStart,
    signInSuccess
} from '@/redux/user/userSlice';

type UserProfileFormProps = {
    currentUser: User | undefined;
    isLoading: boolean;
    isError: FetchErrorType;
    reFetch: () => Promise<void>;
};

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

type userProfileProps = {
    name: string;
    email: string;
    image: File[] | null;
};

const UserProfileForm: React.FC<UserProfileFormProps> = ({
    currentUser,
    isLoading,
    isError,
    reFetch
}) => {
    const user = useMemo(() => currentUser, [currentUser]);
    const dispatch = useDispatch();
    const { currentUser: myUser } = useSelector(
        (state: RootState) => state.user
    );

    console.log(isError, isLoading);

    const [userProfile, setUserProfile] = useState<userProfileProps>({
        name: '',
        email: '',
        image: null
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
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

        console.log(formData);
        try {
            const response: AxiosResponse = await axios.post(
                'https://roughy-loyal-daily.ngrok-free.app/api/profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${myUser?.token}`
                    }
                }
            );
            const data = await response.data;
            dispatch(signInSuccess({ ...myUser, name: data.data.name }));
            reFetch();
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        const { setValue } = form;
        if (files) {
            setUserProfile((current) => ({
                ...current,
                image: files ? Array.from(files) : null
            }));
            setValue('image', files[0]);
        }
    };

    const urlImage = userProfile?.image?.[0]
        ? URL.createObjectURL(userProfile?.image?.[0])
        : user?.image
        ? `${import.meta.env.VITE_DEVELOPE_API_IMG}/${user?.image}`
        : '/images/profile_3135715.png';

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSubmit)}
                className="input-form"
            >
                <div className="flex gap-4 mt-4 p-4">
                    <Table>
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell className="font-medium whitespace-nowrap text-neutral-500 ">
                                    Current Name
                                </TableCell>
                                <TableCell>{user?.name}</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell className="font-medium text-neutral-500">
                                    Name
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className="placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                                                        placeholder="change user name here!"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell className="font-medium text-neutral-500">
                                    Current Email
                                </TableCell>
                                <TableCell className="w-full">
                                    {user?.email}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell className="font-medium text-neutral-500">
                                    Email
                                </TableCell>
                                <TableCell className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        className="placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                                                        placeholder="change email here!"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell></TableCell>
                                <TableCell className="w-full ">
                                    <Button variant={'primery'} type="submit">
                                        Save Changes
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="px-10 py-5 space-y-4 flex flex-col items-center justify-center border border-input h-fit rounded-md ">
                        <label
                            className="w-24 flex cursor-pointer"
                            htmlFor="image"
                        >
                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    alt="image-avatar"
                                    src={urlImage}
                                />
                                <AvatarFallback>user image</AvatarFallback>
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
                            className="flex text-sm rounded-md justify-center w-24 whitespace-nowrap p-2 border border-input items-center gap-2 cursor-pointer select-none"
                            htmlFor="image=@"
                        >
                            Select Image
                        </label>
                        <div className="text-xs text-neutral-500 whitespace-nowrap">
                            <p>Ukuran gambar: maks. 1 MB</p>
                            <p>Format gambar: .JPEG, .PNG</p>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default UserProfileForm;
