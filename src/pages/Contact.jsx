
import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactForm from "../components/core/ContactPage/ContactForm"
// import ReviewSlider from './../components/common/ReviewSlider';



const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 w-11/12 max-w-maxContent mb-5 flex flex-col gap-10 text-richblue-800 lg:flex-row lg:justify-between">
        {/* Contact Details */}
        <div className="w-full lg:w-[40%]">
          <ContactDetails className="text-sm lg:text-base" />
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-[60%]">
          <ContactForm className="text-sm lg:text-base" />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact