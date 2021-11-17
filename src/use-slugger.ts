import {useRef} from 'react';
import GithubSlugger from 'github-slugger';

export {default as GithubSlugger} from 'github-slugger';

export function useSlugger() {
  const slugger = useRef(new GithubSlugger());

  return slugger.current;
}
