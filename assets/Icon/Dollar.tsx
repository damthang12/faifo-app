import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function DollarIcon({size = 25, color = "white"}) {
    return (
    <Svg width={size} height={size}  viewBox="0 0 20 21" fill="none">
        <Path d="M7.22656 12.4415C7.22656 13.5165 8.05156 14.3832 9.07656 14.3832H11.1682C12.0599 14.3832 12.7849 13.6249 12.7849 12.6915C12.7849 11.6749 12.3432 11.3165 11.6849 11.0832L8.32656 9.91654C7.66823 9.68321 7.22656 9.32487 7.22656 8.30821C7.22656 7.37487 7.95156 6.61654 8.84323 6.61654H10.9349C11.9599 6.61654 12.7849 7.48321 12.7849 8.55821" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M10 5.5V15.5" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M10 18.8333C14.6024 18.8333 18.3334 15.1024 18.3334 10.5C18.3334 5.89762 14.6024 2.16666 10 2.16666C5.39765 2.16666 1.66669 5.89762 1.66669 10.5C1.66669 15.1024 5.39765 18.8333 10 18.8333Z" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>

    );
}
