import * as React from "react";
import Svg, { Path } from "react-native-svg";

type InviteIconProps = {
  size?: number | string;
  color?: string;
};

export default function InviteIcon({ size = 32, color = "#252B37" }: InviteIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path d="M15.2799 18.3058C17.3491 18.3058 19.0265 16.6284 19.0265 14.5592C19.0265 12.4899 17.3491 10.8125 15.2799 10.8125C13.2106 10.8125 11.5332 12.4899 11.5332 14.5592C11.5332 16.6284 13.2106 18.3058 15.2799 18.3058Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22.1999 26.933C22.1999 23.8264 19.1065 21.293 15.2799 21.293C11.4532 21.293 8.35986 23.813 8.35986 26.933" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M27.9998 16.6667C27.9998 23.6667 22.3332 29.3333 15.3332 29.3333C8.33317 29.3333 2.6665 23.6667 2.6665 16.6667C2.6665 9.66667 8.33317 4 15.3332 4C17.0798 4 18.7465 4.34665 20.2665 4.98665C20.0932 5.51999 19.9998 6.08 19.9998 6.66667C19.9998 7.66667 20.2798 8.61333 20.7732 9.41333C21.0398 9.86666 21.3865 10.28 21.7865 10.6266C22.7198 11.48 23.9598 12 25.3332 12C25.9198 12 26.4798 11.9066 26.9998 11.72C27.6398 13.24 27.9998 14.92 27.9998 16.6667Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M30.6667 6.66732C30.6667 7.09398 30.6133 7.50731 30.5067 7.90731C30.3867 8.44064 30.1733 8.96065 29.8933 9.41398C29.2533 10.494 28.2267 11.334 27 11.7206C26.48 11.9073 25.92 12.0007 25.3333 12.0007C23.96 12.0007 22.72 11.4806 21.7867 10.6273C21.3867 10.2806 21.04 9.86731 20.7733 9.41398C20.28 8.61398 20 7.66732 20 6.66732C20 6.08065 20.0933 5.52064 20.2667 4.9873C20.52 4.21397 20.9467 3.52068 21.5067 2.94735C22.48 1.94735 23.84 1.33398 25.3333 1.33398C26.9067 1.33398 28.3333 2.01401 29.2933 3.10734C30.1467 4.05401 30.6667 5.30732 30.6667 6.66732Z" stroke={color} strokeMiterlimit={10} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M27.32 6.64062H23.3467" stroke={color} strokeMiterlimit={10} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M25.3335 4.69336V8.68001" stroke={color} strokeMiterlimit={10} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
    
  );
}
