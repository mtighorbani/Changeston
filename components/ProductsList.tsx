"use client";

import { giftCardListUrl, verifiedPanelsListUrl } from "@/global/urls";
import {
  GetPaymentLinkCommand,
  GiftCardListResponse,
  GooglePlay,
  VerifiedPanels,
  VerifiedPanelsListResponse,
} from "@/models/models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmForm from "./ConfirmForm";
import { Spin, notification } from "antd";
import { customNotification } from "@/global/customNotification";
import VerifiedPanelsProductCard from "./VerifiedPanelsProductCard";
import GiftCardProductCard from "./GiftCardProductCard";

interface Props {
  groupId: number;
  roadMapIdSetter: (stepId: number) => any;
}

const ProductList = (props: Props) => {
  // ** States
  const [purchaseVisible, setPurchaseVisible] = useState(false);
  const [
    selectedVerifiedPanelsProductForPurchase,
    setSelectedVerifiedPanelsProductForPurchase,
  ] = useState<VerifiedPanels>();
  const [
    selectedGooglePlayProductForPurchase,
    setSelectedGooglePlayProductForPurchase,
  ] = useState<GooglePlay>();

  const [paymentLinkCommand, setPaymentLinkCommand] =
    useState<GetPaymentLinkCommand>({
      product_id: 0,
      group_id: props.groupId,
      payment_method: "zibal",
    });

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

  const {
    data: giftCardList,
    isFetching: isFetchingGiftCardList,
    isError: isErrorGiftCardList,
    refetch: refetchGiftCardList,
  } = useQuery<GiftCardListResponse>({
    queryFn: async () => (await axios.get(giftCardListUrl)).data,
    queryKey: ["giftCardList"],
    enabled: false,
  });

  useEffect(() => {
    isErrorGiftCardList &&
      customNotification({
        api: api,
        type: "error",
        message: "متاسفانه دریافت اطلاعات با خطا مواجه شده است!",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorGiftCardList]);

  useEffect(() => {
    if (props.groupId === 5) {
      refetchVerifiedPanelsList();
    } else if (props.groupId === 1) {
      refetchGiftCardList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ** Handlers
  const purchaseVerifiedPanelsHandler = (item: VerifiedPanels) => {
    setPurchaseVisible(true);
    setSelectedVerifiedPanelsProductForPurchase(item);
    props.roadMapIdSetter(3);
    setPaymentLinkCommand({
      ...paymentLinkCommand,
      product_id: item.id,
    });
    // SetImgUrl(item.Photo);
  };

  const purchaseGiftCardHandler = (item: GooglePlay) => {
    setPurchaseVisible(true);
    setSelectedGooglePlayProductForPurchase(item);
    props.roadMapIdSetter(3);
    setPaymentLinkCommand({
      ...paymentLinkCommand,
      product_id: item.id,
    });
    // SetImgUrl(item.Photo);
  };

  return (
    <>
      {contextHolder}
      {purchaseVisible ? (
        props.groupId === 5 ? (
          <ConfirmForm
            id={selectedVerifiedPanelsProductForPurchase?.id}
            amount={selectedVerifiedPanelsProductForPurchase?.amount}
            name={selectedVerifiedPanelsProductForPurchase?.name}
            paymentLinkCommand={paymentLinkCommand}
          />
        ) : (
          props.groupId === 1 && (
            <ConfirmForm
              id={selectedGooglePlayProductForPurchase?.id}
              amount={selectedGooglePlayProductForPurchase?.amount}
              currencyType={selectedGooglePlayProductForPurchase?.currency_type}
              name={selectedGooglePlayProductForPurchase?.app}
              paymentLinkCommand={paymentLinkCommand}
            />
          )
        )
      ) : (
        <div
          className={
            "max-sm:grid-cols-1 grid grid-cols-4 justify-between place-content-center max-sm:mx-20 mx-[10%] max-sm:mt-20  mt-28 gap-4  "
          }
          dir="rtl"
        >
          {props.groupId === 5 ? (
            isFetchingVerifiedPanelsList ? (
              <Spin />
            ) : (
              verifiedPanelsList?.verfiedpanelsgroup?.map((item) => {
                return (
                  <VerifiedPanelsProductCard
                    key={item.id}
                    Item={item}
                    onClick={() => purchaseVerifiedPanelsHandler(item)}
                  />
                );
              })
            )
          ) : (
            props.groupId === 1 &&
            (isFetchingGiftCardList ? (
              <Spin />
            ) : (
              giftCardList?.giftcards.google_play?.map((item) => {
                return (
                  <GiftCardProductCard
                    key={item.id}
                    Item={item}
                    onClick={() => purchaseGiftCardHandler(item)}
                  />
                );
              })
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ProductList;
