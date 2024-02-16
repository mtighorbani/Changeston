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
    <div className=" text-black place-content-center sm:h-[100px] " key={step.id}>
      <div className="sm:h-[50%] shadow-3xl shadow-gray-50/50 w-[40%] sm:mt-3 max-sm:h-[70%]   text-center pt-3  text-white m-auto  rounded-lg bg-gradient-to-r from-green-400 to-blue-500">{step.id}</div>
      <p className="mt-1 text-center ">{step.name}</p>
    </div>
  );

  return (

        
        <div className="w-[40%]    max-sm:w-[100%] max-sm:h-[15%] sm:ml-[30%] mt-[-60px] grid   grid-cols-3 m-auto place-content-center  gap-3 absolute  ring-2 ring-[#5a8dee] rounded-2xl bg-white  ">
          {PurchesStepBox}
        </div>
  
  );
};

export default PurchesRoute;
