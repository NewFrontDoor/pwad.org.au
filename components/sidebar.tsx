/** @jsx jsx */
import React, {FC} from 'react';
import {jsx, Styled} from 'theme-ui';
import PropTypes from 'prop-types';
import prettyBytes from 'pretty-bytes';
import Link, {authorLinkProps, assetLinkProps} from './link';
import {Author, SearchResult} from './queries';

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

const Sidebar: FC<SearchResult> = ({
  author,
  scripture,
  tune,
  copyright,
  alternateTunes,
  files: fileList
}) => {
  let files = fileList || [];

  if (tune?.file) {
    files = files.concat(tune.file);
  }

  if (alternateTunes) {
    files = files.concat(alternateTunes.map(x => x.file));
  }

  files = files.filter(Boolean);

  return (
    <>
      {files.length > 0 && (
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
                <Link {...assetLinkProps(file)} /> (
                {prettyBytes(file.size || 0)})
              </li>
            ))}
          </Styled.ul>
        </>
      )}

      {author && (
        <>
          <Styled.h3>Hymn Author</Styled.h3>
          <Styled.p>
            <Link {...authorLinkProps(author)} />
          </Styled.p>
        </>
      )}

      {scripture && (
        <>
          <Styled.h3>Scripture</Styled.h3>
          <Styled.p>{scripture}</Styled.p>
        </>
      )}

      {tune && (
        <>
          <Styled.h3>Tune Composer</Styled.h3>
          <Composer {...tune.composer} />
          {tune.metre && (
            <>
              <Styled.h3>Metre</Styled.h3>
              <Styled.p>{tune.metre.metre}</Styled.p>
            </>
          )}
        </>
      )}

      {copyright && (
        <>
          <Styled.h3>Copyright (words)</Styled.h3>
          <Styled.p>{copyright.name || '-'}</Styled.p>
        </>
      )}

      {tune?.musicCopyright && (
        <>
          <Styled.h3>Copyright (music)</Styled.h3>
          <Styled.p>{tune.musicCopyright.name || '-'}</Styled.p>
        </>
      )}
    </>
  );
};

Sidebar.propTypes = {
  files: PropTypes.array,
  author: PropTypes.object,
  scripture: PropTypes.string,
  alternateTunes: PropTypes.array,
  tune: PropTypes.shape({
    file: PropTypes.string,
    composer: PropTypes.string,
    metre: PropTypes.object,
    musicCopyright: PropTypes.object
  }),
  copyright: PropTypes.shape({
    name: PropTypes.string
  })
};

Sidebar.defaultProps = {
  files: [],
  author: {},
  scripture: null,
  alternateTunes: [],
  tune: {},
  copyright: {}
};

export default Sidebar;
