import React, {FC} from 'react';
import {NextPage} from 'next';
import PropTypes from 'prop-types';
import {Text, Flex, Box} from 'theme-ui';

import withApollo from '../../../lib/with-apollo-client';

import PageLayout from '../../../components/page-layout';
import Link, {authorLinkProps} from '../../../components/link';
import BlockContent from '../../../components/block-content';
import ShortListButton from '../../../components/shortlist-button';
import {useFindOnePrayerQuery} from '../../../components/queries';

type PrayerByIdProps = {
  id: string;
};

const PrayerById: FC<PrayerByIdProps> = ({id}) => {
  const {loading, error, data} = useFindOnePrayerQuery({
    variables: {id}
  });

  const {author, content, title, copyright} = data?.prayerById ?? {};

  return (
    <>
      {loading && 'Loading...'}
      {error && `Error! ${error.message}`}
      {data?.prayerById && (
        <Flex
          sx={{
            flexDirection: ['column-reverse', 'column-reverse', 'row'],
            // TODO: What should this value actually be?
            gap: '2em'
          }}
        >
          <Box>
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
              <ShortListButton itemId={data.prayerById._id} />
              {title}
            </Text>
            {content && <BlockContent blocks={content} />}
          </Box>
        </Flex>
      )}
    </>
  );
};

PrayerById.propTypes = {
  id: PropTypes.string.isRequired
};

// Const Prayers: FC = () => {
//   const [page, changePage] = useState(1);
//
//   const {loading, error, data} = useFindPrayerContentsQuery({
//     variables: {page}
//   });
//
//   Const firstId = get(prayerPagination, 'items.0._id');
//
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//
//   if (error) {
//     return <p>Error! ${error.message}</p>;
//   }
//
//   const {currentPage, itemCount, perPage} = data.prayerPagination.pageInfo;
//
//   return (
//     <>
//       <Text as="ul">
//         {data.prayerPagination.items.map(({_id, title}) => (
//           <li key={_id}>
//             <Link
//               as={`/prayer/${_id}/${kebabCase(title)}`}
//               href="/prayer/[id]/[name]"
//             >
//               {title}
//             </Link>
//           </li>
//         ))}
//       </Text>
//       <Pagination
//         size="small"
//         currentPage={currentPage}
//         pageSize={perPage}
//         totalCount={itemCount}
//         onPageChange={changePage}
//       />
//     </>
//   );
// };

type PrayerProps = {id: string};

const Prayer: NextPage<PrayerProps> = ({id}) => {
  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <PrayerById id={id} />
      {/* <Prayers /> */}
    </PageLayout>
  );
};

Prayer.getInitialProps = ({query: {id}}) => {
  if (Array.isArray(id)) {
    return {id: id[0]};
  }

  return {id};
};

Prayer.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Prayer);
