const ErrorHandling = ({
    children,
    error
}: {
    children: React.ReactNode;
    error: unknown;
}) => {
    return (
        <>
            {error ? (
                <div className="w-full xl:w-4/5 min-h-[200px] flex items-center justify-center text-3xl">
                    Terjadi Error, Silahkan Coba Lagi
                </div>
            ) : (
                <div className="w-full xl:w-4/5 h-full flex flex-col">
                    {children}
                </div>
            )}
        </>
    );
};

export default ErrorHandling;
