import React from "react";
import { commonContent } from "@/lib/content";

interface Props {
  onClick: () => void;
  isActive: boolean;
  className?: string;
}

const CloseButton: React.FC<Props> = ({ isActive, onClick, className }) => {
  return (
    <button
      className={`absolute top-2 right-2 sm:top-6 sm:right-6 transition-colors hover:text-current-primary ${
        className ?? ""
      }`}
      onClick={onClick}
      aria-label={commonContent.closeModalAria}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      X
    </button>
  );
};

export default CloseButton;
