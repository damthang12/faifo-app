import * as React from "react";
import Svg, { Path } from "react-native-svg";

type LoginIconProps = {
  size?: number | string;
  color?: string;
};

export default function LogoutIcon({ size = 32, color = "#252B37" }: LoginIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M23.2534 19.4927L26.6668 16.0793L23.2534 12.666"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.0132 16.0801H26.5732"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.6799 26.6673C9.78652 26.6673 5.01318 22.6673 5.01318 16.0007C5.01318 9.33398 9.78652 5.33398 15.6799 5.33398"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
