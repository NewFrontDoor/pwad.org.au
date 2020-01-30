import React, {FC} from 'react';
import {NextPage} from 'next';
import PropTypes from 'prop-types';
import prettyBytes from 'pretty-bytes';
import {Text, Flex, Box} from 'theme-ui';

import withApollo from '../../../lib/with-apollo-client';

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

  const {author, files, content, title, copyright} = data?.liturgyById ?? {};

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      {loading && 'Loading...'}
      {error && `Error! ${error.message}`}
      {data?.liturgyById && (
        <Flex
          gutterWidth="xxl"
          sx={{flexDirection: ['column-reverse', 'column-reverse', 'row']}}
        >
          <Box>
            {files?.length > 0 && (
              <>
                <Text as="h3">Files</Text>
                <Text as="ul">
                  {files?.map(({_id, file}) => (
                    <li key={_id}>
                      <Link href={file.url} isInternal={false}>
                        {file.filename}
                      </Link>{' '}
                      ({prettyBytes(file.size)})
                    </li>
                  ))}
                </Text>
              </>
            )}

            {author && (
              <>
                <Text as="h3">Hymn Author</Text>
                <Text>
                  <Link {...authorLinkProps(author)} />
                </Text>
              </>
            )}

            {copyright && (
              <>
                <Text as="h3">Copyright</Text>
                <Text>{copyright.name || '-'}</Text>
              </>
            )}
          </Box>
          <Box sx={{width: '100%'}}>
            <Text as="h2">
              <ShortListButton hymn={data.liturgyById} />
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
