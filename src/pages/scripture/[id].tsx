import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Text, Box} from 'theme-ui';

import * as scriptureQuery from '../../../queries/scripture';
import * as resourceQuery from '../../../queries/resource';
import {Scripture, MenuItem, ScripturePropTypes} from '../../../queries/_types';

import PageLayout from '../../components/page-layout';
import BlockContent from '../../components/block-content';
import ShortListButton from '../../components/shortlist-button';

const ScriptureById: FC<Scripture> = (props) => {
  const {content, title} = props;

  return (
    <Box sx={{width: '100%'}}>
      <Text as="h2">
        <ShortListButton item={props} />
        {title}
      </Text>
      {content && <BlockContent blocks={content} />}
    </Box>
  );
};

ScriptureById.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.any
};

type ScriptureProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ScripturePage: NextPage<ScriptureProps> = ({scripture, menuItems}) => {
  return (
    <PageLayout menuItems={menuItems}>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <ScriptureById {...scripture} />
    </PageLayout>
  );
};

ScripturePage.propTypes = {
  scripture: ScripturePropTypes,
  menuItems: PropTypes.array
};

export default ScripturePage;

export const getServerSideProps: GetServerSideProps<{
  scripture: Scripture;
  menuItems: MenuItem[];
}> = async function (context) {
  let id = context.params.id;

  if (Array.isArray(id)) {
    id = id[0];
  }

  const menuItems = await resourceQuery.menuItems();
  const scripture = await scriptureQuery.getById(id);

  return {
    props: {
      scripture,
      menuItems
    }
  };
};
