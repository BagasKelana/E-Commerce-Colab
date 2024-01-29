type ErrorBoundaryProps = {
  errorMessages?: string | null;
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  errorMessages,
  children
}) => {
  return errorMessages ? (
    <div className="py-8 flex items-center justify-center">
      <h2>
        {errorMessages ||
          'Unable to load data. Please refresh the page to try again.'}
      </h2>
    </div>
  ) : (
    <>{children}</>
  );
};

export default ErrorBoundary;
