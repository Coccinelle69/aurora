"use client";
import { ContactState, persistField } from "@/reducers/contact";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormInputProps } from "@/utils/interfaces";
import { useTranslation } from "react-i18next";

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

  const [error, setError] = useState({ message: "" });
  const [fade, setFade] = useState(false);
  const { t } = useTranslation();
  const [charNumber, setCharNumber] = useState(0);

  const triggerLocalError = () => {
    setError({ message: t("emptyField") });
    setFade(false);

    // fade out
    setTimeout(() => setFade(true), 1000);
    // remove message
    setTimeout(() => setError({ message: "" }), 1500);
  };

  const handleBlur = (value: string) => {
    if (!value.trim() && placeholder !== t("specialRequestTitle")) {
      triggerLocalError();
    }
  };

  const inputStyle = `
    peer w-full  ${
      checkout
        ? "bg-white px-2 py-2 text-[0.8rem] sm:placeholder:text-[0.9rem]  "
        : "bg-transparent"
    } px-1 sm:px-3 py-1  rounded-md outline-none placeholder:text-[0.75rem] placeholder:sm:text-[1rem] 
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
          maxLength={2000}
          name={name}
          onBlur={(e) => handleBlur(e.target.value)}
          placeholder={placeholder}
          className={`${inputStyle} ${
            checkout && "h-[100px]"
          } max-h-[200px] h-[150px] resize-none`}
          value={contactState[name]}
          onChange={(e) => {
            dispatch(persistField({ key: name, value: e.target.value }));
            setCharNumber(e.target.value.length);
          }}
        />
      )}

      {/* floating label */}
      <label
        htmlFor={id}
        className={`absolute -top-2 left-1 sm:left-3 z-20 ${
          checkout && "text-[0.7rem]"
        } text-[0.65rem] sm:text-xs  font-bold uppercase tracking-widest text-slate-700 font-body`}
      >
        <span
          className={`px-1 ${
            checkout ? "bg-white" : "bg-white lg:bg-[#D3DAE0]"
          } `}
        >
          {children}
        </span>
      </label>
      {!input && (
        <span
          className={`absolute -top-2 left-54 sm:left-55 md:left-77 lg:left-35 z-20
            ${
              checkout &&
              "top-40 sm:-top-2 left-54 sm:left-78 md:left-79 lg:left-81"
            }
                text-xs px-1
                ${checkout ? "bg-white" : "bg-[#D3DAE0]"}
                ${charNumber === 2000 ? "text-red-500" : "text-slate-500"}`}
        >
          {charNumber}/2000
        </span>
      )}
      {/* local fade error */}
      <div className={`px-1 ${checkout ? "h-4 mb-2" : "h-3 mb-2"} `}>
        {error.message && (
          <p
            className={`text-[0.75rem] sm:text-sm font-semibold text-red-600 transition-all duration-500 ${
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
