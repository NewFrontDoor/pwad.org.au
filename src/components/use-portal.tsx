/* eslint-env browser */

import {useState, useEffect, useLayoutEffect} from 'react';

function usePortal(id: string): Element {
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    setPortalNode(document.createElement('div'));
  }, []);

  useLayoutEffect(() => {
    let rootNode = document.querySelector(`#${id}`);

    if (rootNode) {
      rootNode.append(portalNode);
    } else {
      const temporaryElement = document.createElement('div');
      temporaryElement.setAttribute('id', id);
      document.body.append(temporaryElement);
      rootNode = temporaryElement;
    }

    rootNode.append(portalNode);

    return () => {
      rootNode.remove();
    };
  }, [id, portalNode]);

  return portalNode;
}

export default usePortal;
