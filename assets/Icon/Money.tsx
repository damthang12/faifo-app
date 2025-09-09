import * as React from "react";
import Svg, { Path } from "react-native-svg";

type MoneyIconProps = {
  size?: number | string;
  color?: string;
};

export default function MoneyIcon({ size = 32, color = "#252B37" }: MoneyIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M10.6665 15.1996C10.6665 16.2263 11.4665 17.0663 12.4398 17.0663H14.4398C15.2932 17.0663 15.9865 16.3329 15.9865 15.4396C15.9865 14.4663 15.5598 14.1196 14.9332 13.8929L11.7332 12.7729C11.0932 12.5463 10.6665 12.1996 10.6665 11.2263C10.6665 10.3329 11.3598 9.59961 12.2132 9.59961H14.2132C15.1998 9.61294 15.9998 10.4396 15.9998 11.4663"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M13.3335 17.1328V18.1195" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13.3335 8.54688V9.58688" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M13.3198 23.9727C19.2035 23.9727 23.9732 19.203 23.9732 13.3193C23.9732 7.43568 19.2035 2.66602 13.3198 2.66602C7.43616 2.66602 2.6665 7.43568 2.6665 13.3193C2.6665 19.203 7.43616 23.9727 13.3198 23.9727Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.3066 26.5073C18.5066 28.2006 20.4666 29.3073 22.7066 29.3073C26.3466 29.3073 29.3066 26.3473 29.3066 22.7073C29.3066 20.494 28.2133 18.534 26.5466 17.334"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
