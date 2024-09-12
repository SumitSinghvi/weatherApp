import { type ReactNode } from "react";

// Main Card component
const HighlightCard = ({ children }: { children: ReactNode}) => {
  return (
    <div className="max-w-80 rounded-lg bg-white">
      {children}
    </div>
  );
};

// Card Head
HighlightCard.Head = ({ children }: { children: ReactNode}) => {
  return (
    <div className="px-4 py-2 rounded-t-lg">
      {children}
    </div>
  );
};

// Card Middle
HighlightCard.Middle = ({ children }: { children: ReactNode}) => {
  return <div className="px-4 py-4 flex justify-center items-center">{children}</div>;
};

// Card Bottom
HighlightCard.Bottom = ({ children }: { children: ReactNode}) => {
  return (
    <div className="px-4 py-2 rounded-b-lg">
      {children}
    </div>
  );
};

// unit 
HighlightCard.Unit = ({ children }: { children: ReactNode}) => {
    return (
      <div className="">
        {children}
      </div>
    );
  };



export default HighlightCard;
