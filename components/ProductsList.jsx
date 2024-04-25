"use client";

import { moreDetails } from "@/Array/Ptoducts";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import ConfirmForm from "./ConfirmForm";


const ProductList = ({ productId,id }) => {
  const [purchaseVisible, setPurchaseVisible] = useState(true);
  const [purchaseId, SetPurchaseId] = useState(0);
  const [ImgUrl,SetImgUrl] = useState()
  const [purchasePrice,purchaseSetPrice] = useState("")
  const [FaName , setFaName] = useState("")


  const ProductsListMap = moreDetails.map((item) => {
    const purchasePageHandler = () => {
      setPurchaseVisible(false);
      SetImgUrl(item.Photo)
      purchaseSetPrice(item.prrice)
      setFaName(item.FaName)     
      SetPurchaseId(item.purchaseId)
       
      
    };
  
    if (productId == item.id) {
      return (

          <div key={item.purchaseId} onClick={ ()=>id(3) }>
            <div
              className=" max-sm:mt-2 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 rounded-xl max-w-[360px] text-center justify-center  max-h-[400px] max-sm:mb-0 mb-10"
              key={item.id}
              onClick={purchasePageHandler}
            >
              <Image
                src={item.Photo}
                alt={item.FaName}
                width={0}
                height={0}
                className="min-w-300 min-h-52 max-h-52 "
              />
              <p className="max-sm:font-normal font-extrabold font-lg mb-2 mt-2 ">
                {item.FaName}
              </p>
              <p className="font-extrabold max-sm:font-normal font-lg pb-10 ">
                {item.prrice}
              </p>
            </div>
          </div>
      );
    }
  });

  return purchaseVisible ? (
    <div
      className={
        "max-sm:grid-cols-1 grid grid-cols-4 justify-between place-content-center max-sm:mx-20 mx-[10%] max-sm:mt-20  mt-28 gap-4  "
      }
    >

      {ProductsListMap}
    </div>
  ) : (
    <ConfirmForm purchaseId={purchaseId} imgUrl={ImgUrl} price={purchasePrice} FaName={FaName} />
  );
};

export default ProductList;
