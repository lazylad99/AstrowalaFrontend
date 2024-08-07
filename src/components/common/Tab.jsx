export default function Tab({ tabData, field, setField }) {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-newBlue p-1 my-6 w-[60%] rounded-full lg:max-w-max"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-richblack-500 text-white"
              : "bg-transparent text-richwhite-200"
          } lg:py-2 lg:px-5 rounded-full transition-all duration-200 text-sm  py-1 px-2 lg:text-md`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}