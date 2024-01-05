import UserProfileForm from '@/components/user-page/UserProfileForm';

const User = () => {
    return (
        <main className="w-full col-span-5 bg-white p-4">
            <UserProfileDescription />
            <UserProfileForm />
        </main>
    );
};

const UserProfileDescription = () => {
    return (
        <>
            <h2 className="font-medium text-base">My Profile</h2>
            <p className="text-sm text-neutral-500">
                Kelola informasi profil Anda untuk mengontrol, melindungi dan
                mengamankan akun
            </p>
            <hr className="mt-4" />
        </>
    );
};

export default User;
