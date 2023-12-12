import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import './form.css';
interface AuthFormProps {
    handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    loading?: boolean;
    children?: React.ReactNode;
    confirmPassword?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
    handleSubmit,
    handleChange,
    showPassword,
    setShowPassword,
    loading,
    children,
    title,
    confirmPassword = false
}) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {children}
            <Input
                required
                minLength={10}
                type="email"
                placeholder="email"
                className="placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                id="email"
                onChange={handleChange}
            />
            <div className="flex items-center justify-center border border-input rounded-md pr-4 select-none focus-within:ring-1 focus-within:ring-black">
                <Input
                    required
                    minLength={8}
                    type={!showPassword ? 'password' : 'text'}
                    placeholder="password"
                    className=" border-none bg-transparent px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 "
                    id="password"
                    onChange={handleChange}
                />
                <span
                    className="cursor-pointer"
                    onClick={() => {
                        setShowPassword((value) => !value);
                    }}
                >
                    {!showPassword ? <Eye /> : <EyeOff />}
                </span>
            </div>
            {confirmPassword && (
                <div className="flex items-center justify-center border border-input rounded-md pr-4 select-none focus-within:ring-1 focus-within:ring-black">
                    <Input
                        required
                        minLength={8}
                        type={!showPassword ? 'password' : 'text'}
                        placeholder="confirm password"
                        className=" border-none bg-transparent px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 "
                        id="confirm_password"
                        onChange={handleChange}
                    />
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            setShowPassword((value) => !value);
                        }}
                    >
                        {!showPassword ? <Eye /> : <EyeOff />}
                    </span>
                </div>
            )}
            <Button
                type="submit"
                disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
                {loading ? 'Loading...' : title}
            </Button>
        </form>
    );
};

export default AuthForm;
