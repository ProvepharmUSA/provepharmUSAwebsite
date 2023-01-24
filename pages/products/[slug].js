import { getWordPressProps } from "@faustwp/core";
import { gql, useQuery } from "@apollo/client";
import Modal from "../../components/Modal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header, NavigationMenu } from "../../components";
import Banner from "../../components/Banner";

Product.query = gql`
  ${NavigationMenu.fragments.entry}
  query ProductQuery($id: ID!, $headerLocation: MenuLocationEnum) {
    product(id: $id, idType: SLUG) {
      title
      metaFields {
        amerisourcebergen2
        cardinal
        closuresize
        containersize
        discontinued
        form
        genericname
        glutenFree
        gtin
        importantsafetyinformation
        mckessen
        morrisDickson
        ndc
        packsize
        prescribinginformation {
          url
        }
        preservativeFree
        productimage {
          mediaItemUrl
        }
        productvariationtitle
        referencelisteddrug
        rubberFree
        safetysheet {
          mediaItemUrl
        }
        video
        strength
        therapeuticclass
        therapeuticequivalencerating
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Product.variables = () => {
  return {
    first: appConfig.postsPerPage,
    after: "",
    headerLocation: MENUS.PRIMARY_LOCATION,
  };
};

export default function Product() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading } = useQuery(Product.query, {
    variables: { id: slug },
  });

  if (loading) {
    return <></>;
  }

  const { metaFields } = data.product;
  const product = metaFields;

  return (
    <>
      <Header menuItems={data.headerMenuItems} />
      <Banner>Our Products</Banner>
      <div className="md:flex md:flex-col md:items-center mx-4 lg:mx-0 mt-14 pb-40">
        <div className="">
          <div className="mb-20 mt-2 lg:w-11/12">
            <h2 className="text-[1.7em] tracking-wide mb-8">
              <Link legacyBehavior href="/products">
                <a className=" text-blue-500">Products</a>
              </Link>
              {" > "}
              {product.genericname}
              {/* {product.genericname ? product.genericname : null}
              {product.productvariationtitle
                ? " ( " + product.productvariationtitle + " ) "
                : null} */}
            </h2>
            <div className="md:flex md:justify-between">
              <section>
                <div className="flex justify-between">
                  <section className="border border-solid p-8 px-32">
                    {product.productimage ? (
                      <Image
                        src={product.productimage.mediaItemUrl}
                        width="130"
                        height="250"
                      />
                    ) : (
                      <div className="h-[300px] w-[100px] bg-slate-700"></div>
                    )}
                  </section>
                </div>
                <section className="mt-12">
                  Prescribing Information:{" "}
                  {product.prescribinginformation ? (
                    <Modal
                      text="Click here"
                      externalLink={product.prescribinginformation.url}
                    />
                  ) : (
                    <p>Please add Link</p>
                  )}
                </section>

                {product.video ? (
                  <section>
                    <iframe
                      className="mt-16"
                      width="420"
                      height="315"
                      layout="responsive"
                      src={product.video}
                    ></iframe>
                  </section>
                ) : (
                  <div></div>
                )}
              </section>
              <ul className="md:w-2/5 lg:mx-8">
                <li className="flex justify-between">
                  {product.genericname ? (
                    <>
                      <p className="font-medium text-lg mb-4 mr-20">
                        Generic Name
                      </p>
                      <p className="mb-4 text-right">
                        {product.genericname +
                          " " +
                          product.strength +
                          " " +
                          product.form +
                          " x " +
                          product.packsize}
                      </p>
                    </>
                  ) : null}
                </li>
                <li className="flex justify-between">
                  {product.productvariationtitle ? (
                    <>
                      <p className="font-medium text-lg mb-4 mr-20">
                        Product Variation Title
                      </p>
                      <p className="mb-4">{product.productvariationtitle}</p>
                    </>
                  ) : null}
                </li>
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">
                    Reference Listed Drug
                  </p>
                  <p className="mb-4">
                    {product.referencelisteddrug ? "yes" : "no"}
                  </p>
                </li>

                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4 mr-20">NDC</p>
                  <p className="mb-4">{product.ndc}</p>
                </li>

                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">Safety Data Sheet </p>
                  <p className="underline underline-offset-2 text-blue-500">
                    {product.safetysheet ? (
                      <a href={product.safetysheet.mediaItemUrl}>
                        Click Here PDF
                      </a>
                    ) : (
                      <h3>Please add PDF here</h3>
                    )}
                  </p>
                </li>

                <br />
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4 mr-20">Strength</p>
                  <p className="mb-4">{product.strength}</p>
                </li>

                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4 mr-20">GTIN</p>
                  <p className="mb-4">{product.gtin}</p>
                </li>

                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4 mr-20">Form</p>
                  <p className="mb-4">{product.form}</p>
                </li>
                <br />
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4 mr-20">Pack Size</p>
                  <p className="mb-4">{product.packsize}</p>
                </li>

                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4 mr-20">
                    Therapeutic Class
                  </p>
                  <p className="mb-4">{product.therapeuticclass}</p>
                </li>

                {product.therapeuticequivalencerating ? (
                  <li className="flex justify-between">
                    <p className="font-medium text-lg mb-4 mr-20">
                      Therapeutic Equivalence Rating
                    </p>
                    <p> {product.therapeuticequivalencerating}</p>
                  </li>
                ) : null}
                <br />
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">
                    Not made with natural rubber latex
                  </p>
                  <p className="">{product.latex ? "yes" : "no"}</p>
                </li>
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">Preservative Free</p>
                  <p className="">{product.preservativeFree ? "yes" : "no"}</p>
                </li>

                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">Gluten Free </p>
                  <p className="">{product.glutenFree ? "yes" : "no"}</p>
                </li>
                <br />
                <li className="flex justify-between">
                  <p className="mb-4">ITEM CODES</p>
                </li>
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">Amerisource Bergen</p>
                  <p className="mb-4">{product.amerisourcebergen2}</p>
                </li>
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">Cardinal</p>
                  <p className="mb-4">{product.cardinal}</p>
                </li>
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">McKessen</p>
                  <p className="mb-4">{product.mckessen}</p>
                </li>
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">Morris & Dickson</p>
                  <p className="mb-4">{product.morrisDickson}</p>
                </li>
                <br />
                <li className="flex justify-between">
                  <p className="font-medium text-lg mb-4">Discontinued: </p>
                  <p className="">{product.discontinued ? "yes" : "no"}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-slate-400 fixed bottom-0 w-full">
        <h5 className="text-center text-2xl font-bold mt-2">
          Important Safety Information
        </h5>
        <div className="flex justify-center">
          {" "}
          <div
            className="isi mb-4 max-w-[1000px] h-44 overflow-auto"
            dangerouslySetInnerHTML={{
              __html: product.importantsafetyinformation,
            }}
          />
        </div>
      </section>
    </>
  );
}

export async function getServerProps(context) {
  return getWordPressProps(context, {
    Product,
    revalidate: 1,
  });
}