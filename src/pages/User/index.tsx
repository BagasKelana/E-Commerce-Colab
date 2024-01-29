import UserProfileDescription from '@/components/user-page/UserProfileDescription';
import UserProfileForm from '@/components/user-page/UserProfileForm';

const User = () => {
  return (
    <div className="w-full">
      <UserProfileDescription title="My Profile">
        Kelola informasi profil Anda untuk mengontrol, melindungi dan
        mengamankan akun
      </UserProfileDescription>
      <UserProfileForm />
    </div>
  );
};

export default User;
