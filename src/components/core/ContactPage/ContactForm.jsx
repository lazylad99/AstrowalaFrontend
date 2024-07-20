import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border bg-black text-white shadow rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold">
      Get in Touch      </h1>
      <p className="">
      We&apos;d love to here for you, Please fill out this form.
      </p>

      <div className="mt-4">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;