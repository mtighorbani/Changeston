"use client";
import React, { useState } from "react";
import { Products, moreDetails } from "@/Array/Ptoducts";
import Image from "next/image";
import purchesStep from "@/Array/purchesStep";



const ProductsCard = () => {
  const [id, setId] = useState(1);
  const [visible, isVisible] = useState(false);
  const [productId, setProductId] = useState(0);

  const setIdHandler2 = () => {
    setId(2);
    isVisible(true);
  };
  console.log(productId)

  const listItem = Products.map((item) => (
    <div onClick={setIdHandler2}>
    <div
      onClick={() => setProductId(item.id)}
      className=" cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 rounded-xl max-w-[360px] text-center justify-center  max-h-[400px] mb-10"
      key={id}
    >
      <Image src={item.Photo} alt={item.name} width={300} height={30} />
      <p className="max-sm:font-normal font-extrabold font-lg mb-2 mt-2 ">
        {item.name}
      </p>
      <p className="font-extrabold max-sm:font-normal font-lg pb-10 ">
        {item.FaName}
      </p>
    </div>
    </div>
  ));

  const productList = moreDetails.filter((item)=>item.id == productId).map((item) => {
    if(item.id = productId){
      return(
    
    <div
      className=" cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 rounded-xl max-w-[360px] text-center justify-center  max-h-[400px] mb-10"
      key={id}
    >
      <Image src={item.Photo} alt={item.FaName} width={300} height={30} />
      <p className="max-sm:font-normal font-extrabold font-lg mb-2 mt-2 ">
        {item.FaName}
      </p>
      <p className="font-extrabold max-sm:font-normal font-lg pb-10 ">
        {item.prrice}
      </p>
    </div>)}
    else  {return null}
  });

  const indexClick =()=>{
    setId(1);
    isVisible(false);
  }

    const PurchesStepBox = purchesStep.map(step=> 
      
      <div onClick={()=>{step.id ==1?indexClick:null}} className=" text-black  place-content-center sm:h-[100px] " key={step.id}>
     
      <div className={`sm:h-[40%]  shadow-3xl cursor-pointer ${id == step.id?"bg-gradient-to-r from-green-400 to-blue-500":" bg-gray-600"} shadow-gray-50/50 w-[30%] sm:mt-3 max-sm:h-[70%]   text-center py-2  text-white m-auto  rounded-lg `}>{step.id}</div>
      <p  className="mt-1 pt-1 text-center cursor-pointer">{step.name}</p>
      </div>
    );
  

  return (
    <>
        <div className="w-[40%]  max-sm:w-[100%] max-sm:h-[15%] sm:ml-[30%] mt-[-60px] grid   grid-cols-3 m-auto place-content-center  gap-3 absolute  ring-2 ring-[#5a8dee] rounded-2xl bg-white  ">
          {PurchesStepBox }
        </div>
        
      <div className=" max-sm:grid-cols-2 grid grid-cols-4 justify-between place-content-center mx-[10%] max-sm:mt-16  mt-28 gap-4 ">
        
        {visible?productList:listItem}
        
      </div>
    </>
  );
};

export default ProductsCard;
