import UserChangePasswordForm from './components/UserChangePasswordForm';
import UserProfileDescription from './components/UserProfileDescription';

const UserChangePassword = () => {
  return (
    <main className="w-full col-span-5 bg-white p-4">
      <UserProfileDescription title="Change Password">
        Kelola password Anda untuk mengontrol, melindungi dan mengamankan akun
      </UserProfileDescription>
      <UserChangePasswordForm />
    </main>
  );
};

export default UserChangePassword;
