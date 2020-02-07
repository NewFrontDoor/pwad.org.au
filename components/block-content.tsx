import React, {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import {Styled} from 'theme-ui';
import SanityBlockContent from '@sanity/block-content-to-react';
import Link from './link';

type InternalLinkProps = {
  mark: {
    reference?: {
      _id?: string;
      _type?: string;
    };
  };
  children: ReactNode;
};

const InternalLink: FC<InternalLinkProps> = ({children, mark}) => {
  const {_type, _id} = mark.reference;
  return <Link href={`/${_type}/${_id}`}>{children}</Link>;
};

InternalLink.propTypes = {
  mark: PropTypes.shape({
    reference: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _type: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  children: PropTypes.node.isRequired
};

type ExternalLinkProps = {
  mark: {
    blank?: boolean;
    href?: string;
  };
  children: ReactNode;
};

const ExternalLink: FC<ExternalLinkProps> = ({children, mark}) => {
  const {blank, href} = mark;
  return blank ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <a href={href}>{children}</a>
  );
};

ExternalLink.propTypes = {
  mark: PropTypes.shape({
    blank: PropTypes.bool,
    href: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired
};

type ImageProps = {
  node: {
    asset?: any;
  };
};

const Image: FC<ImageProps> = ({node}) => {
  return <img {...node.asset} />;
};

Image.propTypes = {
  node: PropTypes.shape({
    asset: PropTypes.any
  }).isRequired
};

const serializers = {
  types: {
    block(props: unknown) {
      return <Styled.p variant="prose" {...props} />;
    },
    img: Image
  },
  marks: {
    internalLink: InternalLink,
    externalLink: ExternalLink
  }
};

type BlockContentProps = {
  blocks: any;
};

const BlockContent: FC<BlockContentProps> = props => (
  <SanityBlockContent {...props} serializers={serializers} />
);

export default BlockContent;
