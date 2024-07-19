export default function IconBtn({ text, onclick, children, disabled, outline = false, customClasses, type, }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center justify-center button-36 outline-none ${
          outline ? "border border-pink-50 bg-transparent" : "bg-pink-200"
        } cursor-pointer gap-x-2 rounded-md font-semibold text-white  duration-300 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-richblack-500"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    );
}