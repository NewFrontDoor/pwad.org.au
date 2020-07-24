/* eslint-env browser */
/* eslint-disable unicorn/prefer-node-append, unicorn/prefer-node-remove */

import {useState, useEffect, useLayoutEffect} from 'react';

function usePortal(id: string): Element {
  const [portalNode, setPortalNode] = useState(null);

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
      rootNode.parentNode.removeChild(rootNode);
    };
  }, [id, portalNode]);

  return portalNode;
}

export default usePortal;
