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
    FormLabel,
    FormMessage
} from '../ui/form';

type UserProfileFormProps = {
    currentUser: User | undefined;
    isLoading: boolean;
    isError: FetchErrorType;
};
const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'This field has to be filled.' })
        .max(50),
    email: z
        .string()
        .min(2, { message: 'This field has to be filled.' })
        .email('email not valid'),
    image: z.string()
});

const UserProfileForm: React.FC<UserProfileFormProps> = ({
    currentUser,
    isLoading,
    isError
}) => {
    const user = useMemo(() => currentUser, [currentUser]);

    const [imageUrl, setImageUrl] = useState(user?.image);

    console.log(isError, isLoading);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            image: user?.image ? user?.image : ''
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="input-form">
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
                            htmlFor="image=@"
                        >
                            <Avatar className=" h-24 w-24">
                                <AvatarImage
                                    src={
                                        user?.image
                                            ? user?.image
                                            : '/images/profile_3135715.png'
                                    }
                                />
                                <AvatarFallback>user image</AvatarFallback>
                            </Avatar>
                            <Input
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
