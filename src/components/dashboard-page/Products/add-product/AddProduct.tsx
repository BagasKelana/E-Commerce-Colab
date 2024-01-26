import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import CategoriesBox from './CategoriesBox';
import { Textarea } from '@/components/ui/textarea';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import ToggleBox from './ToggleBox';
import { Image } from 'lucide-react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export interface formInputProps {
    name: string;
    description: string;
    price: number;
    isAvailable: number;
    featured: number;
    category_id: string;
}

const AddProduct = () => {
    const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
    const { currentUser } = useSelector((state: RootState) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    console.log(error);

    const [formInput, setFormInput] = useState<formInputProps>({
        name: '',
        description: '',
        price: 0,
        isAvailable: 1,
        featured: 0,
        category_id: ''
    });

    const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedImages(Array.from(files));
            return (event.target.value = '');
        }
    };

    const handleReplaceFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const index = event.target.id.split('-')[1];
            setSelectedImages((current) => {
                if (current) {
                    return current.map((file, i) =>
                        i === +index ? files[0] : file
                    );
                }
                return current;
            });
        }
    };

    const handleRemove = (index: number) => {
        setSelectedImages((current) => {
            if (current) {
                return current.filter((_, i) => i !== index);
            }
            return current;
        });
    };

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target;
        const pattern = /^[0-9]*$/;

        if (target) {
            if (target.name === 'name' || target.name === 'description') {
                setFormInput((current) => ({
                    ...current,
                    [target.name]: target.value
                }));
            } else {
                if (pattern.test(target.value)) {
                    setFormInput((current) => ({
                        ...current,
                        [target.name]: target.value
                    }));
                }
            }
        }
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (
                selectedImages?.length &&
                formInput.name &&
                formInput.price &&
                formInput.category_id
            ) {
                setIsLoading(true);
                formData.append('name', formInput.name);
                formData.append('description', formInput.description);
                formData.append('price', String(formInput.price));
                formData.append('is_available', String(formInput.isAvailable));
                formData.append('is_featured', String(formInput.featured));
                formData.append('category_id', formInput.category_id);
                formData.append('image[]', selectedImages[0]);
                for (let index = 0; index < selectedImages.length; index++) {
                    formData.append('image[]', selectedImages[index]);
                }

                const response = await axios<AxiosResponse>(`/admin/product`, {
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization: `Bearer ${currentUser?.token}`
                    }
                });

                console.log(response.data);
            } else {
                console.log('harus diisi');
            }
        } catch (error: unknown) {
            const err = error as AxiosError;
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full ">
            <div className="w-full flex flex-col px-8 py-6">
                <h1>Add a Product</h1>
                <p>Orders placed across your store</p>
            </div>
            <div className="w-full pb-8">
                <form onSubmit={handleOnSubmit} className="mt-4 px-8">
                    <div className="flex gap-8">
                        <section className="flex-1 space-y-4">
                            <div id="INPUT_NAME">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    onChange={handleOnChange}
                                    type="text"
                                    name="name"
                                    value={formInput.name}
                                />
                            </div>
                            <div id="INPUT_DESCRITPION">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    onChange={handleOnChange}
                                    className="resize-none "
                                    id="description"
                                    rows={13}
                                    name="description"
                                    value={formInput.description}
                                />
                            </div>
                            <div
                                className="flex flex-col gap-2"
                                id="UPLOAD_IMAGES"
                            >
                                <div className="flex gap-4 flex-wrap px-4 ">
                                    {selectedImages?.map((file, index) => (
                                        <div
                                            className="h-fit flex flex-col items-center gap-4 "
                                            key={index}
                                        >
                                            <div className="h-[150px] w-[150px] flex justify-center">
                                                <img
                                                    alt="not found"
                                                    className=" object-cover h-full"
                                                    src={URL.createObjectURL(
                                                        file
                                                    )}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 ">
                                                <Button
                                                    className="h-8 text-xs font-normal rounded"
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        handleRemove(index);
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                                <Label
                                                    className="select-none "
                                                    htmlFor={`replace-${index}`}
                                                >
                                                    <div className=" flex items-center h-8 text-xs border border-teal-700 rounded px-3 font-normal cursor-pointer">
                                                        Replace
                                                    </div>
                                                    <Input
                                                        name={`replace-${index}`}
                                                        id={`replace-${index}`}
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={
                                                            handleReplaceFile
                                                        }
                                                        type="file"
                                                    />
                                                </Label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h3 className="font-semibold">Images</h3>
                                    <Label
                                        className="select-none"
                                        htmlFor="uploadFile"
                                    >
                                        <div className="w-full h-[200px] flex flex-col items-center justify-center gap-4 bg-transparent space-x-1 border-dashed  border border-slate-500 rounded">
                                            <div>
                                                <span>
                                                    Drag your images here or{' '}
                                                </span>
                                                <strong>
                                                    Browse from device
                                                </strong>
                                            </div>
                                            <Image className="w-8 h-8" />
                                        </div>
                                        <Input
                                            id="uploadFile"
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                            onChange={handleUploadFiles}
                                            type="file"
                                            name="uploadFile"
                                        />
                                    </Label>
                                </div>
                            </div>
                            <Button
                                isLoading={isLoading}
                                className="w-full mt-8 rounded"
                                variant={'primery'}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </section>
                        <Card className="w-[300px] h-fit">
                            <CardContent className="py-8 space-y-4">
                                <CategoriesBox
                                    InputForm={{ formInput, setFormInput }}
                                />
                                <ToggleBox
                                    key={'featured'}
                                    title="Featured Product"
                                    toggleInput="featured"
                                    InputForm={{ formInput, setFormInput }}
                                />
                                <ToggleBox
                                    key={'isAvailable'}
                                    title="Products Available"
                                    toggleInput="isAvailable"
                                    InputForm={{ formInput, setFormInput }}
                                />

                                <Input
                                    onChange={handleOnChange}
                                    id="price"
                                    type="text"
                                    name="price"
                                    value={formInput.price}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
