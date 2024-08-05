function ServiceCard({ title, description, icon, buttonText }) {
  console.log(icon);
  return (
    <div className=" sm:w-[300px] flex flex-col items-center justify-center py-8 px-4 border-2 border-pure-greys-100 bg-white rounded-lg shadow-sm">
      <div className="flex gap-3 flex-col items-center justify-center w-full p-4 bg-white dark:bg-navy-800 dark:text-white rounded-xl shadow-3xl">
        <div className=" p-6 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-center">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {description}
        </p>
      </div>
      <button className="px-4 py-2 text-sm font-semibold text-black bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg">
        {buttonText}
      </button>
      {/* bg-[#303030] */}
    </div>
  );
}

export default ServiceCard;
