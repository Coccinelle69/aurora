import { persistSearchInput, searchState } from "@/reducers/search";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";

type DateKeys = Extract<keyof searchState, "arrival" | "departure">;

interface DateInputProps {
  dateType: DateKeys;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setAvailable: (val: boolean) => void;
}

const DateInput = ({ setDate, dateType, setAvailable }: DateInputProps) => {
  const dispatch = useDispatch();
  const { arrival, departure } = useAppSelector((state) => state.search);

  const today = new Date().toISOString().slice(0, 10);
  const departureCalc = new Date(new Date(arrival).getTime() + 604800000)
    .toISOString()
    .slice(0, 10);

  const minDate = dateType === "arrival" ? today : departureCalc;

  return (
    <div className="flex-1 border rounded-lg px-4 py-3 text-white">
      <input
        type="date"
        min={minDate}
        max="2027-12-31"
        disabled={dateType === "departure" && !arrival}
        value={dateType === "arrival" ? arrival : departure}
        onChange={(e) => {
          setAvailable(false);
          const value = e.target.value;

          if (dateType === "arrival") {
            const minAllowedDep = new Date(
              new Date(value).getTime() + 604800000
            )
              .toISOString()
              .slice(0, 10);

            if (!departure || departure < minAllowedDep) {
              dispatch(
                persistSearchInput({ key: "departure", value: minAllowedDep })
              );
            }

            setDate(value);
            dispatch(persistSearchInput({ key: "arrival", value }));
            return;
          }

          if (dateType === "departure") {
            const diff =
              (new Date(value).getTime() - new Date(arrival).getTime()) /
              86400000;

            if (value <= arrival || diff < 7) {
              const fixed = new Date(new Date(arrival).getTime() + 604800000)
                .toISOString()
                .slice(0, 10);
              setDate(fixed);
              dispatch(persistSearchInput({ key: "departure", value: fixed }));
            } else {
              setDate(value);
              dispatch(persistSearchInput({ key: "departure", value }));
            }
          }
        }}
        className="w-full outline-none"
      />
    </div>
  );
};

export default DateInput;
