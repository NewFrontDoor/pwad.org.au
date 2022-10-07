import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { Styled, Box, Label, Input, Button } from "theme-ui";
import BlockContent from "../../../components/block-content";

import is from "../../../is";
import * as restrictedContentQuery from "../../../../queries/restricted-content";
import * as resourceQuery from "../../../../queries/resource";
import { RestrictedContent, MenuItem } from "../../../../queries/_types";

import Toc from "../../../components/toc";

import PageLayout from "../../../components/page-layout";
import ContentWrap from "../../../components/content-wrap";

type ContentProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Content: NextPage<ContentProps> = ({ menuItems, restrictedContent }) => {
  const hasToc = restrictedContent.hasToc;
  const subtitle = restrictedContent.subtitle;
  const [enteredPassword, setEnteredPassword] = useState(false);
  const [password, setPassword] = useState(null);

  const hasGrid = (element) => element._type === "gridblock";

  const handleChange = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnteredPassword(true);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setPassword(null);
    setEnteredPassword(false);
  };

  return (
    <PageLayout menuItems={menuItems}>
      <ContentWrap>
        <Styled.h1>{restrictedContent.title}</Styled.h1>
        {enteredPassword &&
          password === process.env.RESTRICTED_PAGES_PASSWORD &&
          subtitle && <Styled.h2>{subtitle}</Styled.h2>}
        {enteredPassword &&
          password === process.env.RESTRICTED_PAGES_PASSWORD &&
          hasToc && <Toc blocks={restrictedContent.content} />}
        {enteredPassword &&
          password === process.env.RESTRICTED_PAGES_PASSWORD && (
            <BlockContent blocks={restrictedContent.content} />
          )}
        {enteredPassword &&
          password !== null &&
          password !== process.env.RESTRICTED_PAGES_PASSWORD && (
            <div>
              <p>Incorrect password entered</p>
              <Button onClick={resetForm}>Try Again?</Button>
            </div>
          )}
        {!enteredPassword && (
          <Box as="form" onSubmit={handleSubmit}>
            <Label htmlFor="password">
              You must enter a password to view this page
            </Label>
            <br />
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              mb={3}
            />
            <Button>Submit</Button>
          </Box>
        )}
      </ContentWrap>
    </PageLayout>
  );
};

Content.propTypes = {
  restrictedContent: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    _type: is("restrictedContent"),
    content: PropTypes.array.isRequired,
    hasToc: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default Content;

export const getServerSideProps: GetServerSideProps<{
  restrictedContent: RestrictedContent;
  menuItems: MenuItem[];
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
  const restrictedContent = await restrictedContentQuery.getByRestrictedSlug(
    slug
  );

  return {
    props: {
      menuItems,
      restrictedContent,
    },
  };
};
