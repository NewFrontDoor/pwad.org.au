/* eslint-env browser */
/* eslint-disable unicorn/prefer-dom-node-append, unicorn/prefer-dom-node-remove */

import {useState, useEffect, useLayoutEffect} from 'react';

function usePortal(id: string): HTMLDivElement | undefined {
  const [portalNode, setPortalNode] = useState<HTMLDivElement>();

  useEffect(() => {
    setPortalNode(document.createElement('div'));
  }, []);

  useLayoutEffect(() => {
    let rootNode = document.querySelector(`#${id}`);

    if (rootNode && portalNode) {
      rootNode.appendChild(portalNode);
    } else {
      const temporaryElement = document.createElement('div');
      temporaryElement.setAttribute('id', id);
      document.body.appendChild(temporaryElement);
      rootNode = temporaryElement;
    }

    if (rootNode && portalNode) {
      rootNode.appendChild(portalNode);
    }

    return () => {
      rootNode?.parentNode?.removeChild(rootNode);
    };
  }, [id, portalNode]);

  return portalNode;
}

export default usePortal;
