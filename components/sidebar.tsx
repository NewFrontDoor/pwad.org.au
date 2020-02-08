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

const SidebarFiles: FC<{file: string; files: Array; alternateTunes: Array}> = ({
  file,
  files: fileList,
  alternateTunes
}) => {
  let files = fileList || [];

  if (file) {
    files = files.concat(file);
  }

  if (alternateTunes) {
    files = files.concat(alternateTunes.map(x => x.file));
  }

  files = files.filter(Boolean);

  return (
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
};

SidebarFiles.propTypes = {
  alternateTunes: PropTypes.array,
  file: PropTypes.string,
  files: PropTypes.array
};

SidebarFiles.defaultProps = {
  alternateTunes: [],
  file: null,
  files: []
};

const SidebarAuthor: FC<Author> = props => {
  return (
    <>
      <Styled.h3>Hymn Author</Styled.h3>
      <Styled.p>
        <Link {...authorLinkProps(props)} />
      </Styled.p>
    </>
  );
};

const SidebarScripture: FC<{scripture: string}> = ({scripture}) => {
  return (
    <>
      <Styled.h3>Scripture</Styled.h3>
      <Styled.p>{scripture}</Styled.p>
    </>
  );
};

SidebarScripture.propTypes = {
  scripture: PropTypes.string
};

SidebarScripture.defaultProps = {
  scripture: null
};

const SidebarTune: FC<Tune> = ({composer, metre}) => {
  return (
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
};

SidebarTune.propTypes = {
  composer: PropTypes.object,
  metre: PropTypes.shape({
    metre: PropTypes.string
  })
};

SidebarTune.defaultProps = {
  composer: null,
  metre: {}
};

const SidebarCopyright: FC<Copyright> = ({name}) => {
  return (
    <>
      <Styled.h3>Copyright (words)</Styled.h3>
      <Styled.p>{name || '-'}</Styled.p>
    </>
  );
};

SidebarCopyright.propTypes = {
  name: PropTypes.string
};

SidebarCopyright.defaultProps = {
  name: 'Public Domain'
};

const SidebarMusicCopyright: FC<Tune> = ({musicCopyright}) => {
  return (
    <>
      <Styled.h3>Copyright (music)</Styled.h3>
      <Styled.p>{musicCopyright.name || '-'}</Styled.p>
    </>
  );
};

SidebarMusicCopyright.propTypes = {
  musicCopyright: PropTypes.shape({
    name: PropTypes.string
  })
};

SidebarMusicCopyright.defaultProps = {
  musicCopyright: {}
};

const Sidebar = ({children}) => {
  return <Box sx={{marginRight: '40px'}}>{children}</Box>;
};

Sidebar.propTypes = {
  children: PropTypes.any
};

Sidebar.defaultProps = {
  children: null
};

export default Sidebar;
export {
  SidebarAuthor,
  SidebarCopyright,
  SidebarFiles,
  SidebarMusicCopyright,
  SidebarScripture,
  SidebarTune
};
