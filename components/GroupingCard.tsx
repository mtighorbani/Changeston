"use client";
import React, { useState } from "react";
import Image from "next/image";
import purchaseStep from "@/Array/purchaseStep";
import ProductList from "./ProductsList";

import CurrencyComponents from "./CurrencyComponents";
import PurchaseStepBox from "./PurchaseStepBox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GroupResponse } from "@/models/models";
import { groupUrl } from "@/global/urls";
import { Spin } from "antd";

interface Props {
  isTempPage?: boolean;
}

const ProductsCard = (props: Props) => {
  const [roadMapStepId, setRoadMapStepId] = useState(1);
  const [visible, isVisible] = useState(true);
  const [productId, setProductId] = useState(-0);
  const NextId = roadMapStepId + 1;

  const {
    data: group,
    isFetching: isFetchingGroup,
  } = useQuery<GroupResponse>({
    queryFn: async () =>
      (
        await axios.get(groupUrl)
      ).data,
    queryKey: ["group"],
  });

  const ProductVisibleHandler = () => {
    isVisible(true);
    setProductId(0);
    setRoadMapStepId(1);
  };
  const setIdHandler = () => {
    setRoadMapStepId(NextId);
    isVisible(false);
  };

  const roadMapIdSetter = (roadMapId: number) => {
    setRoadMapStepId(roadMapId);
  };

  const groupsItemList = isFetchingGroup ? <Spin/> : group && group.groups.map((item) => (
    // TODO: remove this condition when all groups added
    item.id !== 2 && item.id !== 3 &&
    <div key={item.id} onClick={setIdHandler}>
      <div
        onClick={() => setProductId(item.id)}
        className=" cursor-pointer hover:shadow-2xl mx-6 hover:shadow-cyan-500/50 rounded-md max-w-[360px] text-center justify-center  max-h-[400px] mb-10"
        key={roadMapStepId}
      >
        <Image
          src={`/images/${item.name}.jpg`}
          alt={item.name}
          width={500}
          height={400}
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
              id={roadMapStepId}
              productVisibleHandler={ProductVisibleHandler}
              step={step}
            />
          ))}
        </div>
      )}
      {props.isTempPage ? (
        <CurrencyComponents roadMapIdSetter={roadMapIdSetter} />
      ) : visible == false && productId == 1 ? (
        <ProductList roadMapIdSetter={roadMapIdSetter} productId={productId} />
      ) : visible == false && productId == 5 ? (
        <ProductList roadMapIdSetter={roadMapIdSetter} productId={productId} />
      ) : productId == 4 ? (
        <CurrencyComponents roadMapIdSetter={roadMapIdSetter} />
      ) : visible == true ? (
        <div
          className={
            "max-sm:grid-cols-1  max-sm:grid  grid-cols-2 flex justify-center place-content-center mx-[10%] max-sm:mt-22  mt-28 gap-2 "
          }
        >
          {groupsItemList}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductsCard;
