import React, {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import {Styled, sx} from 'theme-ui';
import SanityBlockContent from '@sanity/block-content-to-react';
import getVideoId from 'get-video-id';
import Vimeo from '@u-wave/react-vimeo';
import Youtube from '@u-wave/react-youtube';
import Link, {linkProps, GenLinkProps} from './link';
import {useSlugger} from '../use-slugger';
import Image from 'next/image'

type InternalLinkProps = {
  mark: {
    reference: GenLinkProps;
  };
  children: string;
};

const InternalLink = ({children, mark}: InternalLinkProps) => {
  const reference = {...mark.reference, title: children, children};
  return <Link {...linkProps(reference)}>{children}</Link>;
};

InternalLink.propTypes = {
  mark: PropTypes.shape({
    reference: PropTypes.any
  }).isRequired,
  children: PropTypes.any
};

const ExternalLink = ({children, mark}) => {
  const reference = {...mark, isBlank: mark.blank, children, isInternal: false};
  return <Link {...reference} />;
};

ExternalLink.propTypes = {
  mark: PropTypes.shape({
    _key: PropTypes.string.isRequired,
    _type: PropTypes.string.isRequired,
    blank: PropTypes.bool,
    href: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired
};

const ImageSerializer = ({node}) => {
  const {url, metadata} = node.asset;
  const {height, width} = metadata.dimensions
  return <Image src={url} height={height} width={width}/>
};

ImageSerializer.propTypes = {
  node: PropTypes.shape({
    asset: PropTypes.any
  }).isRequired
};

type VideoProps = {
  node: {
    url?: string | null;
  };
};

const Video: FC<VideoProps> = ({node}) => {
  const {url} = node;
  if (typeof url === 'string') {
    const video = getVideoId(url);

    if (video.service === 'youtube' && typeof video.id === 'string') {
      return <Youtube modestBranding annotations={false} video={video.id} />;
    }

    if (video.service === 'vimeo' && typeof video.id === 'string') {
      return <Vimeo showTitle={false} showByline={false} video={video.id} />;
    }
  }

  return null;
};

Video.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

type SerializerProps = {
  node: {
    style: string;
    children: Array<{
      text: string;
    }>;
  };
};

const Block = (props: SerializerProps) => {
  const slugger = useSlugger();

  switch (props.node.style) {
    case 'h2': {
      const name = props.node.children.map((child) => child.text).join(' ');
      const slug = slugger.slug(name);
      return <Styled.h2 {...props} id={slug} />;
    }

    case 'h3':
      return <Styled.h3 {...props} />;
    case 'h4':
      return <Styled.h4 {...props} />;
    case 'h5':
      return <Styled.h5 {...props} />;
    case 'ul':
      return <Styled.ul {...props} />;
    case 'ol':
      return <Styled.ol {...props} />;
    case 'li':
      return <Styled.li {...props} />;
    case 'normal':
      return <Styled.p variant="prose" {...props} />;
    default:
      return <Styled.p variant="prose" {...props} />;
  }
};

const serializers = {
  types: {
    block: Block,
    img: ImageSerializer,
    video: Video,
    image: ImageSerializer
  },
  marks: {
    internalLink: InternalLink,
    link: ExternalLink
  }
};

type BlockContentProps = {
  blocks: any;
};

const BlockContent: FC<BlockContentProps> = (props) => (
  <SanityBlockContent {...props} serializers={serializers} />
);

export default BlockContent;
