import { client } from "@/app/lib/sanityclient";
import { SearchBar } from "./SearchBar";
import { ArticleLink } from "../utils/ArticleLink";

export async function getData(queryParam) {
    const query = `
      *[_type == "article" && title match $queryParam] | order(coalesce(publishedAt, _createdAt) desc) [0...5] {
        _id,
        title,
        body
      }`
    const data = await client.fetch(query, { queryParam: `${queryParam}*` });
      
     
    return data;
  }

export default async function SearchFetch({ searchParams }: { searchParams: { q?: string } }) {
    const items = await getData(searchParams.q || "");

  return (
    <div>
      <SearchBar />
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <ArticleLink href={`/articles/${item.title}`}>{item.title}</ArticleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}