import React from 'react'
import { BarChartPublished } from './components/BarChartPublished';
import { getChartArticleData } from './api/getChartData';
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
export const revalidate = 600;
export default async function page() {

  const data: ArticleModel[] = await getChartArticleData();

  return (
    <section className=' pt-6'>

<BarChartPublished data={data} />

    </section>
  )
}
