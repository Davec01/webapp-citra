export function Tabs({ children }) {
    return <div>{children}</div>;
  }
  
  export function TabsList({ children }) {
    return <div className="flex space-x-2">{children}</div>;
  }
  
  export function TabsTrigger({ children }) {
    return (
      <button className="px-4 py-2 border-b-2">
        {children}
      </button>
    );
  }
  