import * as React from "react";
import Svg, { Path } from "react-native-svg";

type LanguageIconProps = {
  size?: number | string;
  color?: string;
};

export default function LanguageIcon({ size = 32, color = "#252B37" }: LanguageIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path d="M25.4132 24.8925L22.5599 19.1992L19.7065 24.8925" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20.2266 23.8809H24.9199" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22.56 29.3337C18.8266 29.3337 15.7866 26.3071 15.7866 22.5604C15.7866 18.8271 18.8133 15.7871 22.56 15.7871C26.2933 15.7871 29.3333 18.8137 29.3333 22.5604C29.3333 26.3071 26.3066 29.3337 22.56 29.3337Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.69318 2.66602H11.9198C14.6798 2.66602 16.0132 3.99938 15.9465 6.69271V11.9194C16.0132 14.6794 14.6798 16.0127 11.9198 15.946H6.69318C3.99984 15.9994 2.6665 14.666 2.6665 11.906V6.67936C2.6665 3.99936 3.99984 2.66602 6.69318 2.66602Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.0134 7.79883H6.6001" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.29346 6.89258V7.79923" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.6536 7.78516C10.6536 10.1185 8.82691 12.0118 6.58691 12.0118" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.0135 12.0127C11.0402 12.0127 10.1602 11.4927 9.54688 10.666" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2.6665 20C2.6665 25.16 6.83984 29.3333 11.9998 29.3333L10.5998 27" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M29.3333 11.9993C29.3333 6.83935 25.16 2.66602 20 2.66602L21.4 4.99935" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
    
  );
}
