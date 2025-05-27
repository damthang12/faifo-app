import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function ClockIcon({size = 25, color = "white"}) {
    return (
        <Svg width={size} height="25" viewBox="0 0 24 25" fill="none">
            <Path d="M22 12.5C22 18.02 17.52 22.5 12 22.5C6.48 22.5 2 18.02 2 12.5C2 6.98 6.48 2.5 12 2.5C17.52 2.5 22 6.98 22 12.5Z" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M15.7099 15.68L12.6099 13.83C12.0699 13.51 11.6299 12.74 11.6299 12.11V8.01001" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    );
}
