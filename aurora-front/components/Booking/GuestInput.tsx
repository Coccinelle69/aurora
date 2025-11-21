import { persistSearchInput } from "@/reducers/search";
import { useDispatch } from "react-redux";
import { searchState } from "@/reducers/search";
import { useAppSelector } from "@/store/hooks";

type GuestKeys = Extract<keyof searchState, "adults" | "children" | "teens">;

interface GuestInputProps {
  guestType: GuestKeys;
  guestString: string;
  guests: number;
  setGuest: React.Dispatch<React.SetStateAction<number>>;
}

const GuestInput = ({
  setGuest,
  guests,
  guestType,
  guestString,
}: GuestInputProps) => {
  const dispatch = useDispatch();
  const { adults, children, teens } = useAppSelector((state) => state.search);
  const guestsNo =
    guestType === "adults"
      ? adults
      : guestType === "children"
      ? children
      : teens;
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-default">{guestString}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (
              (guests > 1 && guestType === "adults") ||
              (guests > 0 && guestType !== "adults")
            ) {
              const newValue = guests - 1;

              setGuest(() => newValue); // still safe
              dispatch(
                persistSearchInput({
                  key: guestType,
                  value: String(newValue),
                })
              );
            }
          }}
          className="h-7 w-7 rounded border flex items-center justify-center"
        >
          -
        </button>
        <span className="w-4 text-center text-bold">{+guestsNo}</span>
        <button
          onClick={() => {
            const newValue = guests + 1;

            setGuest(() => newValue);

            dispatch(
              persistSearchInput({
                key: guestType,
                value: String(newValue),
              })
            );
          }}
          className="h-7 w-7 rounded border flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default GuestInput;
