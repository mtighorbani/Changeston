import React from "react";

const purchesStep = [

  
  {
    id: 3,
    name: "بررسی و پرداخت",
  },
  {
    id: 2,
    name: "انتخاب محصول",
  },
  {
    id: 1,
    name: "انتخاب دسته",
  }
];

const PurchesRoute = () => {
  const PurchesStepBox = purchesStep.map(step=> 
    <div className=" text-black place-content-center " key={step.id}>
      <div className="h-[50%] w-[70%] max-sm:h-[70%]   text-center pt-3  text-white m-auto  rounded-lg bg-[#5a8dee]">{step.id}</div>
      <p className="mt-3 text-center">{step.name}</p>
    </div>
  );

  return (

        
        <div className="   max-sm:w-[100%] max-sm:h-[15%] mt-[-60px] grid   grid-cols-3 m-auto place-content-center  gap-3 absolute  ring-2 ring-[#5a8dee] rounded-2xl  bg-gray-100 shadow-2lg shadow-gray-100/50 ">
          {PurchesStepBox}
        </div>
  
  );
};

export default PurchesRoute;
