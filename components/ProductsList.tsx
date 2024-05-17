"use client";

import { verifiedPanelsListUrl } from "@/global/urls";
import { VerifiedPanels, VerifiedPanelsListResponse } from "@/models/models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmForm from "./ConfirmForm";
import VerifiedPanelsProduct from "./VerifiedPanelsProduct";
import { Spin, notification } from "antd";
import { customNotification } from "@/global/customNotification";

interface Props {
  productId: number;
  roadMapIdSetter: (stepId: number) => any;
}

const ProductList = (props: Props) => {
  // ** States
  const [purchaseVisible, setPurchaseVisible] = useState(false);
  const [selectedProductForPurchase, setSelectedProductForPurchase] =
    useState<VerifiedPanels>();

  // ** Notification
  const [api, contextHolder] = notification.useNotification();

  // ** API Calls
  const {
    data: verifiedPanelsList,
    isFetching: isFetchingVerifiedPanelsList,
    isError: isErrorVerifiedPanelsList,
    refetch: refetchVerifiedPanelsList,
  } = useQuery<VerifiedPanelsListResponse>({
    queryFn: async () => (await axios.get(verifiedPanelsListUrl)).data,
    queryKey: ["verifiedPanelsList"],
    enabled: false,
  });

  useEffect(() => {
    isErrorVerifiedPanelsList &&
      customNotification({
        api: api,
        type: "error",
        message: "متاسفانه دریافت اطلاعات با خطا مواجه شده است!",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorVerifiedPanelsList]);

  useEffect(() => {
    if (props.productId === 5) {
      refetchVerifiedPanelsList();
    } else if (props.productId === 3) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ** Handlers
  const purchaseVerifiedPanelsHandler = (item: VerifiedPanels) => {
    setPurchaseVisible(true);
    setSelectedProductForPurchase(item);
    props.roadMapIdSetter(3);
    // SetImgUrl(item.Photo);
  };

  return (
    <>
      {contextHolder}
      {purchaseVisible ? (
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
          {props.productId === 5 ? (
            isFetchingVerifiedPanelsList ? (
              <Spin />
            ) : (
              verifiedPanelsList?.verfiedpanelsgroup?.map((item) => {
                return (
                  <VerifiedPanelsProduct
                    key={item.id}
                    Item={item}
                    onClick={() => purchaseVerifiedPanelsHandler(item)}
                  />
                );
              })
            )
          ) : (
            <div>gift card</div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductList;
