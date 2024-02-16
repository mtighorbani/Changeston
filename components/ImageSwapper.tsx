// components/ImageSwapper.tsx
"use client";
import { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import BlurText from "./BlurText";
import PurchesRoute from "./PurchesRoute";

interface Props {
  images: string[]; // Assuming these are relative paths
}

const ImageSwapper: React.FC<Props> = ({ images }) => {
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

  return (
    <div  className="mt-4 h-[60%] "onMouseMove={mouseHnadler}  onMouseLeave={mouseLeave}    >
      
        {isShow?<GrPrevious  onClick={previousImage} type="button" className= "cursor-pointer text-white  transition delay-150 size-16 sm:size-8 absolute top-[300px] left-[200px]" />:null}
        { isShow?<GrNext onClick={nextImage} type="button" className="cursor-pointer text-white transition delay-150 size-16 sm:size-8 absolute top-[300px]  right-[200px]" />:null}  
      
      
        <BlurText/>

      <img 
        
        className="rounded-lg	 m-auto w-[1240px] h-[500px]"
        src={images[currentImageIndex]} // Adjust the path here
        alt="Image"
        width={0} // Set width and height as per your requirements
        height={0}
      />
    </div>
  );
};

export default ImageSwapper;
