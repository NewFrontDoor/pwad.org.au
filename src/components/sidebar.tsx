/** @jsx jsx */
import {FC, useState, useRef, useEffect} from 'react';
import {jsx, Box, Styled} from 'theme-ui';
import PropTypes from 'prop-types';
import prettyBytes from 'pretty-bytes';
import {PlayCircle, StopCircle} from 'react-feather';
import {DefaultPlayer} from '@newfrontdoor/audio-player';
import Link, {authorLinkProps, assetLinkProps} from './link';
import {Asset, Author, Tune, Copyright} from './queries';
import useToggle from './use-toggle';

/* _Function Index_
-Composer (used within SidebarTune)
-SidebarFiles
-SidebarAuthor
-SidebarScripture
-SidebarTune
-SidebarCopyright
-SidebarMusicCopyright
-Sidebar (wrapper)
*/

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

export const SidebarFiles: FC<{files: Asset[]}> = ({files}) => {
  const [fileExpand, fileToggle] = useToggle(false);
  return (
    <>
      <Styled.h3>Files</Styled.h3>
      <Styled.ul
        sx={{
          listStyle: 'none',
          padding: 0,
          maxHeight: fileExpand ? 'auto' : '100px',
          overflow: 'scroll'
        }}
      >
        {files.map(file => (
          <li key={file._id}>
            <Link {...assetLinkProps(file)} /> ({prettyBytes(file.size || 0)})
          </li>
        ))}
      </Styled.ul>
      {files.length > 4 && (
        <button type="button" onClick={() => fileToggle()}>
          {fileExpand ? 'Collapse' : 'Expand'} files list
        </button>
      )}
    </>
  );
};

SidebarFiles.propTypes = {
  files: PropTypes.array
};

SidebarFiles.defaultProps = {
  files: []
};

export const SidebarTune: FC<Tune> = ({_id, title}) => {
  const [playing, togglePlaying] = useToggle(false);
  return (
    <>
      <Styled.h3>Tune</Styled.h3>
      <Styled.ul
        sx={{
          listStyle: 'none',
          padding: 0
        }}
      >
        <li key={_id}>
          <span
            sx={{verticalAlign: 'text-top', paddingRight: '3px'}}
            onClick={() => togglePlaying()}
          >
            {playing ? <StopCircle size={18} /> : <PlayCircle size={18} />}
          </span>
          {title}
        </li>
      </Styled.ul>
    </>
  );
};

SidebarTune.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export const SidebarAlternateTunes: FC<{tunes: Asset[]}> = ({tunes}) => {
  const [tuneExpand, tuneToggle] = useToggle(false);
  const [playing, setPlaying] = useState(null);
  const [soundContainer, setSoundContainer] = useState(null);
  const loadedTune = useRef(null);

  function handleMedia(tune) {
    if (playing === tune) {
      soundContainer.pause();
      setPlaying(null);
    } else {
      loadedTune.current = tune.file.url;
      setPlaying(tune);
      soundContainer.play();
    }
  }

  return (
    <>
      <Styled.h3>Alternate Tunes</Styled.h3>
      <DefaultPlayer
        src={loadedTune.current}
        setAudioPlayer={setSoundContainer}
      />
      <Styled.ul
        sx={{
          listStyle: 'none',
          padding: 0,
          maxHeight: tuneExpand ? 'auto' : '100px',
          overflow: 'scroll'
        }}
      >
        {tunes.map(tune => (
          <li key={tune._id}>
            <span
              sx={{verticalAlign: 'text-top', paddingRight: '3px'}}
              onClick={() => handleMedia(tune)}
            >
              {playing === tune ? (
                <StopCircle size={18} />
              ) : (
                <PlayCircle size={18} />
              )}
            </span>
            {tune.title}
          </li>
        ))}
      </Styled.ul>
      {tunes.length > 4 && (
        <button type="button" onClick={() => tuneToggle()}>
          {tuneExpand ? 'Collapse' : 'Expand'} tune list
        </button>
      )}
    </>
  );
};

SidebarAlternateTunes.propTypes = {
  tunes: PropTypes.array
};

SidebarAlternateTunes.defaultProps = {
  tunes: []
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

export const SidebarTuneComposer: FC<Tune> = ({composer, metre}) => (
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

SidebarTuneComposer.propTypes = {
  composer: PropTypes.any,
  metre: PropTypes.any
};

SidebarTuneComposer.defaultProps = {
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
