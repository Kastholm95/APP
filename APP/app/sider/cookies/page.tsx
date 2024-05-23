import { client, urlFor } from '@/app/lib/sanityclient'
import { Page } from '@/app/models/subpage';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import React from 'react'
export const revalidate = 80000;

export const metadata: Metadata = {
    title: 'Cookiepolitik | Pengehjørnet',
    description: 'Læs om hvordan Pengehjørnet anvender cookies for at forbedre din oplevelse på vores website, og hvilke data vi indsamler.',
    keywords: 'cookiepolitik, cookies, persondata, privatlivspolitik, Pengehjørnet',
    openGraph: {
      title: 'Cookiepolitik | Pengehjørnet',
      description: 'Læs om hvordan Pengehjørnet anvender cookies for at forbedre din oplevelse på vores website, og hvilke data vi indsamler.',
      url: 'https://xn--pengehjrnet-mgb.dk/sider/cookies',
      type: 'article',
      siteName: 'Pengehjørnet',
      locale: 'da_DK',
      images: [
        {
          url: 'https://pengehjørnet.dk/_next/image?url=%2Flogo.png&w=384&q=75',
          width: 800,
          height: 600,
          alt: 'Cookiepolitik - Pengehjørnet',
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Pengehjørnet',
      title: 'Cookiepolitik | Pengehjørnet',
      description: 'Læs om hvordan Pengehjørnet anvender cookies for at forbedre din oplevelse på vores website, og hvilke data vi indsamler.',
      images: 'https://pengehjørnet.dk/_next/image?url=%2Flogo.png&w=384&q=75',
    },
    robots: 'index, follow',
    publisher: 'Pengehjørnet',
}




export default async function cookies() {

    async function getData() {
        const query = `*[_type == "cookiePolicy"] {
            title,
            overview,
        }`
        try {
          const data = await client.fetch<Page[]>(query);
          return data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
    }

   
    // Barebones lazy-loaded image component
    const SampleImageComponent = ({ value, isInline }: any) => {
      const imageAlt = value.alt || " ";
      return (
        <div>
          <img
          className='mb-6'
            src={urlFor(value)
              .image(value)
              .width(isInline ? 100 : 800)
              .fit("max")
              .auto("format")
              .format("webp")
        .width(500)
        .height(300)
        .fit("fill")
        .quality(85)
        .url()}
            alt={value.alt || " "}
            loading="lazy"
            style={{ display: isInline ? "inline-block" : "block" }}
          />
          <p className="absolute text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
            Foto: {imageAlt}
          </p>
        </div>
      );
    };
  
    const SampleYoutubeComponent = ({ value }: any) => {
      // Ekstraher videoID fra YouTube URL'en
      let videoId: any = "";
      const url = new URL(value.url);
      const pathname = url.pathname;
      const searchParams = url.searchParams;
  
      // Tjek om URL'en er en kort URL eller en standard YouTube-video URL
      if (pathname.includes("/shorts/")) {
        videoId = pathname.split("/shorts/")[1];
      } else if (searchParams.has("v")) {
        videoId = searchParams.get("v");
      } else {
        // Hvis URL'en er i et andet format, skal der måske tilføjes yderligere logik
        console.error("YouTube URL format ikke genkendt:", value.url);
      }
  
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
      return (
        <iframe
          width="560"
          height="315"
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    };
  
    const SampleTikTokComponent = ({ value }: any) => {
      // URL'en til TikTok-videoen
      const tikTokUrl = value.url;
  
      return (
        <blockquote
          className="tiktok-embed"
          cite={tikTokUrl}
          data-video-id={tikTokUrl.split("/").pop()}
          style={{ maxWidth: "605px", minWidth: "325px" }}
        >
          <section></section>
        </blockquote>
      );
    };
  
    const SampleFacebookComponent = ({ value }: any) => {
      // Erstat 'YOUR_URL' med din Facebook embed URL
      const embedUrl = value.url.replace("fb.watch", "www.facebook.com/watch");
  
      return (
        <iframe
          src={embedUrl}
          width="560"
          height="315"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
          allowFullScreen={true}
        ></iframe>
      );
    };
  
    const SampleInstagramComponent = ({ value }: any) => {
      return (
        <a href={value.url} target="_blank" rel="noopener noreferrer">
          Se dette indlæg på Instagram
        </a>
      );
    };
  
   
    const components = {
      types: {
        imageWithMetadata: SampleImageComponent,
        youTube: SampleYoutubeComponent,
        tikTok: SampleTikTokComponent,
        faceBook: SampleFacebookComponent,
        instagram: SampleInstagramComponent,
      },
    };


    const data: Page[] = await getData()

  return (
    <>
    {
        data ? (
<>
<nav className="flex px-3 md:px-8 max-w-[1280px] m-auto pt-6 rounded-lg mb-4 " aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      <li className="inline-flex items-center">
        <Link href="/" className="text-sm text-fade_color_light dark:text-fade_color_dark hover:text-gray-900 dark:hover:text-gray-400 inline-flex items-center ">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
          Forside
        </Link>
      </li>
      <li className=" cursor-default " aria-current="page">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
          <span className="text-accent_color_light dark:text-accent_color_dark ml-1 md:ml-2 text-sm font-medium capitalize "> {data[0].title} </span>
        </div>
      </li>
    </ol>
  </nav>
              <div className='max-w-[1280px] m-auto px-8 mb-8'>
                  
  
  
  
                  <div className='articleText text-lg prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary'>
                  
                    <PortableText value={data[0].overview} components={components}
                           /></div>
              </div>
</>
        ) : null
    }
    </>
  )
}


