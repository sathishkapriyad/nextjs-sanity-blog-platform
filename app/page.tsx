import Image from "next/image";
import { client, urlFor } from "./lib/sanity";
import { simpleBlogCard, advertType } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge"
import { ArrowBigRight, ArrowRight, Space } from "lucide-react";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
    try {
        const query = `
      *[_type == 'blog'] | order(_createdAt desc) {
        title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage,
        tags,
        author,
        "authorImage": authorImage.asset->url,
        publishedAt,
        categories[]->{title},
        featured,
      }`;
        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return [];
    }
}

async function getAdvert() {
    try {
        const query = `
      *[_type == 'advert'] | order(_createdAt desc) {
        adtitle,
        adposition,
        adImage,
      }`;
        const advertdata = await client.fetch(query);
        return advertdata;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return [];
    }
}



export default async function Home() {
    const data: simpleBlogCard[] = await getData();
    const advertdata: advertType[] = await getAdvert();

    const headerAdverts = advertdata.filter(ad => ad.adposition === 'header');
    // const sidebarAdverts = advertdata.filter(ad => ad.adposition === 'sidebar');
    // const footerAdverts = advertdata.filter(ad => ad.adposition === 'footer');

    const featuredPosts = data.filter(post => post.featured);



    return (
        <>
            {/* <div className="grid grid-cols-1">

                {headerAdverts.map((ad, idx) => (
                    <div key={idx} className="header-ad">
                        <Image
                            src={urlFor(ad.adImage).url()}
                            alt={ad.adtitle}
                            layout="responsive"
                            width={900}
                            height={250}
                            className="rounded-t-lg object-cover"
                        />
                    </div>
                ))}

            </div> */}


            <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredPosts.map((post, idx) => (
                    // Check if it's the first post, which is the featured post
                    <Card key={idx} className={idx === 0 ? "md:col-span-2" : ""}>
                        <Image
                            src={urlFor(post.titleImage).url()}
                            alt="image"
                            width={700} // Adjust width and height as necessary
                            height={400} // Adjust width and height as necessary
                            className="rounded-t-lg w-full object-cover h-[200px] md:h-[400px]"
                        />
                        <CardContent className="mt-5">
                            <h3 className="text-xl md:text-2xl font-bold">{post.title}</h3>
                            <p className="line-clamp-3 text-sm mt-2 text-gray-600">{post.smallDescription}</p>
                            <Link href={`/blog/${post.currentSlug}`} className="flex items-center mt-4 text-sm font-semibold">
                                Read More <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <div className="mt-4">
                                {post.tags.map((tag, tagIdx) => (
                                    <Link key={tagIdx} href={`/tags/${tag}`} passHref>
                                        <span className={`${badgeVariants({ variant: "outline" })} mx-2 my-1 cursor-pointer inline-block`}>{tag}</span>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>



            <div className="grid grid-cols-1  md:grid-cols-3 mt-5 gap-5">

                {data.map((post, idx) => (
                    <Card key={idx}>
                        <Image
                            src={urlFor(post.titleImage).url()}
                            alt="image"
                            width={500}
                            height={500}
                            className="rounded-t-lg h-[200px] object-contain"
                        />

                        <CardContent className="mt-5">
                            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
                            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                                {post.smallDescription}
                            </p>
                            <Link href={`/blog/${post.currentSlug}`} className="flex items-center mt-4 text-sm font-semibold">
                                Read More <ArrowRight className="h-5 w-6" />
                            </Link>


                            {Array.isArray(post.tags) ? (
                                post.tags.map((tag, tagIdx) => (
                                    <Link key={tagIdx} href={`/tags/${tag}`} className={`${badgeVariants({ variant: "outline" })} mx-2 my-1 cursor-pointer`}>
                                        {tag}
                                    </Link>
                                ))
                            ) : post.tags ? (
                                <Link href={`/tags/${post.tags}`} className={`${badgeVariants({ variant: "outline" })} mx-2 my-1 cursor-pointer`}>
                                    {post.tags}
                                </Link>
                            ) : null}


                        </CardContent>
                    </Card>
                ))}
            </div>
        </>

    );
}