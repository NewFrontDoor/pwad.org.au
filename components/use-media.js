import useMedia from 'use-media';
import {useTheme} from './use-theme';

export const useNarrowMedia = () => {
  const theme = useTheme();
  return useMedia(`(min-width: ${theme.breakpoint_narrow})`);
};

export const useMediumMedia = () => {
  const theme = useTheme();
  return useMedia(`(min-width: ${theme.breakpoint_medium})`);
};

export const useWideMedia = () => {
  const theme = useTheme();
  return useMedia(`(min-width: ${theme.breakpoint_wide})`);
};

export default useMedia;
