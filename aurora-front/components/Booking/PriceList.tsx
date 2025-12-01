"use client";

import { SetStateAction, useEffect, useRef } from "react";

interface PriceListProps {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  price: null | number | string;
  sign: string;
}

const PriceList = ({ setOpen, price, sign }: PriceListProps) => {
  const ref = useRef<HTMLDivElement>(null);
  //   const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);
  return (
    <div className="w-full max-w-4xl mx-auto mt-10" ref={ref}>
      {/* Header */}
      <div className="bg-gray-300 text-gray-800 font-semibold px-4 py-3 rounded-t-lg">
        Regular Price List
      </div>

      <table className="w-full border-collapse">
        {/* Column titles */}
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="p-3 border">Period</th>
            <th className="p-3 border">Max number of Guests</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Minimum Stay</th>
          </tr>
        </thead>

        {/* Rows */}
        <tbody className="text-center text-gray-800">
          <tr>
            <td className="p-3 border">15.05 – 31.05</td>
            <td className="p-3 border">5</td>
            <td className="p-3 border">
              {sign} {price}
            </td>
            <td className="p-3 border">7</td>
          </tr>

          <tr className="bg-gray-50">
            <td className="p-3 border">01.06 – 30.06</td>
            <td className="p-3 border">5</td>
            <td className="p-3 border">
              {sign} {price}
            </td>
            <td className="p-3 border">7</td>
          </tr>

          <tr>
            <td className="p-3 border">01.07 – 31.08</td>
            <td className="p-3 border">5</td>
            <td className="p-3 border">
              {sign} {price}
            </td>
            <td className="p-3 border">7</td>
          </tr>

          <tr className="bg-gray-50">
            <td className="p-3 border">01.09 – 15.09</td>
            <td className="p-3 border">5</td>
            <td className="p-3 border">
              {sign} {price}
            </td>
            <td className="p-3 border">7</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceList;
