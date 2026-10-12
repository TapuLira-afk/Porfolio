import type { ReactNode } from "react";

type Props = {
  label?: string;
  children: ReactNode;
  className?: string;
};

export default function DialogBox({ label, children, className = "" }: Props) {
  return (
    <div className={`dialog-wrap ${className}`}>
      {label && <div className="dialog-label">{label}</div>}
      <div className="dialog">{children}</div>
    </div>
  );
}
