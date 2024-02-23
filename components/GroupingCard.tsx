"use client";
import React, {  useState } from "react";
import { Products } from "@/Array/Ptoducts";
import Image from "next/image";
import purchesStep from "@/Array/purchesStep";
import ProductList from "./ProductsList";

import CurrencyComponents from "./CurrencyComponents";

const ProductsCard = () => {
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

  const idSetter = (id:number)=>{
    setId(id)
  }
  

  const listItem = Products.map((item) => (
    <div onClick={setIdHandler}>
      <div
        onClick={() => setProductId(item.id)}
        className=" cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 rounded-md max-w-[360px] text-center justify-center  max-h-[400px] mb-10"
        key={id}
      >
        <Image src={item.Photo} alt={item.name} width={300} height={30} className="w-[400px] h-[200px] rounded-lg" />
        <p className=" max-sm:font-normal text-xl  font-extrabold font-lg mb-2 mt-4 ">
          {item.name}
        </p>
        <p className="font-extrabold max-sm:font-normal text-xl font-lg pb-10 ">
          {item.FaName}
        </p>
      </div>
    </div>
  ));

  const PurchesStepBox = purchesStep.map((step) => (
    <div
      onClick={ ProductVisibleHandler}
      className=" text-black  place-content-center sm:h-[100px] "
      key={step.id}
    >
      <div
        className={`sm:h-[40%]  shadow-3xl cursor-pointer ${id == step.id
          ? "bg-gradient-to-r from-[#C8338C] to-[#0A95E5]"
          : " bg-gray-600"
          } shadow-gray-50/50 w-[30%] sm:mt-3 max-sm:h-[70%]   text-center py-2  text-white m-auto  rounded-lg `}
      >
        {step.id}
      </div>
      <p className="mt-1 pt-1 text-center cursor-pointer">{step.name}</p>
    </div>
  ));

  return (
    <>
    
      <div className="w-[40%]  max-sm:w-[100%] max-sm:h-[15%] sm:ml-[30%] mt-[-60px] grid   grid-cols-3 m-auto place-content-center  gap-3 absolute  ring-2 ring-[#5a8dee] rounded-2xl bg-white  ">
        {PurchesStepBox}
      </div>

        {visible == false && productId == 1 ? (
          
          <ProductList id={idSetter} productId={productId} />
          
        ) : productId == 2?
        <CurrencyComponents id={idSetter}/>:
        
        visible == true ? (
          
      <div
      className={"max-sm:grid-cols-2 grid grid-cols-4 justify-between place-content-center mx-[10%] max-sm:mt-16  mt-28 gap-4 "}
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
