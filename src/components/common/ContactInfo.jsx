import { FaPhoneSquareAlt, FaEnvelope } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <nav className="z-[15] flex justify-end bg-blue-400 py-2 border-b">
      <ul className="flex space-x- mr-10">
        <li>
          <a
            href="tel:+919115717321"
            className="flex items-center space-x-2 text-white mr-5"
          >
            <FaPhoneSquareAlt size={20} />
            <span>+91-91157-17321</span>
          </a>
        </li>
        <li>
          <a
            href="mailto:astrowala3@gmail.com"
            className="flex items-center space-x-2 text-white mr-3"
          >
            <FaEnvelope size={20} />
            <span>astrowala3@gmail.com</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ContactInfo;
