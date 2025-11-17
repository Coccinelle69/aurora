interface FormInputProps {
  id: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
  input?: boolean;
}

const FormInput = ({
  id,
  name,
  placeholder,
  input = true,
  children,
}: FormInputProps) => {
  const inputStyle = `peer w-full bg-transparent px-3 py-3 rounded-md outline-none 
                       border-2 border-transparent placeholder:text-gray-400 text-marineBlue`;

  return (
    <div className="relative mt-5">
      {input ? (
        <>
          <input
            id={id}
            name={name}
            placeholder={placeholder}
            className={inputStyle}
            required
          />
        </>
      ) : (
        <>
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            className={`${inputStyle} min-h-[160px] resize-none`}
            required
          />
        </>
      )}

      {/* floating label */}
      <label
        htmlFor={id}
        className="absolute -top-2 left-3 z-20 text-xs font-bold uppercase tracking-widest text-slate-700 font-body"
      >
        <span className="px-1 bg-white lg:bg-[#D3DAE0]">{children}</span>
      </label>

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
