import PropTypes from "prop-types";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { Styled, Box, Flex } from "theme-ui";
import BlockContent from "../components/block-content";
import { formatInTimeZone } from "date-fns-tz";

import is from "../is";
import * as resourceQuery from "../../queries/resource";
import { DevotionContent, MenuItem } from "../../queries/_types";

import PageLayout from "../components/page-layout";
import Sidebar, { SidebarContentPDF } from "../components/sidebar";
import Link from "next/link";
import { getByDevotionsByDate } from "../../queries/devotions-by-date";

type ContentProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Content: NextPage<ContentProps> = ({
  menuItems,
  devotions,
  zonedDate,
  formattedDate,
}) => {
  return (
    <PageLayout menuItems={menuItems}>
      <Styled.h1>Daily Devotion Readings for {formattedDate}</Styled.h1>
      <Flex
        sx={{
          flexDirection: ["column-reverse", "row", "row"],
          // TODO: What should this value actually be?
          justifyContent: "flex-start",
          gap: "30px",
        }}
      >
        <Sidebar>
          {/* {content && (
              <SidebarContentPDF content={content} title={title} header={""} />
            )} */}
        </Sidebar>

        <Box>
          {devotions &&
            devotions.map((devotion) => (
              <Styled.p>
                <Link href={devotion.slug}>{devotion.title}</Link>
              </Styled.p>
            ))}
          {!devotions && <div>No devotions found for today ({zonedDate}).</div>}
        </Box>
      </Flex>
    </PageLayout>
  );
};

Content.propTypes = {
  devotions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _type: is("devotionContent"),
      content: PropTypes.array.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default Content;

export const getServerSideProps: GetServerSideProps<{
  devotions: DevotionContent | any;
  menuItems: MenuItem[];
  zonedDate: string;
  formattedDate: string;
}> = async function (context) {
  const today = new Date();
  const timeZone = "Australia/Melbourne";
  //const zonedDate = formatInTimeZone(today, timeZone, "yyyy-MM-dd");
  const zonedDate = "2023-01-01";
  const date = new Date(zonedDate);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const suffix =
    day > 3 && day < 21 ? "th" : ["st", "nd", "rd"][(day % 10) - 1] || "th";
  const formattedDate = `${month} ${day}${suffix}`;

  if (typeof today === "undefined") {
    return {
      notFound: true,
    };
  }

  const menuItems = await resourceQuery.menuItems();
  const devotions = await getByDevotionsByDate(zonedDate);

  return {
    props: {
      menuItems,
      devotions,
      zonedDate,
      formattedDate,
    },
  };
};
