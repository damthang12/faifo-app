import * as React from "react";
import Svg, { Path } from "react-native-svg";

type HeartIconProps = {
  size?: number | string;
  color?: string;
};

export default function HeartIcon({ size = 32, color = "#252B37" }: HeartIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16.8265 27.7461C16.3732 27.9061 15.6265 27.9061 15.1732 27.7461C11.3065 26.4261 2.6665 20.9195 2.6665 11.5861C2.6665 7.46615 5.9865 4.13281 10.0798 4.13281C12.5065 4.13281 14.6532 5.30615 15.9998 7.11948C17.3465 5.30615 19.5065 4.13281 21.9198 4.13281C26.0132 4.13281 29.3332 7.46615 29.3332 11.5861C29.3332 20.9195 20.6932 26.4261 16.8265 27.7461Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
