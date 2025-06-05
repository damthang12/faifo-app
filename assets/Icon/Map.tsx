import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function MapIcon({size = 25, color = "white"}) {
    return (
        <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
            <Path d="M8.6665 2V5" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M16.6665 2V5" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M21.6665 8.5V13.63C20.7765 12.92 19.6465 12.5 18.4165 12.5C17.1865 12.5 16.0365 12.93 15.1365 13.66C13.9265 14.61 13.1665 16.1 13.1665 17.75C13.1665 18.73 13.4465 19.67 13.9265 20.45C14.2965 21.06 14.7765 21.59 15.3465 22H8.6665C5.1665 22 3.6665 20 3.6665 17V8.5C3.6665 5.5 5.1665 3.5 8.6665 3.5H16.6665C20.1665 3.5 21.6665 5.5 21.6665 8.5Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M7.6665 11H13.6665" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M7.6665 16H10.2865" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M23.6665 17.75C23.6665 18.73 23.3865 19.67 22.9065 20.45C22.6265 20.93 22.2765 21.35 21.8665 21.69C20.9465 22.51 19.7465 23 18.4165 23C17.2665 23 16.2065 22.63 15.3465 22C14.7765 21.59 14.2965 21.06 13.9265 20.45C13.4465 19.67 13.1665 18.73 13.1665 17.75C13.1665 16.1 13.9265 14.61 15.1365 13.66C16.0365 12.93 17.1865 12.5 18.4165 12.5C19.6465 12.5 20.7765 12.92 21.6665 13.63C22.8865 14.59 23.6665 16.08 23.6665 17.75Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M18.4165 20.25C18.4165 18.87 19.5365 17.75 20.9165 17.75C19.5365 17.75 18.4165 16.63 18.4165 15.25C18.4165 16.63 17.2965 17.75 15.9165 17.75C17.2965 17.75 18.4165 18.87 18.4165 20.25Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>



    );
}
