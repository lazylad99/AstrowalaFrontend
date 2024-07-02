export default function IconBtn({ text, onclick, children, disabled, outline = false, customClasses, type, }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center justify-center outline-none ${
          outline ? "border border-pink-50 bg-transparent" : "bg-pink-200"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white hover:bg-pink-400  duration-300 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-blue-100"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    );
}