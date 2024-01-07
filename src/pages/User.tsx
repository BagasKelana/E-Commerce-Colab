import UserProfileDescription from '@/components/user-page/UserProfileDescription';
import UserProfileForm from '@/components/user-page/UserProfileForm';

const User = () => {
    return (
        <main className="w-full col-span-5 bg-white p-4">
            <UserProfileDescription title="My Profile">
                Kelola informasi profil Anda untuk mengontrol, melindungi dan
                mengamankan akun
            </UserProfileDescription>
            <UserProfileForm />
        </main>
    );
};

export default User;
