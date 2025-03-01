import React from "react";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@astrowala.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+91 9115717321",
  },
];

const ContactDetails = () => {
  return (
    <div>
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div className="flex flex-col gap-6 rounded-xl bg-newBlue p-4 m-2 mb-5 lg:p-6 hover:scale-105 transition-all">
            <div
              className="flex flex-col gap-[2px] p-3 text-sm text-white"
              key={i}
            >
              <div className="flex flex-row items-center gap-3">
                <Icon size={25} />

                <h1 className="text-lg font-semibold text-white">
                  {ele?.heading}
                </h1>
              </div>

              <p className="font-normal">{ele?.description}</p>
              <p className="font-normal">{ele?.details}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
