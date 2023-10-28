import PropTypes from "prop-types";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { Styled, Box, Flex } from "theme-ui";

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
          {devotions && (
            <>
              <br />
              <div sx={{ mt: "50px" }}>
                <a
                  href="https://bibleguideposts.org/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Author
                </a>
              </div>
            </>
          )}
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
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/g;
  const zonedDate = slug.toString();
  const slugMonth = slug.split("-")[1]; //get slug month to check if invalid day has been used for specific month
  const date = new Date(slug);
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

  if (
    typeof slug === "undefined" ||
    !dateRegex.test(slug) ||
    !Date.parse(slug) ||
    slugMonth !== paddedMonth
  ) {
    return {
      notFound: true,
    };
  }

  const queryYear =
    paddedDay === "29" && paddedMonth === "02" ? "2024" : "2023"; //ensure valid leap year date in query
  const menuItems = await resourceQuery.menuItems();
  const devotions = await getByDevotionsByDate(
    `${queryYear}-${paddedMonth}-${paddedDay}`
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
