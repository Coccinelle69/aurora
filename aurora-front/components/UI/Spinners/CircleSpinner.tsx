"use client";
import { CircleLoader } from "react-spinners";

interface CircleSpinnerProps {
  visible: boolean;
}

const CircleSpinner = ({ visible }: CircleSpinnerProps) => {
  return (
    <div
      className="flex justify-center mt-4"
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <CircleLoader
        size={120}
        color="#095f8b"
        loading={visible}
        speedMultiplier={1}
      />
    </div>
  );
};

export default CircleSpinner;
