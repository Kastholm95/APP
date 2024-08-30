/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { urlFor } from "../../../lib/sanityclient";
import { Article } from "../../../models/article";
import { Metadata } from "next";
import ArticleHero from "@/app/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import SubArticlesGrid from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import TrendingArticlesList from "@/app/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import theme from "@/app/lib/theme.json";
import { findTag, freshData, getData } from "@/app/api/data/GetData";
import Breadcrumb from "@/app/components/Navigation/Breadcrumb";
import { SubArticlesInfiniteScroll } from "@/app/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";
import { Reference } from "@/app/models/reference";

export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const { articles: allData, tags: tag } = await getData() as { articles: Article[], tags: Reference[] };
  const data = freshData(allData);

  const currentTag = findTag(tag, params.tag) as Reference;
  if (data.length > 0) {
    const article = data[0];

    return {
      title: `${currentTag.name} - Artikler og Indsigter | ${theme.site_name}`,
      description: currentTag.tagDescription,
      keywords: `Tag ${article.tag} - Artikler og Indsigter, ${theme.site_name}`,
      openGraph: {
        title: `${currentTag.name} - Artikler og Indsigter | ${theme.site_name}`,
        description: currentTag.tagDescription,
        url: `${theme.site_name}/artikler/tag/${article.tagSlug}`,
        type: "website",
        siteName: `${theme.site_name}`,
        locale: "da_DK",
        images: [
          {
            url: article.image
              ? urlFor(article.image)
                  .format("webp")
                  .width(400)
                  .height(300)
                  .fit("fill")
                  .quality(85)
                  .url()
              : `${theme.logo_public_url}`,
            width: 800,
            height: 600,
            alt: `Billede for tag ${currentTag.name}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: `${theme.metadata.twitter.site}`,
        title: `${currentTag.name} - Artikler og Indsigter | ${theme.site_name}`,
        description: currentTag.tagDescription,
        images: article.image
          ? urlFor(article.image)
              .format("webp")
              .width(400)
              .height(300)
              .fit("fill")
              .quality(85)
              .url()
          : `${theme.logo_public_url}`,
      },
      robots: "index, follow",
      publisher: `${theme.site_name}`,
    };
  } else {
    console.log("Article data is undefined.");
    return {
      title: "Default Title",
      robots: "noindex, nofollow",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function tag({ params }: { params: { tag: string } }) {
  const { articles: data } = await getData() as { articles: Article[] };

  return (
    <main>
      {data ? (
        <Breadcrumb navItem={'Tags'} link={"/sider/referencer/tags"} navItemTwo={params.tag}/>
      ) : null}

      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        <div className="containerr px-2 md:px-6 py-10 pt-0 m-auto ">
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
            <div className=" lg:w-[700px]">
              <ArticleHero data={data} tag={params.tag} startIndex={0} endIndex={1} />
            </div>
            <aside className="hidden w-[280px] lg:inline-block">
              <TrendingArticlesList
                dayInterval={60}
                startIndex={0}
                endIndex={100}
                data={data} tag={params.tag}
                articleAmount={5} 
              />
            </aside>
          </section>
          <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_1"></aside>
          <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_2"></aside>

          {/* Phone */}
          <section className="inline-block md:hidden">
            <TrendingArticlesList
              dayInterval={30}
              startIndex={0}
              endIndex={100}
              data={data} tag={params.tag}
            />
            <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_2"></aside>
            <SubArticlesGrid
              data={data} tag={'nyheder'}
              startIndex={1}
              endIndex={3}
            />
            <div className="mt-6 block">
              <ArticleHero data={data} startIndex={3} endIndex={4} />
            </div>
            <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_3"></aside>
            <SubArticlesGrid
              data={data} tag={params.tag}
              startIndex={4}
              endIndex={6}
            />
            <div className="mt-4 block">
              <ArticleHero data={data} tag={params.tag} startIndex={6} endIndex={7} />
            </div>
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            <SubArticlesGrid
              data={data} tag={'nyheder'}
              startIndex={0}
              endIndex={6}
            />
            <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_3"></aside>
          </section>
          <section className="grid grid-cols-[1fr_auto] md:gap-8 rounded-xl  bg-second_color_light dark:bg-second_color_dark ">
              <SubArticlesInfiniteScroll data={data} startIndex={7} endIndex={200} />
              <div className="!sticky top-20 mt-2 h-[80vh] hidden max-w-[320px] lg:inline-block">
              <aside className='desktop hidden md:block' data-ad-unit-id="/49662453/PengehjoernetDK/Square_2"></aside>
              <TrendingArticlesList data={data} dayInterval={14} startIndex={0} endIndex={100} articleAmount={6}  />
              </div>
            </section>
        </div>
      </section>
    </main>
  );
}
export const runtime = "edge";
