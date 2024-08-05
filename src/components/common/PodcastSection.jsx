import img1 from "../../assets/Images/Horoscope Imgs/podcast1.webp";
import img2 from "../../assets/Images/Horoscope Imgs/podcast2.webp";
import img3 from "../../assets/Images/Horoscope Imgs/podcast3.webp";
import img4 from "../../assets/Images/Horoscope Imgs/bhanupathak.jpg";
import img5 from "../../assets/Images/Horoscope Imgs/trunsharma.jpg";
import playBtn from "../../assets/Images/playbtn.png";
import podcastImg from "../../assets/Images/Horoscope Imgs/podcastthumnail.jpg";
function PodcastSection() {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5
  ];
  return (
    <div className="relative mx-auto box-content w-full max-w-maxContentTab px-4 pb-4 mb-12 mt-5 lg:max-w-maxContent">
      <div className="sm:flex items-center w-full">
        <div className="sm:flex flex-col gap-6 items-start justify-between w-full sm:w-[60%] mr-5 sm:mr-0">
          <h1 className="text-3xl font-semibold text-start ">
            The Astrowala Show
          </h1>
          <p className=" text-left text-gray-500 dark:text-gray-400 w-full sm:w-[90%]">
            Astrowala hosts "The Astrowala Show," a captivating podcast that
            features renowned celebrities, spiritual leaders, politicians, and
            influencers. With his profound insights, Astrowala enriches various
            podcast discussions beyond his own show, offering listeners a unique
            blend of wisdom and entertainment.
          </p>
          <div className="sm:hidden relative w-full sm:w-[40%] bg-newBlue p-2 my-4 rounded-lg mr-5 sm:mr-0">
            <img src={podcastImg} alt="podcast video" className=" rounded-lg" />
            {/* play button */}
            <img
              src={playBtn}
              alt="play btn"
              className="absolute w-14 h-14 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer mr-5 sm:mr-0"
            />
          </div>
          {/* image container */}
          <div className="flex flex-wrap sm:flex items-center gap-2 mr-5 sm:mr-0">
            {images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt="podcast"
                className="w-[95px] h-[95px] rounded-full cursor-pointer hover:scale-105 transition-all "
              />
            ))}
          </div>
          <a href="https://www.youtube.com/@AstroWala" target="_blank" className=" text-md py-3 px-5 rounded-md bg-newBlue text-white  hover:scale-105 transition-all">
            Watch Now
          </a>
        </div>
        <div className=" hidden sm:block relative w-full sm:w-[40%] bg-newBlue p-2 rounded-lg mr-5 sm:mr-0 shadow">
          <img src={podcastImg} alt="podcast video" className=" rounded-lg mr-5 sm:mr-0" />
          {/* play button */}
          <img
            src={playBtn}
            alt="play btn"
            className="absolute w-14 h-14 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default PodcastSection;
