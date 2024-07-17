import RSS from 'rss';
import theme from '../lib/theme.json';
import { client, urlFor } from '../lib/sanityclient';
import { PortableText } from "next-sanity";
import { toHTML } from '@portabletext/to-html';

const portableTextToHtml = (portableText) => {
    const serializers = {
        types: {
            block: (props) => {
                switch (props.node.style) {
                    case 'h3':
                        return `<h3>${props.children.join('')}</h3>`;
                    case 'normal':
                    default:
                        return `<p>${props.children.join('')}</p>`;
                }
            },
            imageWithMetadata: () => ``,
            youTube: () => ``,
            tikTok: () => ``,
            faceBook: () => ``,
            instagram: () => ``,
            readMore: () => ``,
            readMoreAutomatic: () => {
                return '';  // Ensure this returns empty string
            },
        },
        // Optionally handle marks like bold, italics, etc.
        marks: {
            strong: (props) => `<strong>${props.children.join('')}</strong>`,
            em: (props) => `<em>${props.children.join('')}</em>`,
            // Handle other types of marks as needed
        }
    };
    return toHTML(portableText, { serializers });
};

/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
async function getData() {
    const query = `
    *[
      _type == "article"
    ] 
    | order(coalesce(publishedAt, _createdAt) desc) [0...10] {
      _id,
      _createdAt,
      _updatedAt,
      publishedAt,
      _type,
      title,
      teaser,
      "articleSlug": slug.current,
      overview,
      views,
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

/* -------------------------------------------------------------------------- */
/*                                FORMAT DATE                                 */
/* -------------------------------------------------------------------------- */
function getDanishPubDate() {
    const date = new Date(); // Current UTC time
    const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const copenhagenTime = new Date(date.getTime() - offset + (3600000 * 2)); // Add 2 hours to UTC
    return copenhagenTime.toUTCString().replace('GMT', '+0200'); // Replace GMT with +0200
}

/* -------------------------------------------------------------------------- */
/*                            ESCAPE XML CHARACTERS                           */
/* -------------------------------------------------------------------------- */
function escapeXML(str) {
    return str.replace(/&/g, '&amp;')  // Escape ampersand
              .replace(/</g, '&lt;')   // Escape less than
              .replace(/>/g, '&gt;')   // Escape greater than
              .replace(/"/g, '&quot;')// Escape double quotes
              .replace(/'/g, '&apos;');// Escape single quotes
}

/* -------------------------------------------------------------------------- */
/*                           GENERATE RSS FEED                                */
/* -------------------------------------------------------------------------- */
export async function GET() {
    const pubDate = getDanishPubDate();

    const feed = new RSS({
        title: theme.site_name,
        description: theme.metadata.description,
        generator: `RSS til ${theme.site_name}`,
        feed_url: `${theme.site_url}/feed.xml`,
        site_url: theme.site_url,
        managingEditor: 'mac@mgdk.dk (Marc Christiansen)',
        webMaster: 'mac@mgdk.dk (Marc Christiansen)',
        copyright: `Copyright ${new Date().getFullYear().toString()}, Marc Christiansen`,
        language: 'da',
        pubDate: pubDate,
        ttl: 60,
    });

    const articles = await getData();

    articles.forEach((article) => {
        const filteredOverview = article.overview.filter(block => 
            block._type !== 'readMoreAutomatic' &&
            block._type !== 'readMore' &&
            block._type !== 'imageWithMetadata' &&
            block._type !== 'youTube' &&
            block._type !== 'tikTok' &&
            block._type !== 'faceBook' &&
            block._type !== 'instagram'
        );
    
        const imageUrl = urlFor(article.image)
            .format("webp")
            .width(800)
            .height(600)
            .fit("fill")
            .quality(85)
            .url();
    
        const articleDescription = portableTextToHtml(filteredOverview);
    
        feed.item({
            title: escapeXML(article.title),
            subTitle: escapeXML(article.teaser),
            author: escapeXML(article.JournalistName),
            description: articleDescription,
            enclosure: {
                url: imageUrl, // URL til billedet
                type: "image/webp", // Medietype, afhængigt af format
                length: 0 // Størrelsen kan sættes til 0 hvis ukendt
            },
            url: `${theme.site_url}/artikel/${article.articleSlug}`,
            guid: article._id,
            date: article.publishedAt,
            updated: article._updatedAt,
        });
        console.log(imageUrl);
    });
    
    

    const xml = feed.xml({ indent: true });

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
