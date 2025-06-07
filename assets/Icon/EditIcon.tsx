import * as React from "react";
import Svg, {Path} from "react-native-svg";


export default function EditIcon({ size = 25, color = "white" }) {
  return (
    <Svg  width={size} height={size} viewBox="0 0 24 25" fill="none">
        <Path d="M13.26 4.09924L5.04997 12.7892C4.73997 13.1192 4.43997 13.7692 4.37997 14.2192L4.00997 17.4592C3.87997 18.6292 4.71997 19.4292 5.87997 19.2292L9.09997 18.6792C9.54997 18.5992 10.18 18.2692 10.49 17.9292L18.7 9.23924C20.12 7.73924 20.76 6.02924 18.55 3.93924C16.35 1.86924 14.68 2.59924 13.26 4.09924Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M11.89 5.55078C12.32 8.31078 14.56 10.4208 17.34 10.7008" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M3 22.5H21" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>


  );
}
