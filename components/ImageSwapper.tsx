// components/ImageSwapper.tsx
import Image from "next/image";
import { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import Header1 from "../asset/images/MainPageImage/Header1.jpg";
import Header2 from "../asset/images/MainPageImage/header2.jpg";
import Header3 from "../asset/images/MainPageImage/header3.jpg";
import Header4 from "../asset/images/MainPageImage/header4.jpg";



const ImageSwapper = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShow, SetShow] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const mouseHnadler = () => {
    SetShow(true);
  };
  const mouseLeave = () => {
    SetShow(false);
  };

  const images = [Header1, Header2, Header3, Header4];


  return (
    <div  className="mt-4 h-[60%] "onMouseMove={mouseHnadler}  onMouseLeave={mouseLeave} >
      
        {isShow?<GrPrevious  onClick={previousImage} type="button" className= "cursor-pointer text-white  transition delay-150 size-14 max-sm:size-8 absolute max-sm:left-0 top-[300px] left-[300px]" />:null}
        { isShow?<GrNext onClick={nextImage} type="button" className="cursor-pointer text-white transition delay-150 size-14 max-sm:size-8 absolute top-[300px] max-sm:right-0  right-[300px]" />:null}  
      < Image
        
        className="rounded-xl	 m-auto w-[1240px] h-[500px] max-sm:w-full "
        src={images[currentImageIndex]} // Adjust the path here
        alt="Image"
        width={0} // Set width and height as
        height={0}
      />
            

      
    </div>
  );
};

export default ImageSwapper;
