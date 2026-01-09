"use client";
import { MagnifyingGlass as SearchSpinner } from "react-loader-spinner";

interface MagnifyingGlassProps {
  visible: boolean;
}

const MagnifyingGlass = ({ visible }: MagnifyingGlassProps) => {
  return (
    <div
      className="flex justify-center mt-4"
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <SearchSpinner
        visible={visible}
        height="80"
        width="80"
        ariaLabel="Loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#cee0ecff"
        color="#8AB8C0"
      />
    </div>
  );
};

export default MagnifyingGlass;
