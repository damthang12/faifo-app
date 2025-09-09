import * as React from "react";
import Svg, { Path } from "react-native-svg";

type ManageBookingProps = {
  size?: number | string;
  color?: string;
};

export default function ManageBooking({ size = 32, color = "#252B37" }: ManageBookingProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M28 9.33268V22.666C28 26.666 26 29.3327 21.3333 29.3327H10.6667C6 29.3327 4 26.666 4 22.666V9.33268C4 5.33268 6 2.66602 10.6667 2.66602H21.3333C26 2.66602 28 5.33268 28 9.33268Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.3335 6V8.66667C19.3335 10.1333 20.5335 11.3333 22.0002 11.3333H24.6668"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.97319 20.6534C9.53319 19.2801 10.0532 17.5868 11.4798 17.1202C12.2398 16.8802 13.1732 17.0801 13.6932 17.8134C14.1865 17.0534 15.1598 16.8802 15.9065 17.1202C17.3465 17.5868 17.8532 19.2801 17.4265 20.6534C16.7465 22.8268 14.3598 23.9601 13.6932 23.9601C13.0398 23.9468 10.6799 22.8401 9.97319 20.6534Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
