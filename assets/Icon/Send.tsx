import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function SendIcon({size = 25, color = "white"}) {
    return (
        <Svg
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 24 24"
        >
            <Path
                stroke="#717680"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m7.4 6.32 8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92M10.11 13.65l3.58-3.59"
            ></Path>
        </Svg>
    );
}
