import React from 'react';
import PropTypes from 'prop-types';
import remark from 'remark';
import remarkReact from 'remark-react';
import breaks from 'remark-breaks';
import Text from 'mineral-ui/Text';

const remarkConfig = {
  remarkReactComponents: {
    p: props => <Text appearance="prose" {...props} />,
    h1: props => <Text as="h1" {...props} />,
    h2: props => <Text as="h2" {...props} />,
    h3: props => <Text as="h3" {...props} />,
    h4: props => <Text as="h4" {...props} />,
    h5: props => <Text as="h5" {...props} />,
    h6: props => <Text as="h6" {...props} />
  }
};

const Markdown = ({useBreaks, children}) =>
  remark()
    .use(useBreaks ? breaks : () => {})
    .use(remarkReact, remarkConfig)
    .processSync(children).contents;

Markdown.propTypes = {
  useBreaks: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Markdown.defaultProps = {
  useBreaks: false
};

export default Markdown;
