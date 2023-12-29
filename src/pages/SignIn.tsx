import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    signInStart,
    signInSuccess,
    signInFailure
} from '../redux/user/userSlice';
import AuthForm from '@/components/auth-page/AuthForm';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { RootState } from '@/redux/store';

interface formDataProps {
    email: string;
    password: string;
}

export default function SignIn() {
    const [formData, setFormData] = useState<formDataProps>({
        email: '',
        password: ''
    });
    const { loading, error } = useSelector((state: RootState) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
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
            dispatch(signInStart());
            if (formData.email && formData.password) {
                const form = new FormData();
                for (const property in formData) {
                    form.append(
                        property,
                        formData[property as keyof formDataProps]
                    );
                }

                const response: AxiosResponse = await axios(
                    'https://roughy-loyal-daily.ngrok-free.app/api/login',
                    {
                        method: 'POST',
                        data: form
                    }
                );
                const data = await response.data;
                console.log(data);
                if (data.success === false) {
                    dispatch(signInFailure(data.message));
                    return;
                }
                dispatch(signInSuccess(data.data));
                navigate('/');
            }
        } catch (err: unknown) {
            const error = err as AxiosError;
            if (error.message) dispatch(signInFailure(error.message));
        }
    };
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <AuthForm
                title="Sign In"
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
            />
            <div className="flex gap-2 mt-5">
                <p>Dont have an account?</p>
                <Link to={'/signup'}>
                    <span className="text-blue-700">Sign Up</span>
                </Link>
            </div>
            {Boolean(error) && (
                <p className="text-red-500 mt-5">
                    {error && 'terjadi masalah bos'}
                </p>
            )}
        </div>
    );
}
