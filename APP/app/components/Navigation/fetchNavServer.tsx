// fetchNav.ts

import { client } from "@/app/lib/sanityclient";


export async function fetchNavData() {
  const query = `*[_type == "navigation"] {
    _id,
    frontpageBoolean,
    "logo": logo.asset,
    navItems[] {
      _key,
      "name": @->name,
      "slug": @->slug.current
    }
  }`;

  try {
    const data = await client.fetch(query);
    return data[0];  // Assuming the fetch returns an array with at least one item
  } catch (error) {
    console.error('Error fetching navigation data:', error);
    return null;
  }
}
