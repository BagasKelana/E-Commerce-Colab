type UserProfileDescriptionProps = {
    title: string;
    children: React.ReactNode;
};

const UserProfileDescription: React.FC<UserProfileDescriptionProps> = ({
    children,
    title
}) => {
    return (
        <div className="bg-white">
            <h1 className="font-semibold text-xl">{title}</h1>
            <p className="text-sm text-neutral-500">{children}</p>
            <hr className="mt-4" />
        </div>
    );
};

export default UserProfileDescription;
