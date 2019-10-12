import {useState, useEffect, useLayoutEffect} from 'react';

function usePortal(id) {
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    setPortalNode(document.createElement('div'));
  }, []);

  useLayoutEffect(() => {
    let rootNode = document.querySelector(`#${id}`);

    if (rootNode) {
      rootNode.append(portalNode);
    } else {
      const tempEl = document.createElement('div');
      tempEl.setAttribute('id', id);
      document.body.append(tempEl);
      rootNode = tempEl;
    }

    rootNode.append(portalNode);

    return function() {
      rootNode.remove(portalNode);
    };
  }, [id, portalNode]);

  return portalNode;
}

export default usePortal;
