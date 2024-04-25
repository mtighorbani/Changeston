"use client";
import React, { useState } from "react";
import { Products } from "@/Array/Ptoducts";
import Image from "next/image";
import purchaseStep from "@/Array/purchesStep";
import ProductList from "./ProductsList";

import CurrencyComponents from "./CurrencyComponents";
import PurchaseStepBox from "./PurchaseStepBox";

interface Props {
  isTempPage?: boolean;
}

const ProductsCard = (props: Props) => {
  const [id, setId] = useState(1);
  const [visible, isVisible] = useState(true);
  const [productId, setProductId] = useState(-0);
  const NextId = id + 1;

  const ProductVisibleHandler = () => {
    isVisible(true);
    setProductId(0);
    setId(1);
  };
  const setIdHandler = () => {
    setId(NextId);
    isVisible(false);
  };

  const idSetter = (id: number) => {
    setId(id);
  };

  const listItem = Products.map((item) => (
    <div key={item.id} onClick={setIdHandler}>
      <div
        onClick={() => setProductId(item.id)}
        className=" cursor-pointer hover:shadow-2xl mx-6 hover:shadow-cyan-500/50 rounded-md max-w-[360px] text-center justify-center  max-h-[400px] mb-10"
        key={id}
      >
        <Image
          src={item.Photo}
          alt={item.name}
          width={300}
          height={30}
          className="w-[400px] h-[200px] rounded-lg"
        />
        <p className=" max-sm:font-normal text-xl  font-extrabold font-lg mb-2 mt-4 ">
          {item.name}
        </p>
        <p className="font-extrabold max-sm:font-normal text-xl font-lg pb-10 ">
          {item.FaName}
        </p>
      </div>
    </div>
  ));

  return (
    <>
      {props.isTempPage ?? (
        <div className="w-[40%]  max-sm:w-[100%] max-sm:h-[15%] sm:ml-[30%] mt-[-60px] grid   grid-cols-3 m-auto place-content-center  gap-3 absolute  ring-2 ring-[#5a8dee] rounded-2xl bg-white  ">
          {purchaseStep.map((step) => (
            <PurchaseStepBox
              key={step.id}
              id={id}
              productVisibleHandler={ProductVisibleHandler}
              step={step}
            />
          ))}
        </div>
      )}
      {props.isTempPage ? (
        <CurrencyComponents id={idSetter} />
      ) : visible == false && productId == 1 ? (
        <ProductList id={idSetter} productId={productId} />
      ) : visible == false && productId == 3 ? (
        <ProductList id={idSetter} productId={productId} />
      ) : productId == 2 ? (
        <CurrencyComponents id={idSetter} />
      ) : visible == true ? (
        <div
          className={
            "max-sm:grid-cols-1  max-sm:grid  grid-cols-2 flex justify-center place-content-center mx-[10%] max-sm:mt-22  mt-28 gap-2 "
          }
        >
          {listItem}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductsCard;
