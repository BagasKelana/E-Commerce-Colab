import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

const UserProfileForm = () => {
    return (
        <form className="input-form ">
            <div className="flex gap-4 mt-4 p-4">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium whitespace-nowrap text-neutral-500 ">
                                Current Name
                            </TableCell>
                            <TableCell>Lional Messi</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium text-neutral-500">
                                Name
                            </TableCell>
                            <TableCell>
                                <Input
                                    className="placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                                    placeholder="change user name here!"
                                    name="name"
                                    type="text"
                                    id="name"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium text-neutral-500">
                                Current Email
                            </TableCell>
                            <TableCell className="w-full">
                                sonyfirmanda@gmail.com
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium text-neutral-500">
                                Email
                            </TableCell>
                            <TableCell className="w-full">
                                <Input
                                    className="placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                                    placeholder="change email here!"
                                    name="email"
                                    id="email"
                                    type="email"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow className="hover:bg-white">
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
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>hilal</AvatarFallback>
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
    );
};

export default UserProfileForm;
