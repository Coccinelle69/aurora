"use client";
import { RotatingLines } from "react-loader-spinner";

interface LoadingSpinnerProps {
  visible: boolean;
}

const LoadingSpinner = ({ visible }: LoadingSpinnerProps) => {
  return (
    <div
      className="flex justify-center mt-4"
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <RotatingLines
        visible={visible}
        height="32"
        width="32"
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;
