type UserProfileDescriptionProps = {
    title: string;
    children: React.ReactNode;
};

const UserProfileDescription: React.FC<UserProfileDescriptionProps> = ({
    children,
    title
}) => {
    return (
        <>
            <h2 className="font-medium text-base">{title}</h2>
            <p className="text-sm text-neutral-500">{children}</p>
            <hr className="mt-4" />
        </>
    );
};

export default UserProfileDescription;
