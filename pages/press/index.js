import { getNextStaticProps } from "@faustwp/core";
import { gql, useQuery } from "@apollo/client";
import Container from "../../components/Container";
import Banner from "../../components/Banner";
import AllPostsTemplate from "../../components/AllPostsTemplate";
import { Header, Footer, NavigationMenu } from "../../components";
import * as MENUS from "../../constants/menus";
import Image from "next/image";
import Link from "next/link";

export default function PressReleases() {
  const { loading, error, data } = useQuery(PressReleases.query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Header menuItems={data.headerMenuItems} />
      <Banner>Press Releases</Banner>
      <Container size="sm">
        <AllPostsTemplate data={data.pressReleases} route="press" />
      </Container>
      <Footer />
    </>
  );
}

PressReleases.query = gql`
  ${NavigationMenu.fragments.entry}
  query AllPressReleases($headerLocation: MenuLocationEnum) {
    pressReleases(first: 200) {
      nodes {
        slug
        id
        title
        excerpt
        date
        dateGmt
        featuredImage {
          node {
            mediaItemUrl
            mediaDetails {
            width
            height
          }
          }
        }
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

PressReleases.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
  };
};

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: PressReleases,
    revalidate: 1,
  });
}
