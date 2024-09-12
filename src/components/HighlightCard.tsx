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
interface HighlightCardMiddleProps {
  children: ReactNode;
  unit?: string;
  loc?: 'top' | 'bottom';
}
// Card Middle
HighlightCard.Middle = ({ children, unit, loc }: HighlightCardMiddleProps) => {
  return <div className="px-4 py-4 flex gap-2 justify-center items-center">
    {children}
    <span className={`font-semibold text-lg ${loc == 'top' ? 'mb-auto' : 'mt-auto'}`}>{unit}</span>
  </div>;
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
