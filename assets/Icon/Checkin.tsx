import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function CheckInIcon({size = 25, color = "white"}) {
    return (
        <Svg  width={size} height={size} viewBox="0 0 20 20" fill="none">
            <Path d="M9.9999 11.1922C11.4358 11.1922 12.5999 10.0281 12.5999 8.59219C12.5999 7.15625 11.4358 5.99219 9.9999 5.99219C8.56396 5.99219 7.3999 7.15625 7.3999 8.59219C7.3999 10.0281 8.56396 11.1922 9.9999 11.1922Z" stroke="#252B37" stroke-width="1.5"/>
            <Path d="M3.01675 7.0763C4.65842 -0.140363 15.3501 -0.132029 16.9834 7.08464C17.9417 11.318 15.3084 14.9013 13.0001 17.118C11.3251 18.7346 8.67508 18.7346 6.99175 17.118C4.69175 14.9013 2.05842 11.3096 3.01675 7.0763Z" stroke="#252B37" stroke-width="1.5"/>
        </Svg>
    );
}
