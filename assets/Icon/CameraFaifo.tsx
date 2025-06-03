import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function CameraFifoIcon({size = 25, color = "white"}) {
    return (
        <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
            <Path d="M2.25 9.5V7C2.25 4.51 4.26 2.5 6.75 2.5H9.25" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M15.25 2.5H17.75C20.24 2.5 22.25 4.51 22.25 7V9.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M22.25 16.5V18C22.25 20.49 20.24 22.5 17.75 22.5H16.25" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M9.25 22.5H6.75C4.26 22.5 2.25 20.49 2.25 18V15.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M17.25 10V15C17.25 17 16.25 18 14.25 18H10.25C8.25 18 7.25 17 7.25 15V10C7.25 8 8.25 7 10.25 7H14.25C16.25 7 17.25 8 17.25 10Z" stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M19.25 12.5H5.25" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    );
}
