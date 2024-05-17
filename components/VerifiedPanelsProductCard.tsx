import { VerifiedPanels } from "@/models/models";
import Image from "next/image";

interface Props {
  Item: VerifiedPanels;
  onClick: () => void;
}

const VerifiedPanelsProductCard = (props: Props) => {
  //TODO: fix image src
  //TODO: fix alignment
  return (
    <div key={props.Item.id} onClick={props.onClick}>
      <div
        className=" max-sm:mt-2 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 rounded-xl max-w-[360px] text-center justify-center  max-h-[400px] max-sm:mb-0 mb-10"
        key={props.Item.id}
      >
        <Image
          src={"/images/empty.jpg"}
          alt={props.Item.name}
          width={300}
          height={300}
          className="min-w-300 min-h-52 max-h-52 "
        />
        <p className="max-sm:font-normal font-extrabold font-lg mb-2 mt-2 ">
          {props.Item.name}
        </p>
        <p className="font-extrabold max-sm:font-normal font-lg pb-10 ">
          {props.Item.amount} تومان
        </p>
      </div>
    </div>
  );
};

export default VerifiedPanelsProductCard;
