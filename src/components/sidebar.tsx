/** @jsx jsx */
import {ReactNode} from 'react';
import {jsx, Box, Styled, Button} from 'theme-ui';
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

const Composer = (props: Author) => {
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

type SidebarFilesProps = {
  files: Asset[];
  generatePPT: () => void;
};

export const SidebarFiles = ({files, generatePPT}: SidebarFilesProps) => (
  <>
    <Styled.h3>Files</Styled.h3>
    <Styled.ul
      sx={{
        listStyle: 'none',
        padding: 0
      }}
    >
      {files.map((file) => (
        <li key={file._id}>
          <Link {...assetLinkProps(file)} /> ({prettyBytes(file.size || 0)})
        </li>
      ))}
      <li key="ppt">
        <Button
          variant="transparent"
          sx={{padding: 0}}
          onClick={() => {
            generatePPT();
          }}
        >
          Powerpoint file
        </Button>
      </li>
    </Styled.ul>
  </>
);

SidebarFiles.propTypes = {
  files: PropTypes.array,
  generatePPT: PropTypes.func
};

SidebarFiles.defaultProps = {
  files: [],
  generatePPT: () => undefined
};

export const SidebarTune = ({_id, title, file}: Tune) => (
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

SidebarTune.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  file: PropTypes.any
};

SidebarTune.defaultProps = {
  file: undefined
};

export const SidebarAlternateTunes = ({tunes}: {tunes: Tune[]}) => {
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

export const SidebarAuthor = (props: Author) => (
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

export const SidebarScripture = ({scripture}: {scripture: string}) => (
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

export const SidebarTuneComposer = ({composer, metre}: Tune) => (
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

export const SidebarCopyright = ({name}: Copyright) => (
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

export const SidebarMusicCopyright = (props: Pick<Copyright, 'name'>) => (
  <>
    <Styled.h3>Copyright (music)</Styled.h3>
    <Styled.p>{props.name || '-'}</Styled.p>
  </>
);

SidebarMusicCopyright.propTypes = {
  name: PropTypes.string
};

const Sidebar = ({children}: {children: ReactNode}) => (
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
