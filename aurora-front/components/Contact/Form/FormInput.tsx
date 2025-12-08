"use client";
import { persistField } from "@/reducers/contact";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { ContactState } from "@/reducers/contact";
import { useState } from "react";

interface FormInputProps {
  id: string;
  name: keyof ContactState;
  placeholder: string;
  children: React.ReactNode;
  input?: boolean;
  checkout?: boolean;
}

const FormInput = ({
  id,
  name,
  placeholder,
  input = true,
  children,
  checkout,
}: FormInputProps) => {
  const dispatch = useDispatch();
  const { firstName, lastName, phone, email, message } = useAppSelector(
    (state) => state.contact
  );

  const contactState: ContactState = {
    firstName,
    lastName,
    phone,
    email,
    message,
  };

  // fade animated per–input error
  const [error, setError] = useState({ message: "" });
  const [fade, setFade] = useState(false);

  const triggerLocalError = () => {
    // parent error just for global message (if you need)
    setError({ message: "Please fill in this field" });

    setFade(false);

    // fade out
    setTimeout(() => setFade(true), 1000);
    // remove message
    setTimeout(() => setError({ message: "" }), 1500);
  };

  const handleBlur = (value: string) => {
    if (!value.trim()) {
      triggerLocalError();
    }
  };

  const inputStyle = `
    peer w-full ${
      checkout
        ? "bg-white px-2 py-2 placeholder:text-[0.75rem] placeholder:sm:text-sm"
        : "bg-transparent"
    } px-3 py-3  rounded-md outline-none
    border-2 border-transparent placeholder:text-gray-400 text-marineBlue
  `;

  return (
    <div className="relative mt-5">
      {input ? (
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          className={inputStyle}
          value={contactState[name]}
          onChange={(e) =>
            dispatch(persistField({ key: name, value: e.target.value }))
          }
          onBlur={(e) => handleBlur(e.target.value)}
        />
      ) : (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          className={`${inputStyle} ${
            checkout && "h-[120px]"
          } min-h-[160px] resize-none`}
          value={contactState[name]}
          onChange={(e) =>
            dispatch(persistField({ key: name, value: e.target.value }))
          }
          onBlur={(e) => handleBlur(e.target.value)}
        />
      )}

      {/* floating label */}
      <label
        htmlFor={id}
        className="absolute -top-2 left-3 z-20 text-xs font-bold uppercase tracking-widest text-slate-700 font-body"
      >
        <span
          className={`px-1 ${
            checkout ? "bg-white" : "bg-white lg:bg-[#D3DAE0]"
          } `}
        >
          {children}
        </span>
      </label>

      {/* local fade error */}
      <div className={`px-1 ${checkout ? "h-4 mb-2" : "h-3 mb-2"} `}>
        {error.message && (
          <p
            className={`text-sm font-semibold text-red-600 transition-all duration-500 ${
              checkout && "text-[0.75rem]"
            } ${
              fade ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
            }`}
          >
            {error.message}
          </p>
        )}
      </div>

      {/* animated full border */}
      <span
        className="pointer-events-none absolute inset-0 z-10 rounded-md
                   border-2 border-slate-700 opacity-0 transition-opacity duration-300
                   peer-focus:opacity-100"
      />
    </div>
  );
};

export default FormInput;
