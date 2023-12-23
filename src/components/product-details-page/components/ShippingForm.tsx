'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    fullname: z.string().min(2).max(50),
    phone_number: z.string(),
    address: z.string(),
    zip_code: z.string(),
    city: z.string(),
    region: z.string(),
    country: z.string()
});

export function ShippingForm() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: '',
            phone_number: '',
            address: '',
            zip_code: '',
            city: '',
            region: '',
            country: ''
        }
    });

    useEffect(() => {
        if (isFormSubmitted) {
            // Access city and country after the form has been submitted
            console.log(city, country);
        }
    }, [isFormSubmitted, city, country]);

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        setIsFormSubmitted(true);
        setCity(values.city);
        setCountry(values.country);
    }

    return (
        <Form {...form}>
            {!isFormSubmitted ? (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="your full name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your full name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="your phone number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your phone number.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address :</FormLabel>
                                <FormControl>
                                    <Input placeholder="street" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your address.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zip_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ZIP Code :</FormLabel>
                                <FormControl>
                                    <Input placeholder="zip_code" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your zip code.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City :</FormLabel>
                                <FormControl>
                                    <Input placeholder="your city" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your city.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Region</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="state/province/region"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your region country.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country :</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="your country"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your region country.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            ) : (
                <div className='flex gap-2 text-lg font-semibold'>
                    <p>To :</p>
                    {city && country && <p>{city}, {country}</p>}
                </div>
            )}
        </Form>
    );
}
