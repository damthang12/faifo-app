import {useMemo} from 'react';
import {Platform, useWindowDimensions} from 'react-native';


export function useIsTablet() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const minDim = Math.min(width, height);
    return "isPad" in Platform && Platform.isPad || minDim >= 768;
  }, [width, height]);
}
