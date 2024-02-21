'use client'

import { moreDetails } from "@/Array/Ptoducts";
import Image from "next/image";
import React, { useState } from "react";
import ConfirmForm from "./ConfirmForm";


interface ProductsProps {
  visible: boolean;
  productId: number;
  id: number;

}



const ProductList = ({ visible, productId, id }: ProductsProps) => {



  const ProductsListMap = moreDetails.map((item) => {
    const [PurchesVisible, setPurchesVisible] = useState(false);
    const [purchesId, SetPurchesId] = useState(0)
    const purchesPageHandler = () => {
      setPurchesVisible(true);
      SetPurchesId(item.purchesId)
    };


    if ( item.id == id && PurchesVisible) {
      return (

        <div
          className=" cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 rounded-xl max-w-[360px] text-center justify-center  max-h-[400px] mb-10"
          key={item.id}
          onClick={purchesPageHandler}

        >
          <Image
            src={item.Photo}
            alt={item.FaName}
            width={0}
            height={0}
            className="min-w-300 min-h-40"
          />
          <p className="max-sm:font-normal font-extrabold font-lg mb-2 mt-2 ">
            {item.FaName}
          </p>
          <p className="font-extrabold max-sm:font-normal font-lg pb-10 ">
            {item.prrice}
          </p>
        </div>
      );

    }
    else if (purchesId == item.purchesId)
      return (moreDetails.filter((moreDetails) => moreDetails.purchesId == purchesId).map((item) => {


        <ConfirmForm id={item.id} visible={PurchesVisible} purchesId={item.purchesId} imgUrl={item.Photo} FaName={item.FaName} price={item.prrice} />

      }))

  });

  return (ProductsListMap)
};

export default ProductList;
