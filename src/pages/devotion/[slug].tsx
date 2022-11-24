import PropTypes from "prop-types";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { Styled, Box, Flex } from "theme-ui";
import BlockContent from "../../components/block-content";

import is from "../../is";
import * as devotionContentQuery from "../../../queries/devotion-content";
import * as resourceQuery from "../../../queries/resource";
import { DevotionContent, MenuItem } from "../../../queries/_types";

import PageLayout from "../../components/page-layout";
import Sidebar, { SidebarContentPDF } from "../../components/sidebar";

type ContentProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Content: NextPage<ContentProps> = ({ menuItems, devotionContent, slug }) => {
  const {title, content} = devotionContent
  return (
    <PageLayout menuItems={menuItems}>
        <Styled.h1>{devotionContent.title}</Styled.h1>
        <Flex
        sx={{
          flexDirection: ['column-reverse', 'row', 'row'],
          // TODO: What should this value actually be?
          justifyContent: 'flex-start',
          gap: "30px"
        }}
      >
        <Sidebar>
          <>
            {content && <SidebarContentPDF content={content} title={title} header={''}/>}
          </>
        </Sidebar>
        <Box>
        {content && <BlockContent blocks={content} />}
        {!content && <div>No devotion found for that date.</div>}
        </Box>
      </Flex>
    </PageLayout>
    
  );
};

Content.propTypes = {
  devotionContent: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    _type: is("devotionContent"),
    content: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default Content;

export const getServerSideProps: GetServerSideProps<{
  devotionContent: DevotionContent;
  menuItems: MenuItem[];
  slug: string;
}> = async function (context) {
  let slug = context.params?.slug;

  if (Array.isArray(slug)) {
    slug = slug[0];
  }

  if (typeof slug === "undefined") {
    return {
      notFound: true,
    };
  }

  const menuItems = await resourceQuery.menuItems();
  const devotionContent = await devotionContentQuery.getByRestrictedSlug(
    slug
  );

  return {
    props: {
      menuItems,
      devotionContent,
      slug
    },
  };
};
