/** @jsx jsx */
import React, {FC} from 'react';
import {jsx, Box, Styled} from 'theme-ui';
import PropTypes from 'prop-types';
import prettyBytes from 'pretty-bytes';
import Link, {authorLinkProps, assetLinkProps} from './link';
import {Author, Tune, Copyright} from './queries';

const Composer: FC<Author> = props => {
  if (props.name) {
    return (
      <Styled.p>
        <Link {...authorLinkProps(props)} />
      </Styled.p>
    );
  }

  return <Styled.p>No Composer</Styled.p>;
};

Composer.propTypes = {
  name: PropTypes.string
};

Composer.defaultProps = {
  name: undefined
};

export const SidebarFiles: FC<{files: Asset[]}> = ({files}) => (
  <>
    <Styled.h3>Files</Styled.h3>
    <Styled.ul
      sx={{
        listStyle: 'none',
        padding: 0
      }}
    >
      {files.map(file => (
        <li key={file._id}>
          <Link {...assetLinkProps(file)} /> ({prettyBytes(file.size || 0)})
        </li>
      ))}
    </Styled.ul>
  </>
);

SidebarFiles.propTypes = {
  alternateTunes: PropTypes.array,
  file: PropTypes.string,
  files: PropTypes.array
};

SidebarFiles.defaultProps = {
  alternateTunes: [],
  file: undefined,
  files: []
};

export const SidebarAuthor: FC<Author> = props => (
  <>
    <Styled.h3>Hymn Author</Styled.h3>
    <Styled.p>
      <Link {...authorLinkProps(props)} />
    </Styled.p>
  </>
);

SidebarAuthor.propTypes = {
  name: PropTypes.string
};

SidebarAuthor.defaultProps = {
  name: undefined
};

export const SidebarScripture: FC<{scripture: string}> = ({scripture}) => (
  <>
    <Styled.h3>Scripture</Styled.h3>
    <Styled.p>{scripture}</Styled.p>
  </>
);

SidebarScripture.propTypes = {
  scripture: PropTypes.string
};

SidebarScripture.defaultProps = {
  scripture: undefined
};

export const SidebarTune: FC<Tune> = ({composer, metre}) => (
  <>
    <Styled.h3>Tune Composer</Styled.h3>
    <Composer {...composer} />
    {metre && (
      <>
        <Styled.h3>Metre</Styled.h3>
        <Styled.p>{metre.metre}</Styled.p>
      </>
    )}
  </>
);

SidebarTune.propTypes = {
  composer: PropTypes.object,
  metre: PropTypes.shape({
    metre: PropTypes.string
  })
};

SidebarTune.defaultProps = {
  composer: undefined,
  metre: undefined
};

export const SidebarCopyright: FC<Copyright> = ({name}) => (
  <>
    <Styled.h3>Copyright (words)</Styled.h3>
    <Styled.p>{name || '-'}</Styled.p>
  </>
);

SidebarCopyright.propTypes = {
  name: PropTypes.string
};

SidebarCopyright.defaultProps = {
  name: undefined
};

export const SidebarMusicCopyright: FC<Tune> = props => (
  <>
    <Styled.h3>Copyright (music)</Styled.h3>
    <Styled.p>{props?.musicCopyright.name || '-'}</Styled.p>
  </>
);

SidebarMusicCopyright.propTypes = {
  musicCopyright: PropTypes.shape({
    name: PropTypes.string
  })
};

SidebarMusicCopyright.defaultProps = {
  musicCopyright: undefined
};

const Sidebar: FC = ({children}) => (
  <Box sx={{marginRight: '40px'}}>{children}</Box>
);

Sidebar.propTypes = {
  children: PropTypes.node
};

Sidebar.defaultProps = {
  children: undefined
};

export default Sidebar;
