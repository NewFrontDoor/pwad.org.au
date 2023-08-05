import PropTypes from "prop-types";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { Styled, Box, Flex } from "theme-ui";
import BlockContent from "../../components/block-content";
import { formatInTimeZone } from "date-fns-tz";

import is from "../../is";
import * as resourceQuery from "../../../queries/resource";
import { DevotionContent, MenuItem } from "../../../queries/_types";

import PageLayout from "../../components/page-layout";
import Sidebar, { SidebarContentPDF } from "../../components/sidebar";
import Link from "next/link";
import { getByDevotionsByDate } from "../../../queries/devotions-by-date";

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
            devotions.map((devotion, idx) => (
              <Styled.p key={`devotion-${idx}`}>
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
  slug: string;
  formattedDate: string;
  zonedDate: string;
}> = async function (context) {
  const slug = context?.params?.slug?.toString() || "";

  if (typeof slug === "undefined" || slug.length == 0 || !Date.parse(slug)) {
    return {
      notFound: true,
    };
  }
  const zonedDate = slug.toString();
  const date = new Date();
  const paddedMonth = ("0" + (date.getMonth() + 1)).slice(-2); //prefix 0 and get last to chars to pad with 0
  const paddedDay = ("0" + date.getDate()).slice(-2); //prefix 0 and get last to chars to pad with 0
  const month = date ? date.toLocaleString("default", { month: "long" }) : null;
  const day = date ? date.getDate() : null;
  const suffix = day
    ? day > 3 && day < 21
      ? "th"
      : ["st", "nd", "rd"][(day % 10) - 1] || "th"
    : null;

  const formattedDate = date ? `${month} ${day}${suffix}` : "";

  const menuItems = await resourceQuery.menuItems();
  const devotions = await getByDevotionsByDate(
    `2023-${paddedMonth}-${paddedDay}`
  );
  return {
    props: {
      menuItems,
      devotions,
      slug,
      formattedDate,
      zonedDate,
    },
  };
};
