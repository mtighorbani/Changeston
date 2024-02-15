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
    <div className="pt-4  px-12 text-black place-content-center " key={step.id}>
      <div className="w-14 h-14 text-center pt-3  text-white m-auto  rounded-lg bg-[#5a8dee]">{step.id}</div>
      <p className="mt-3 ">{step.name}</p>
    </div>
  );

  return (
    <div className=" flex justify-center w-[38%] h-[15%] top-[70%] absolute left-[30%] ring-4 ring-[#5a8dee] rounded-2xl  bg-gray-100 shadow-2lg shadow-gray-100/50 ">
      {PurchesStepBox}
    </div>
  );
};

export default PurchesRoute;
