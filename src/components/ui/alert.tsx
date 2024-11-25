export const Alert = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <div className={`p-4 border rounded ${className}`}>
        {children}
      </div>
    );
  };
  
  export const AlertDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <div className={className}>
        {children}
      </div>
    );
  };
  