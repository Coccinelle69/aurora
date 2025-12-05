import { persistSearchInput, searchState } from "@/reducers/search";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";

type DateKeys = Extract<keyof searchState, "arrival" | "departure">;

interface DateInputProps {
  dateType: DateKeys;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateInput = ({ setDate, dateType, setAvailable }: DateInputProps) => {
  const dispatch = useDispatch();
  const { arrival, departure } = useAppSelector((state) => state.search);

  const today = new Date().toISOString().slice(0, 10);

  const minDate = dateType === "arrival" ? today : arrival || today;

  return (
    <div className="flex-1 border rounded-lg px-4 py-3">
      <input
        type="date"
        min={minDate}
        max="2026-12-31"
        disabled={dateType === "departure" && !arrival}
        value={
          dateType === "arrival"
            ? arrival
            : departure < arrival
            ? arrival
            : departure
        }
        onChange={(e) => {
          setAvailable(false);
          const value = e.target.value;

          // ----------------------------
          // HANDLE ARRIVAL CHANGE
          // ----------------------------
          if (dateType === "arrival") {
            // If new arrival > departure → fix departure
            if (departure && departure < value) {
              dispatch(
                persistSearchInput({
                  key: "departure",
                  value,
                })
              );
            }

            // Update arrival
            setDate(value);
            dispatch(
              persistSearchInput({
                key: "arrival",
                value,
              })
            );

            return;
          }

          // ----------------------------
          // HANDLE DEPARTURE CHANGE
          // ----------------------------
          if (dateType === "departure" && arrival && value < arrival) {
            // Auto-fix
            setDate(arrival);
            dispatch(
              persistSearchInput({
                key: "departure",
                value: arrival,
              })
            );
            return;
          }

          // Otherwise normal update
          setDate(value);
          dispatch(
            persistSearchInput({
              key: "departure",
              value,
            })
          );
        }}
        className="w-full outline-none"
      />
    </div>
  );
};

export default DateInput;
