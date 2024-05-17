"use client";

import { verifiedPanelsListUrl } from "@/global/urls";
import { VerifiedPanels, VerifiedPanelsListResponse } from "@/models/models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ConfirmForm from "./ConfirmForm";
import VerifiedPanelsProduct from "./VerifiedPanelsProduct";
import { Spin } from "antd";

interface Props {
  productId: number;
  roadMapIdSetter: (stepId: number) => any;
}

const ProductList = (props: Props) => {
  // ** States
  const [purchaseVisible, setPurchaseVisible] = useState(false);
  const [selectedProductForPurchase, setSelectedProductForPurchase] =
    useState<VerifiedPanels>();

  // ** API Calls
  const {
    data: verifiedPanelsList,
    isFetching: isFetchingVerifiedPanelsList,
  } = useQuery<VerifiedPanelsListResponse>({
    queryFn: async () => (await axios.get(verifiedPanelsListUrl)).data,
    queryKey: ["verifiedPanelsList"],
    retry: false,
  });

  // ** Handlers
  const purchaseVerifiedPanelsHandler = (item: VerifiedPanels) => {
    setPurchaseVisible(true);
    setSelectedProductForPurchase(item);
    props.roadMapIdSetter(3);
    // SetImgUrl(item.Photo);
  };

  return purchaseVisible ? (
    <ConfirmForm
      id={selectedProductForPurchase?.id}
      amount={selectedProductForPurchase?.amount}
      name={selectedProductForPurchase?.name}
    />
  ) : (
    <div
      className={
        "max-sm:grid-cols-1 grid grid-cols-4 justify-between place-content-center max-sm:mx-20 mx-[10%] max-sm:mt-20  mt-28 gap-4  "
      }
      dir="rtl"
    >
      {isFetchingVerifiedPanelsList ? (
        <Spin />
      ) : props.productId === 5 ? (
        verifiedPanelsList?.verfiedpanelsgroup?.map((item) => {
          return (
            <VerifiedPanelsProduct
              key={item.id}
              Item={item}
              onClick={() => {
                return purchaseVerifiedPanelsHandler(item);
              }}
            />
          );
        })
      ) : (
        <div>gift card</div>
      )}
    </div>
  );
};

export default ProductList;
