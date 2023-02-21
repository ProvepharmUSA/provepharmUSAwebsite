import Image from "next/image";
import Link from "next/link";

// function calculateAspectRatio(width, height) {
//     return width / height;
//   }

export default function AllPostsTemplate({ data, route }) {
  if (!data.nodes[0]) {
    return <p className="text-3xl p-10">Coming Soon!</p>;
  } else if (data.nodes[0].events) {
    return (
      <>
        <div className="h-12 bg-inherit" />
        {data.nodes.map(
          ({ id, title, excerpt, featuredImage, slug, events }) => (
            <div className="md:flex md:items-center mb-10" key={id}>
              {featuredImage ? (
                <div className="md:w-[386px] mr-12">
                  <Image
                    width={featuredImage.node.mediaDetails.width}
                    height={featuredImage.node.mediaDetails.height}
                    src={featuredImage.node.mediaItemUrl}
                  />
                </div>
              ) : null}
              <section>
                <p className="mb-2 text-sm">{events.eventDate}</p>
                <h2 className="text-xl mb-3 font-semibold">{title}</h2>
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                />
                <p className="mb-10 text-blue-500 underline cursor-pointer">
                  <Link href={`/${route}/${encodeURIComponent(slug)}`}>
                    Read more
                  </Link>
                </p>
                <div className="w-full h-[1px] bg-[#ebebeb]"></div>
              </section>
            </div>
          )
        )}
        <div className="h-12" />
      </>
    );
  }

  return (
    <>
      <div className="h-12" />
      {data.nodes.map(({ id, title, excerpt, date, featuredImage, slug }) => (
        <div className="md:flex md:items-center mb-10" key={id}>
          {featuredImage ? (
            <div className="md:w-[386px] mr-12">
              <Image
                width={featuredImage.node.mediaDetails.width}
                height={featuredImage.node.mediaDetails.height}
                src={featuredImage.node.mediaItemUrl}
              />
            </div>
          ) : null}
          <section>
            <p className="mb-2 text-sm">
              Published:{" "}
              {new Date(date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <h2 className="text-xl mb-3 font-semibold">{title}</h2>
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
            <p className="mb-10 text-blue-500 underline cursor-pointer">
              <Link href={`/${route}/${encodeURIComponent(slug)}`}>
                Read more
              </Link>
            </p>
            <div className="w-full h-[1px] bg-[#ebebeb]"></div>
          </section>
        </div>
      ))}
      <div className="h-12" />
    </>
  );
}
