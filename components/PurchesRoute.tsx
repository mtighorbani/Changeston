import purchesStep from "@/Array/purchesStep";
import Link from "next/link";
import React from "react";


interface PropsId{
  id:number,
}


const PurchesRoute = ({id}:PropsId) => {

  const PurchesStepBox = purchesStep.map(step=> 
    
    <div className=" text-black  place-content-center sm:h-[100px] " key={step.id}>
   
    <div className={`sm:h-[40%]  shadow-3xl cursor-pointer ${id == step.id?"bg-gradient-to-r from-green-400 to-blue-500":" bg-gray-600"} shadow-gray-50/50 w-[30%] sm:mt-3 max-sm:h-[70%]   text-center py-2  text-white m-auto  rounded-lg `}>{step.id}</div>
    <p  className="mt-1 pt-1 text-center cursor-pointer">{step.name}</p>
    </div>
  );

  return (

        <>
        <div className="w-[40%]  max-sm:w-[100%] max-sm:h-[15%] sm:ml-[30%] mt-[-60px] grid   grid-cols-3 m-auto place-content-center  gap-3 absolute  ring-2 ring-[#5a8dee] rounded-2xl bg-white  ">
          {PurchesStepBox }
        </div>
        </>

  
  );
};

export default PurchesRoute;
