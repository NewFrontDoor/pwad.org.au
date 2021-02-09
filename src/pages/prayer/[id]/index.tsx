import React, {FC} from 'react';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import PropTypes from 'prop-types';
import {Text, Flex, Box} from 'theme-ui';

import is from '../../../is';
import * as prayerQuery from '../../../../queries/prayer';
import * as resourceQuery from '../../../../queries/resource';
import {Prayer, MenuItem} from '../../../../queries/_types';

import PageLayout from '../../../components/page-layout';
import Sidebar, {
  SidebarCopyright,
  SidebarAuthor
} from '../../../components/sidebar';
import BlockContent from '../../../components/block-content';
import ShortListButton from '../../../components/shortlist-button';

const PrayerById: FC<Prayer> = (props) => {
  const {author, content, title, copyright} = props;

  return (
    <Flex
      sx={{
        flexDirection: ['column-reverse', 'column-reverse', 'row'],
        // TODO: What should this value actually be?
        gap: '2em'
      }}
    >
      <Sidebar>
        <>
          {author && <SidebarAuthor {...author} />}
          {copyright && <SidebarCopyright {...copyright} />}
        </>
      </Sidebar>
      <Box sx={{width: '100%'}}>
        <Text as="h2">
          <ShortListButton item={props} />
          {title}
        </Text>
        {content && <BlockContent blocks={content} />}
      </Box>
    </Flex>
  );
};

PrayerById.propTypes = {
  author: PropTypes.any,
  content: PropTypes.any,
  title: PropTypes.string,
  copyright: PropTypes.any
};

// Const Prayers: FC = () => {
//   const [page, changePage] = useState(1);
//
//   const {loading, error, data} = useFindPrayerContentsQuery({
//     variables: {page}
//   });
//
//   const firstId = get(prayerPagination, 'items.0._id');
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

type PrayerPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const PrayerPage: NextPage<PrayerPageProps> = ({prayer, menuItems}) => {
  return (
    <PageLayout menuItems={menuItems}>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <PrayerById {...prayer} />
      {/* <Prayers /> */}
    </PageLayout>
  );
};

PrayerPage.propTypes = {
  prayer: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    _type: is('prayer'),
    categories: PropTypes.array.isRequired,
    content: PropTypes.array.isRequired,
    keywords: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  menuItems: PropTypes.array.isRequired
};

export default PrayerPage;

export const getServerSideProps: GetServerSideProps<{
  prayer: Prayer;
  menuItems: MenuItem[];
}> = async function (context) {
  let id = context.params?.id;

  if (Array.isArray(id)) {
    [id] = id;
  }

  if (typeof id === 'undefined') {
    return {
      notFound: true
    };
  }

  const menuItems = await resourceQuery.menuItems();
  const prayer = await prayerQuery.getById(id);

  return {
    props: {
      prayer,
      menuItems
    }
  };
};
