import { PurchaseStepsModel } from "@/models/models";

interface Props {
  step: PurchaseStepsModel;
  id: number;
  productVisibleHandler?: () => void;
}

const PurchaseStepBox = (props: Props) => {
  return (
    <div
      onClick={props.productVisibleHandler}
      className=" text-black  place-content-center sm:h-[100px] "
    >
      <div
        className={`sm:h-[40%]  shadow-3xl cursor-pointer ${
          props.id == props.step.id
            ? "bg-gradient-to-r from-[#C8338C] to-[#0A95E5]"
            : " bg-gray-600"
        } shadow-gray-50/50 w-[30%] sm:mt-3 max-sm:h-[60%]   text-center py-2  text-white m-auto  rounded-lg `}
      >
        {props.step.id}
      </div>
      <p className="mt-1 pt-1 text-center cursor-pointer">{props.step.name}</p>
    </div>
  );
};

export default PurchaseStepBox
