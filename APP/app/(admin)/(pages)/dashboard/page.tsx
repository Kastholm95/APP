import React from 'react'
import AdminSideBar from '../../components/sideBar'
import { BarChartPublished } from './components/BarChartPublished';
import { getChartArticleData } from '@/app/api/data/GetData';
import { Article } from '@/app/(home)/models/article';
export const revalidate = 600;
export default async function page() {

  const data: Article[] = await getChartArticleData();

  return (
    <section className=' pt-6'>

<BarChartPublished data={data} />

    </section>
  )
}
