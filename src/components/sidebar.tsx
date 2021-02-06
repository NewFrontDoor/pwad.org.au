/** @jsx jsx */
import {FC} from 'react';
import {jsx, Box, Styled} from 'theme-ui';
import PropTypes from 'prop-types';
import prettyBytes from 'pretty-bytes';
import {AudioManager} from '@newfrontdoor/audio-player';
import Link, {authorLinkProps, assetLinkProps} from './link';
import {Asset, Author, Tune, Copyright} from '../../queries/_types';
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

const Composer: FC<Author> = (props) => {
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

export const SidebarFiles: FC<{files: Asset[]}> = ({files, generatePPT}) => {
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
        {files.map((file) => (
          <li key={file._id}>
            <Link {...assetLinkProps(file)} /> ({prettyBytes(file.size || 0)})
          </li>
        ))}
        <button type="button" onClick={() => generatePPT()}>
          Powerpoint
        </button>
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
  files: PropTypes.array,
  generatePPT: PropTypes.func
};

SidebarFiles.defaultProps = {
  files: [],
  generatePPT: () => void(0)
};

export const SidebarTune: FC<Tune> = ({_id, title, file}) => {
  console.log({_id, title, file});
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
          {file ? (
            <AudioManager.PlayButton src={file.url} variant="transparent">
              {title}
            </AudioManager.PlayButton>
          ) : (
            title
          )}
        </li>
      </Styled.ul>
    </>
  );
};

SidebarTune.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  file: PropTypes.any
};

SidebarTune.defaultProps = {
  file: undefined
};

export const SidebarAlternateTunes: FC<{tunes?: Tune[]}> = ({tunes}) => {
  return (
    <>
      <Styled.h3>Alternate Tunes</Styled.h3>
      <Styled.ul
        sx={{
          listStyle: 'none',
          padding: 0
        }}
      >
        {tunes.map((tune) => (
          <li key={tune._id}>
            {tune.file ? (
              <AudioManager.PlayButton
                src={tune.file.url}
                variant="transparent"
              >
                {tune.title}
              </AudioManager.PlayButton>
            ) : (
              tune.title
            )}
          </li>
        ))}
      </Styled.ul>
    </>
  );
};

SidebarAlternateTunes.propTypes = {
  tunes: PropTypes.array
};

SidebarAlternateTunes.defaultProps = {
  tunes: []
};

export const SidebarAuthor: FC<Author> = (props) => (
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

export const SidebarMusicCopyright: FC<Pick<Copyright, 'name'>> = (props) => (
  <>
    <Styled.h3>Copyright (music)</Styled.h3>
    <Styled.p>{props.name || '-'}</Styled.p>
  </>
);

SidebarMusicCopyright.propTypes = {
  name: PropTypes.string
};

const Sidebar: FC = ({children}) => (
  <AudioManager>
    <Box sx={{marginRight: '40px'}}>
      <AudioManager.NativePlayer controls={false} />
      {children}
    </Box>
  </AudioManager>
);

Sidebar.propTypes = {
  children: PropTypes.node
};

Sidebar.defaultProps = {
  children: undefined
};

export default Sidebar;
