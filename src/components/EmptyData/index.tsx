type EmptyDataProps = {
  isDataEmpty?: boolean | null;
  children: React.ReactNode;
  isLoading: boolean;
};

const EmptyData: React.FC<EmptyDataProps> = ({
  isDataEmpty,
  children,
  isLoading
}) => {
  if (isLoading) {
    return <>{children}</>;
  }

  return isDataEmpty ? (
    <div className="py-8 flex items-center justify-center">
      <h2>{'Unable to load data. Please refresh the page to try again.'}</h2>
    </div>
  ) : (
    <>{children}</>
  );
};

export default EmptyData;
