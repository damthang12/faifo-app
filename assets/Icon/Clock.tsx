import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function ClockIcon({size = 24, color = "white"}) {
    return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <Path d="M18.3332 9.99935C18.3332 14.5993 14.5998 18.3327 9.99984 18.3327C5.39984 18.3327 1.6665 14.5993 1.6665 9.99935C1.6665 5.39935 5.39984 1.66602 9.99984 1.66602C14.5998 1.66602 18.3332 5.39935 18.3332 9.99935Z" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M13.0919 12.6495L10.5086 11.1078C10.0586 10.8411 9.69189 10.1995 9.69189 9.67448V6.25781" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    );
}
