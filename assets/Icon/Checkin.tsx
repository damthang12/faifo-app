import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function CheckInIcon({size = 25, color = "white"}) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 25" fill="none">
            <Path d="M11.9999 13.9299C13.723 13.9299 15.1199 12.5331 15.1199 10.8099C15.1199 9.08681 13.723 7.68994 11.9999 7.68994C10.2768 7.68994 8.87988 9.08681 8.87988 10.8099C8.87988 12.5331 10.2768 13.9299 11.9999 13.9299Z" stroke="#252B37" stroke-width="1.5"/>
            <Path d="M3.6202 8.99C5.5902 0.330002 18.4202 0.340003 20.3802 9C21.5302 14.08 18.3702 18.38 15.6002 21.04C13.5902 22.98 10.4102 22.98 8.3902 21.04C5.6302 18.38 2.4702 14.07 3.6202 8.99Z" stroke="#252B37" stroke-width="1.5"/>
        </Svg>

    );
}
