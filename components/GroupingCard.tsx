"use client";
import React, { useState } from "react";
import { Products, moreDetails } from "@/Array/Ptoducts";
import Image from "next/image";
import PurchesRoute from "./PurchesRoute";



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

  return (
    <>
      <PurchesRoute id={id} />
      <div className=" max-sm:grid-cols-2 grid grid-cols-4 justify-between place-content-center mx-[10%] max-sm:mt-16  mt-28 gap-4 ">
        
        {visible?productList:listItem}
        
      </div>
    </>
  );
};

export default ProductsCard;
