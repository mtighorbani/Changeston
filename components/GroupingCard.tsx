"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import purchaseStep from "@/Array/purchaseStep";
import ProductList from "./ProductsList";

import CurrencyComponents from "./CurrencyComponents";
import PurchaseStepBox from "./PurchaseStepBox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GroupResponse } from "@/models/models";
import { groupUrl } from "@/global/urls";
import { Spin, notification } from "antd";
import { customNotification } from "@/global/customNotification";

interface Props {
  isTempPage?: boolean;
}

const ProductsCard = (props: Props) => {
  const [roadMapStepId, setRoadMapStepId] = useState(1);
  const [visible, isVisible] = useState(true);
  const [groupId, setGroupId] = useState(-0);
  const NextId = roadMapStepId + 1;

  // ** Notification
  const [api, contextHolder] = notification.useNotification();

  const {
    data: group,
    isFetching: isFetchingGroup,
    isError: isErrorGroup,
  } = useQuery<GroupResponse>({
    queryFn: async () => (await axios.get(groupUrl)).data,
    queryKey: ["group"],
  });

  useEffect(() => {
    isErrorGroup &&
      customNotification({
        api: api,
        type: "error",
        message: "متاسفانه دریافت اطلاعات با خطا مواجه شده است!",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorGroup]);

  const ProductVisibleHandler = () => {
    isVisible(true);
    setGroupId(0);
    setRoadMapStepId(1);
  };
  const setIdHandler = () => {
    setRoadMapStepId(NextId);
    isVisible(false);
  };

  const roadMapIdSetter = (roadMapId: number) => {
    setRoadMapStepId(roadMapId);
  };

  const groupsItemList = isFetchingGroup ? (
    <Spin />
  ) : (
    group &&
    group.groups.map(
      (item) =>
        // TODO: remove this condition when all groups added
        item.id !== 2 &&
        item.id !== 3 && (
          <div key={item.id} onClick={setIdHandler}>
            <div
              onClick={() => setGroupId(item.id)}
              className=" cursor-pointer hover:shadow-2xl mx-6 hover:shadow-cyan-500/50 rounded-md max-w-[360px] text-center justify-center  max-h-[400px] mb-10"
              key={roadMapStepId}
            >
              <Image
                src={`https://changeston.com/media/photos/${item.Photo}/${item.Photo}`}
                height={400}
                alt={item.name}
                width={500}
                unoptimized
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
        )
    )
  );

  return (
    <>
      {contextHolder}
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
      ) : visible == false && groupId == 1 ? (
        <ProductList roadMapIdSetter={roadMapIdSetter} groupId={groupId} />
      ) : visible == false && groupId == 5 ? (
        <ProductList roadMapIdSetter={roadMapIdSetter} groupId={groupId} />
      ) : groupId == 4 ? (
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
