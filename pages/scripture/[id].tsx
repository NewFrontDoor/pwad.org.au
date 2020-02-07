import React, {FC} from 'react';
import {NextPage} from 'next';
import PropTypes from 'prop-types';
import {Text, Box} from 'theme-ui';

import withApollo from '../../lib/with-apollo-client';

import PageLayout from '../../components/page-layout';
import BlockContent from '../../components/block-content';
import ShortListButton from '../../components/shortlist-button';
import {useFindOneScriptureQuery} from '../../components/queries';

type ScriptureByIdProps = {
  id: string;
};

const ScriptureById: FC<ScriptureByIdProps> = ({id}) => {
  const {loading, error, data} = useFindOneScriptureQuery({
    variables: {id}
  });

  const {content, title} = data?.scriptureById ?? {};

  return (
    <>
      {loading && 'Loading...'}
      {error && `Error! ${error.message}`}
      {data?.scriptureById && (
        <Box sx={{width: '100%'}}>
          <Text as="h2">
            <ShortListButton itemId={data.scriptureById._id} />
            {title}
          </Text>
          {content && <BlockContent blocks={content} />}
        </Box>
      )}
    </>
  );
};

ScriptureById.propTypes = {
  id: PropTypes.string.isRequired
};

type ScriptureProps = {id: string};

const Scripture: NextPage<ScriptureProps> = ({id}) => {
  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <ScriptureById id={id} />
    </PageLayout>
  );
};

Scripture.getInitialProps = ({query: {id}}) => {
  if (Array.isArray(id)) {
    return {id: id[0]};
  }

  return {id};
};

Scripture.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Scripture);
