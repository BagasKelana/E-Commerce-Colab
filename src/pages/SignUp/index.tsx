import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ErrorFetchType } from '@/fetch';

const formSchema = z
  .object({
    name: z.string().min(2, { message: 'name field has to be filled' }),
    email: z
      .string()
      .min(2, { message: 'email field has to be filled.' })
      .email('email not valid'),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    confirm_password: z.string().min(8, {
      message: 'Confirm password must be at least 8 characters.'
    })
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password']
  });

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorFetchType | null>(null);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  });
  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError(null);
      const response: AxiosResponse = await axios('/api/register', {
        method: 'POST',
        data: values
      });
      console.log(response);
      const data = await response.data;
      if (data.meta.code !== 200) {
        return;
      }
      navigate('/signin');
    } catch (err: unknown) {
      const error = err as AxiosError;
      const errorResponse = error.response?.data as ErrorFetchType;
      setError(errorResponse);

      console.log(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50">
      <div className="px-4 py-4 max-md:bg-slate-50 bg-teal-800 max-md:flex max-md:items-center max-md:justify-center max-md:pt-12">
        <div className="w-fit">
          <Link to="/">
            <img
              className="h-14 w-fit object-cover hue-rotate-[160deg] md:brightness-0 md:invert"
              src="/images/shopee-logo-31408.png"
              alt="logo"
            />
          </Link>
        </div>
      </div>
      <div className="w-full h-full py-10 flex items-center justify-center bg-slate-50 ">
        <div className="h-full hidden lg:flex items-center justify-center lg:w-3/5 ">
          <div>
            <img
              width={709}
              height={516}
              className="object-cover h-full"
              src="/images/undraw_shopping_re_hdd9.svg"
              alt="bg-images"
            />
          </div>
        </div>
        <div className="flex w-full md:w-2/5 h-full items-start md:items-center justify-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="input-form"
            >
              <Card className="w-screen md:w-[450px] bg-transparent max-md:border-none md:bg-white shadow-none md:shadow-lg shadow-slate-300">
                <CardHeader>
                  <CardTitle>SIGN UP</CardTitle>
                  <CardDescription>
                    {error && error?.data.credentials}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-[14px]">
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
                              <div className="flex items-center justify-center bg-white border border-input  pr-4 select-none focus-within:ring-1 focus-within:ring-black">
                                <Input
                                  autoComplete="new-password"
                                  placeholder="Password"
                                  {...field}
                                  type={!showPassword ? 'password' : 'text'}
                                  className="border-none bg-transparent px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                                />
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setShowPassword((value) => !value);
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
                      <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                          <FormItem className="h-[60px]">
                            <FormControl>
                              <div className="flex items-center justify-center bg-white border border-input  pr-4 select-none focus-within:ring-1 focus-within:ring-black">
                                <Input
                                  placeholder="Confirm Password"
                                  {...field}
                                  type={!showPassword ? 'password' : 'text'}
                                  className="border-none bg-transparent px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 "
                                />
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setShowPassword((value) => !value);
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
                    <div className="w-full flex flex-col">
                      <Button
                        disabled={loading}
                        className="w-full"
                        variant="primery"
                        type="submit"
                      >
                        SIGN IN
                      </Button>
                    </div>
                  </div>
                  <Separator />

                  <div className="flex justify-between items-center w-full gap-4">
                    <Link
                      type="button"
                      className="w-full text-rose-700 hover:text-rose-700/90 h-10 px-4 py-2 text-center border border-input bg-background hover:bg-accent"
                      to=""
                    >
                      Google
                    </Link>
                    <Link
                      type="button"
                      className="w-full text-indigo-700 hover:text-indigo-700/90 h-10 px-4 py-2 text-center border border-input bg-background hover:bg-accent"
                      to=""
                    >
                      Facebook
                    </Link>
                  </div>
                </CardContent>

                <CardFooter className="p-8 pt-4">
                  <div className="flex justify-center items-center w-full ">
                    <small>
                      Sudah Punya Akun?
                      <Link to="/signin">
                        <strong>SIGN IN</strong>
                      </Link>
                    </small>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
