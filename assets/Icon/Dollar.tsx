import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function DollarIcon({size = 25, color = "white"}) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 25" fill="none" >
            <Path d="M8.67188 14.8298C8.67188 16.1198 9.66188 17.1598 10.8919 17.1598H13.4019C14.4719 17.1598 15.3419 16.2498 15.3419 15.1298C15.3419 13.9098 14.8119 13.4798 14.0219 13.1998L9.99187 11.7998C9.20187 11.5198 8.67188 11.0898 8.67188 9.86984C8.67188 8.74984 9.54187 7.83984 10.6119 7.83984H13.1219C14.3519 7.83984 15.3419 8.87984 15.3419 10.1698" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M12 6.5V18.5" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z" stroke="#252B37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    );
}
