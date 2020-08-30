/** @jsx jsx */
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import PropTypes from 'prop-types';
import {jsx, Text, Flex, Box} from 'theme-ui';
import Sidebar, {
  SidebarAuthor,
  SidebarCopyright,
  SidebarFiles
} from '../../../components/sidebar';

import * as liturgyQuery from '../../../../queries/liturgy';
import * as resourceQuery from '../../../../queries/resource';
import {Liturgy, MenuItem, LiturgyPropTypes} from '../../../../queries/_types';

import PageLayout from '../../../components/page-layout';
import BlockContent from '../../../components/block-content';
import ShortListButton from '../../../components/shortlist-button';

type LiturgyProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const LiturgyPage: NextPage<LiturgyProps> = ({menuItems, liturgy}) => {
  const {author, content, title, copyright} = liturgy;
  const files = liturgy?.files || [];

  return (
    <PageLayout menuItems={menuItems}>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <Flex
        sx={{
          flexDirection: ['column-reverse', 'column-reverse', 'row'],
          // TODO: What should this value actually be?
          gap: '2em'
        }}
      >
        <Sidebar>
          {files.length > 0 && <SidebarFiles files={files} />}
          {author && <SidebarAuthor {...author} />}
          {copyright && <SidebarCopyright {...copyright} />}
        </Sidebar>
        <Box sx={{width: '100%'}}>
          <Text as="h2">
            <ShortListButton item={liturgy} />
            {title}
          </Text>
          <BlockContent blocks={content} />
        </Box>
      </Flex>
    </PageLayout>
  );
};

LiturgyPage.propTypes = {
  liturgy: LiturgyPropTypes,
  menuItems: PropTypes.array
};

export default LiturgyPage;

export const getServerSideProps: GetServerSideProps<{
  liturgy: Liturgy;
  menuItems: MenuItem[];
}> = async function (context) {
  let id = context.params.id;

  if (Array.isArray(id)) {
    id = id[0];
  }

  const menuItems = await resourceQuery.menuItems();
  const liturgy = await liturgyQuery.getById(id);

  return {
    props: {
      liturgy,
      menuItems
    }
  };
};
