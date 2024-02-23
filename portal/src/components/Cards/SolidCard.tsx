import React, { ReactNode } from "react";

interface Props {
  bgStyle: string;
  titleStyle: string;
  icon?: ReactNode;
  title: string;
  dataStyle: string;
  data: string | number;
}

const SolidCard = ({
  bgStyle,
  titleStyle,
  icon,
  title,
  data,
  dataStyle,
}: Props) => {
  return (
    <>
      <div
        className={
          "rounded-lg shadow -xl hover:scale-105 transition duration-200 py-4 px-6" +
          " " +
          bgStyle
        }
      >
        <p className={"text-2xl font-semibold" + " " + titleStyle}>{title}</p>
        <div
          className={
            "text-5xl p-0 mt-5 text-end font-semibold" + " " + dataStyle
          }
        >
          <p>{data}</p>
        </div>
      </div>
    </>
  );
};

export default SolidCard;
