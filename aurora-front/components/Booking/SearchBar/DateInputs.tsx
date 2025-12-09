import DateInput from "./DateInput";

interface DateInputsProps {
  setAvailable: (val: boolean) => void;
  setDates: {
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
  };
}

const DateInputs = ({ setAvailable, setDates }: DateInputsProps) => {
  return (
    <>
      <div className="input">
        <DateInput
          dateType="arrival"
          setDate={setDates.setStartDate}
          setAvailable={setAvailable}
        />
      </div>

      <div className="input">
        <DateInput
          dateType="departure"
          setDate={setDates.setEndDate}
          setAvailable={setAvailable}
        />
      </div>
    </>
  );
};

export default DateInputs;
