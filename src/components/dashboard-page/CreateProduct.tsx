import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { ImagePlus, Replace } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import CategoriesBox from './CategoriesBox';
import { Textarea } from '../ui/textarea';
import axios, { AxiosResponse } from 'axios';

export interface formInputProps {
    name: string;
    description: string;
    price: number;
    isAvailable: number;
    featured: number;
    category_id: string;
}

const CreateProduct = () => {
    const [selectedImages, setSelectedImages] = useState<File[] | null>(null);

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
                formInput.description &&
                formInput.price &&
                formInput.category_id
            ) {
                formData.append('name', formInput.name);
                formData.append('description', formInput.description);
                formData.append('price', String(formInput.price));
                formData.append('is_available', String(formInput.isAvailable));
                formData.append('is_featured', String(formInput.featured));
                formData.append('image[]', selectedImages[0]);
                formData.append('category_id', formInput.category_id);

                const response = await axios<AxiosResponse>(
                    `${import.meta.env.VITE_ADMIN_API}`,
                    {
                        method: 'POST',
                        data: formData,
                        headers: {
                            Authorization: `Bearer ${
                                import.meta.env.VITE_ADMIN_TOKEN
                            }`
                        }
                    }
                );

                console.log(response.data);
            } else {
                console.log('harus diisi');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex gap-4">
                {selectedImages?.map((file, index) => (
                    <div
                        className="h-fit flex flex-col items-center gap-4 "
                        key={index}
                    >
                        <img
                            alt="not found"
                            width={'250px'}
                            height={'250px'}
                            className="h-[250px] w-[250px] object-cover"
                            src={URL.createObjectURL(file)}
                        />
                        <div className="flex items-center gap-2 ">
                            <Button
                                variant="secondary"
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
                                <div className="rounded-md p-3 items-center justify-center flex bg-slate-100 w-fit cursor-pointer gap-2">
                                    <Replace className="h-4 w-4" /> Replace
                                </div>
                                <Input
                                    name={`replace-${index}`}
                                    id={`replace-${index}`}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleReplaceFile}
                                    type="file"
                                />
                            </Label>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleOnSubmit} className="mt-4">
                <div>
                    <h3>Images</h3>
                    <Label className="select-none" htmlFor="uploadFile">
                        <div className="rounded p-2 items-center justify-center flex bg-slate-200 w-fit cursor-pointer gap-2">
                            <ImagePlus /> Upload an Image
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
                    <div id="Input Detail">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            onChange={handleOnChange}
                            type="text"
                            name="name"
                            value={formInput.name}
                        />
                        <Label htmlFor="price">Price</Label>
                        <Input
                            onChange={handleOnChange}
                            id="price"
                            type="text"
                            name="price"
                            value={formInput.price}
                        />
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            onChange={handleOnChange}
                            className="resize-none"
                            id="description"
                            rows={13}
                            name="description"
                            value={formInput.description}
                        />
                        <CategoriesBox
                            InputForm={{ formInput, setFormInput }}
                        />
                        <div>
                            <Checkbox
                                name="featured"
                                value={formInput.featured}
                                onCheckedChange={() => {
                                    setFormInput((current) => ({
                                        ...current,
                                        featured: !current.featured ? 1 : 0
                                    }));
                                }}
                                id="featured"
                            />
                            <Label htmlFor="featured">Featured Product</Label>
                        </div>
                        <div>
                            <Checkbox
                                name="isAvailable"
                                checked={Boolean(formInput.isAvailable)}
                                onCheckedChange={() => {
                                    setFormInput((current) => ({
                                        ...current,
                                        isAvailable: !current.isAvailable
                                            ? 1
                                            : 0
                                    }));
                                }}
                                id="isAvailable"
                            />
                            <Label htmlFor="isAvailable">
                                Products Available
                            </Label>
                        </div>
                    </div>
                </div>
                <Button type="submit"> Submit</Button>
            </form>
           
        </div>
    );
};

export default CreateProduct;
