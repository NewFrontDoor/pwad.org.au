import React, {FC} from 'react';
import {NextPage} from 'next';
import PropTypes from 'prop-types';
import {Text, Flex, Box} from 'theme-ui';
import Sidebar, {
  SidebarAuthor,
  SidebarCopyright,
  SidebarFiles
} from '../../../components/sidebar';

import withApollo from '../../../../lib/with-apollo-client';

import PageLayout from '../../../components/page-layout';
import Link, {authorLinkProps} from '../../../components/link';
import BlockContent from '../../../components/block-content';
import ShortListButton from '../../../components/shortlist-button';
import {useFindOneLiturgyQuery, Author} from '../../../components/queries';

const Composer: FC<Author> = props => {
  if (props.name) {
    return (
      <Text>
        <Link {...authorLinkProps(props)} />
      </Text>
    );
  }

  return <Text>No Composer</Text>;
};

Composer.propTypes = {
  name: PropTypes.string
};

Composer.defaultProps = {
  name: undefined
};

type LiturgyProps = {
  id: string;
};

const Liturgy: NextPage<LiturgyProps> = ({id}) => {
  const {loading, error, data} = useFindOneLiturgyQuery({
    variables: {id}
  });

  const {author, content, title, copyright} = data?.liturgyById ?? {};
  const files = data?.liturgyById?.files || [];

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      {loading && 'Loading...'}
      {error && `Error! ${error.message}`}
      {data?.liturgyById && (
        <Flex
          sx={{
            flexDirection: ['column-reverse', 'column-reverse', 'row'],
            // TODO: What should this value actually be?
            gap: '2em'
          }}
        >
          <Sidebar>
            {data?.liturgyById && (
              <>
                {files.length > 0 && <SidebarFiles files={files} />}
                {author && <SidebarAuthor {...author} />}
                {copyright && <SidebarCopyright {...copyright} />}
              </>
            )}
          </Sidebar>
          <Box sx={{width: '100%'}}>
            <Text as="h2">
              <ShortListButton itemId={data.liturgyById._id} />
              {title}
            </Text>
            <BlockContent blocks={content} />
          </Box>
        </Flex>
      )}
    </PageLayout>
  );
};

Liturgy.getInitialProps = ({query: {id}}) => {
  if (Array.isArray(id)) {
    return {id: id[0]};
  }

  return {id};
};

Liturgy.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Liturgy);
