"use client";

import { moreDetails } from "@/Array/Ptoducts";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import ConfirmForm from "./ConfirmForm";

interface ProductsProps {
  productId: number;
  id: number;
}

const ProductList = ({ productId, id }: ProductsProps) => {
  const [purchaseVisible, setPurchaseVisible] = useState(true);
  const [purchesId, SetPurchesId] = useState(0);
  const [ImgUrl,SetImgUrl] = useState<StaticImageData>()
  const [purchasePrice,purchaseSetPrice] = useState("")
  const [FaName , setFaName] = useState("")


  const ProductsListMap = moreDetails.map((item) => {
    const purchesPageHandler = () => {
      setPurchaseVisible(false);
      SetImgUrl(item.Photo)
      purchaseSetPrice(item.prrice)
      setFaName(item.FaName)
      id==3
    };
  
    if (productId == item.id) {
      return (

          <div onClick={() => SetPurchesId(item.purchesId) }>
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
          </div>
      );
    }
  });
  const PurchesRender = moreDetails
    .filter((moreDetails) => moreDetails.purchesId == purchesId)
    .map((item) => {
      <ConfirmForm
        purchesId={purchesId}
        imgUrl={item.Photo}
        FaName={item.FaName}
        price={item.prrice}
      />;
    });
  console.log(purchaseVisible);

  return purchaseVisible ? (
    <div
      className={
        "max-sm:grid-cols-2 grid grid-cols-4 justify-between place-content-center mx-[10%] max-sm:mt-16  mt-28 gap-4 "
      }
    >

      {ProductsListMap}
    </div>
  ) : (
    <ConfirmForm purchesId={purchesId} imgUrl={ImgUrl} price={purchasePrice} FaName={FaName} />
  );
};

export default ProductList;
