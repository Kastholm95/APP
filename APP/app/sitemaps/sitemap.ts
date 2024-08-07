import { MetadataRoute } from 'next'
import { client } from '../lib/sanityclient';
import theme from '../lib/theme.json';
import { Article } from '../models/article';

export async function getArticleData(): Promise<Article[]> {
  const query = `
              *[
                _type == "article" 
              ] 
              | order(coalesce(publishedAt, _createdAt) desc) {
                _id,
                title,
                _createdAt,
                _updatedAt,
                publishedAt,
                "articleSlug": slug.current,
                "category": category->name,
                "categorySlug": category->slug.current,
                "tagSlug": tag[]->slug.current,
              }`;
  const data = await client.fetch(query);

  return data;
}


 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const articleData: Article[] = await getArticleData();


    const articles = articleData.map((article) => {
      return {
        url: `${theme.site_url}/artikel/${article.articleSlug}`,
        lastModified: new Date(article._updatedAt),
        priority: 1,
      }
    });

  return [
      ...articles,
  ]
}