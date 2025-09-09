import * as React from "react";
import Svg, { Path } from "react-native-svg";

type CupIconProps = {
  size?: number | string;
  color?: string;
};

export default function CupIcon({ size = 32, color = "#292D32" }: CupIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M16.2002 22V24.8"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5332 29.334H22.8665V28.0007C22.8665 26.534 21.6665 25.334 20.1999 25.334H12.1999C10.7332 25.334 9.5332 26.534 9.5332 28.0007V29.334V29.334Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M8.2002 29.334H24.2002"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.9998 21.3327C10.8398 21.3327 6.6665 17.1593 6.6665 11.9993V7.99935C6.6665 5.05268 9.05317 2.66602 11.9998 2.66602H19.9998C22.9465 2.66602 25.3332 5.05268 25.3332 7.99935V11.9993C25.3332 17.1593 21.1598 21.3327 15.9998 21.3327Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.29355 15.5341C6.29355 15.2141 5.41355 14.6274 4.72021 13.9341C3.52021 12.6008 2.72021 11.0008 2.72021 9.13411C2.72021 7.26745 4.18688 5.80078 6.05355 5.80078H6.92021C6.65355 6.41411 6.52021 7.09411 6.52021 7.80078V11.8008C6.52021 13.1341 6.80021 14.3874 7.29355 15.5341Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.7065 15.5341C25.7065 15.2141 26.5865 14.6274 27.2799 13.9341C28.4799 12.6008 29.2799 11.0008 29.2799 9.13411C29.2799 7.26745 27.8132 5.80078 25.9465 5.80078H25.0799C25.3465 6.41411 25.4799 7.09411 25.4799 7.80078V11.8008C25.4799 13.1341 25.1999 14.3874 24.7065 15.5341Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
