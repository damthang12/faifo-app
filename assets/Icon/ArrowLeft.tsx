import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function ArrowLeftIcon({size = 25, color = "white"}) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M15 19.92L8.48003 13.4C7.71003 12.63 7.71003 11.37 8.48003 10.6L15 4.08002" stroke={color}
                  stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    );
}
