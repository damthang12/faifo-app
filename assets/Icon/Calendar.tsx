import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function CalendarIcon({ size = 25, color = "white" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 25" fill="none" >
        <Path d="M8 2.5V5.5" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M16 2.5V5.5" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M3.5 9.58984H20.5" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M21 9V17.5C21 20.5 19.5 22.5 16 22.5H8C4.5 22.5 3 20.5 3 17.5V9C3 6 4.5 4 8 4H16C19.5 4 21 6 21 9Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M15.6947 14.1992H15.7037" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M15.6947 17.1992H15.7037" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M11.9955 14.1992H12.0045" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M11.9955 17.1992H12.0045" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M8.29431 14.1992H8.30329" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M8.29431 17.1992H8.30329" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>

);
}
