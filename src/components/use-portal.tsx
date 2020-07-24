/* eslint-env browser */
/* eslint-disable unicorn/prefer-node-append */

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
      rootNode.remove();
    };
  }, [id, portalNode]);

  return portalNode;
}

export default usePortal;
