import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import Image from "next/image";
import { client, urlFor } from "@/app/lib/sanityclient";
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import { ArticleLink } from "../../utils/ArticleLink";

async function getData() {
  const today: Date = new Date();
  const query = `
  *[
    _type == "article" && publishedAt <= "${today.toISOString()}"
  ] 
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    _createdAt,
    _type,
    title,
    teaser,
    publishedAt,
    "articleSlug": slug.current,
    "image": metaImage.asset,
    "category": category->name,
    "categorySlug": category->slug.current,
    "tag": tag[]->name,
    "tagSlug": tag[]->slug.current,
    "JournalistName": journalist->name,
    "JournalistPhoto": journalist->image,
    "JournalistSlug": journalist->slug.current
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function SubArticlesListSmallOrderRelease() {
  const data: ArticleModel[] = await getData();
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 bg-second_color_light dark:bg-second_color_dark pt-8 mt-6 pb-1 rounded-xl">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div>
          {data.slice(0, 10).map((post) => (
            <article
              key={post._id}
              className="relative isolate flex flex-col gap-8 lg:flex-row mb-10"
            >
              <ArticleLink
                aria-label="Læs mere om artiklen"
                href={`/artikel/${
                  post.republishArticle && post.newSlug
                    ? post.newSlug
                    : post.articleSlug
                }`}
              >
                <figure className="relative   lg:shrink-0">
                  <img
                    width={300}
                    height={400}
                    src={urlFor(post.image)
                      .format("webp")
                      .width(300)
                      .height(400)
                      .fit("fill")
                      .quality(85)
                      .url()}
                    alt={post.title}
                    loading="lazy"
                    className="block rounded-2xl inset-0 bg-gray-300 max-h-44 rounded-t-lg min-w-44 w-full object-cover"
                  />
                </figure>
              </ArticleLink>
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.publishedAt} className="text-gray-500">
                    {timeSinceText({ date: post.publishedAt })}
                  </time>
                  <ArticleLink
                    href={`/kategori/${post.categorySlug}`}
                    className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category}
                  </ArticleLink>
                </div>
                <header className="group relative max-w-xl">
                  <h1 className="mt-3 text-text_main_color_dark dark:text-text_main_color_light text-lg font-semibold leading-6 dark:group-hover:text-gray-200 group-hover:text-gray-600">
                    <ArticleLink
                      href={`/artikel/${
                        post.republishArticle && post.newSlug
                          ? post.newSlug
                          : post.articleSlug
                      }`}
                    >
                      <span className="" />
                      {post.title}
                    </ArticleLink>
                  </h1>
                  <h2 className="mt-5 text-sm h-[5em] overflow-clip leading-6 text-text_second_color_dark dark:text-text_second_color_light">
                    {post.teaser}
                  </h2>
                </header>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
