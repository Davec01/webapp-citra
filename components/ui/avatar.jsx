export function Avatar({ children, className }) {
    return (
      <div className={`rounded-full overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }
  