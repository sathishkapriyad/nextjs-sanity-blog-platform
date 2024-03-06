'use client';

import Image from "next/image";
import { client, urlFor } from "./lib/sanity";
import { simpleBlogCard, advertType } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge"
import { ArrowBigRight, ArrowRight, ArrowRightCircle, PlusCircle, Space } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { format } from 'date-fns'; 

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(start = 0, limit = 6) {
    try {
        const query = `
      *[_type == 'blog'] | order(_createdAt desc)[$start...$end] {
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
        const params = {
            start: start,
            end: start + limit,
        };
        const data = await client.fetch(query, params);
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



export default  function Home() {
    // const data: simpleBlogCard[] = await getData();
    // const advertdata: advertType[] = await getAdvert();

    // const headerAdverts = advertdata.filter(ad => ad.adposition === 'header');
    // const sidebarAdverts = advertdata.filter(ad => ad.adposition === 'sidebar');
    // const footerAdverts = advertdata.filter(ad => ad.adposition === 'footer');

    const [posts, setPosts] = useState<simpleBlogCard[]>([]);
    const [start, setStart] = useState(0); // Starting index for posts
    const [loading, setLoading] = useState(false); // Loading state to control button behavior
    const [hasMore, setHasMore] = useState(true); // Flag to check if more posts are available to load


    // Initial posts loading
    useEffect(() => {
        const loadInitialPosts = async () => {
            setLoading(true);
            try {
                const initialPosts = await getData(0, 6); // Fetch first 5 posts
                setPosts(initialPosts); // Update the posts state
                setHasMore(initialPosts.length === 6);
            } catch (error) {
                console.error("Failed to load initial posts:", error);
                // Handle error appropriately
            }
            setLoading(false);
        };

        loadInitialPosts();
    }, []);

    const loadMore = async () => {
        if (!loading && hasMore) {
            setLoading(true);
            try {
                const newStart = start + 6; // Increment start index
                const additionalPosts = await getData(newStart, 6); // Fetch next set of posts
                setPosts(prevPosts => [...prevPosts, ...additionalPosts]); // Append new posts
                setStart(newStart);
                setHasMore(additionalPosts.length === 5);
            } catch (error) {
                console.error("Failed to load more posts:", error);
                // Handle error appropriately
            }
            setLoading(false);
        }
    };

    const featuredPosts = posts.filter(post => post.featured);

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

            <div className="my-12 grid grid-cols-1 md:grid-cols-4 gap-4">
                {featuredPosts.map((post, idx) => (
                    // Check if it's the first post, which is the featured post
                    
                    <Card key={idx} className={idx === 0 ? "md:col-span-2 transition duration-500 hover:scale-105" : "transition duration-500 hover:scale-105"}>
                        <Image
                            src={urlFor(post.titleImage).url()}
                            alt="image"
                            width={700}
                            height={400}
                            className="rounded-t-lg w-full object-contain h-[200px] md:h-[400px]"
                        />
                        <CardContent className="flex flex-col space-y-4 p-4">
                            <h3 className="text-xl md:text-lg  uppercase">
                            {format(new Date(post.publishedAt), 'MMM dd')}
                            </h3>
                            <div className="card-tags">
                            {post.tags.map((tag, tagIdx) => (
                                <Link key={tagIdx} href={`/tags/${tag}`} passHref className="mr-2">
                                <span className={`${badgeVariants({ variant: "outline" })} mx-2 my-1 cursor-pointer inline-block uppercase`}>{tag}</span>
                                </Link>
                            ))}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold">{post.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-3">{post.smallDescription}</p>
                            <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-4"> 
                                <img
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src={post.authorImage ? urlFor(post.authorImage).url() : "https://github.com/shadcn.png"}
                                alt=""
                                />
                                <Link className="text-sm" href={""}>
                                {post.author}
                                </Link>
                            </div>
                            <div> 
                                <Link href={`/blog/${post.currentSlug}`} className="flex items-center text-sm text-blue-500 rounded-full px-4">
                                Read More <ArrowRightCircle className="ml-2 h-5 w-5 text-blue-500" />
                                </Link>
                            </div>
                            </div>
                        </CardContent>
                        </Card>

                ))}
            </div>

            <div className=" pb-10 pl-10 pr-10">
                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-5 dark:text-gray-300">More topics</h3>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-1">
                        {posts.map((post, idx) => (
                            <CarouselItem key={idx} className="pl-1 p-0 md:basis-1/2 lg:basis-1/6">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex  items-center justify-center p-2">
                                        <PlusCircle className="mr-5" color="#2F73E8"/> {post.categories && post.categories.length > 0 ? (
                                                <span className="text-md font-semibold">
                                                    {post.categories[0].title}
                                                </span>
                                            ) : (
                                                <span className="text-md font-semibold">No Category</span>
                                            )}

                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">

                {posts.map((post, idx) => (
                    <Card key={idx} className="flex flex-col md:flex-row transition duration-500 hover:scale-105">
                        <Image
                            src={urlFor(post.titleImage).url()}
                            alt="image"
                            width={500}
                            height={500}
                            className="rounded-t-lg h-[200px] object-contain md:w-1/2"
                        />

                        <CardContent className="mt-5 flex-1 md:w-1/2 px-4 py-2">

                        <div className="card-tags flex items-center"> {/* Container for tags */}
                        {Array.isArray(post.tags) ? (
                          post.tags.map((tag, tagIdx) => (
                            <Link key={tagIdx} href={`/tags/${tag}`} className="mr-2">
                              <span className={`${badgeVariants({ variant: "outline" })} mx-2 my-1  cursor-pointer inline-block uppercase`}>{tag}</span>
                            </Link>
                          ))
                        ) : post.tags ? (
                          <Link href={`/tags/${post.tags}`} className="mr-2">
                           <span className={`${badgeVariants({ variant: "outline" })} mx-2 my-1  cursor-pointer inline-block uppercase`}> {post.tags}</span>
                          </Link>
                        ) : null}
                      </div>

                            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
                            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                                {post.smallDescription}
                            </p>
                            <Link href={`/blog/${post.currentSlug}`} className="flex items-center text-sm text-blue-500 mt-4 mb-4 text-sm font-semibold">
                                Read More <ArrowRightCircle className="h-5 w-6 text-blue-500 ml-2" />
                            </Link>
                        
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="w-full flex justify-center mt-10 mb-10">
            {hasMore && (
                <div>
                    <Button variant="outline" onClick={loadMore} disabled={loading}>
                    {loading ? 'Loading...' : 'Load more stories'}
                    </Button>

                </div>
            )}
            </div>

        </>

    );
}
