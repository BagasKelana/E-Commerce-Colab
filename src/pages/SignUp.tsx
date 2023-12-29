import AuthForm from '@/components/auth-page/AuthForm';
import { Input } from '@/components/ui/input';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface formDataProps {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export default function SignUp() {
    const [formData, setFormData] = useState<formDataProps>({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (
                formData.name &&
                formData.email &&
                formData.password &&
                formData.confirm_password
            ) {
                if (formData.password === formData.confirm_password) {
                    const form = new FormData();

                    for (const property in formData) {
                        form.append(
                            property,
                            formData[property as keyof formDataProps]
                        );
                    }

                    console.log(form.values);

                    const response: AxiosResponse = await axios(
                        'https://roughy-loyal-daily.ngrok-free.app/api/register',
                        {
                            method: 'POST',
                            data: form
                        }
                    );
                    const data = await response.data;
                    if (data.success === false) {
                        setLoading(false);
                        setError(data.message);
                        return;
                    }

                    console.log(data);
                    setError(null);
                    navigate('/signin');
                }
            }
        } catch (error: any) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <AuthForm
                title="Sign Up"
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                confirmPassword={true}
            >
                <Input
                    required
                    minLength={3}
                    type="text"
                    placeholder="name"
                    className="placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                    id="name"
                    onChange={handleChange}
                />
            </AuthForm>

            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to={'/signin'}>
                    <span className="text-blue-700">Sign In</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
