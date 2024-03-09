import { BlogPost } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { ArrowRightCircle } from "lucide-react";

export const revalidate = 30; // revalidate at most 30 seconds

async function getDataByCategory(categories: string) {
    const decodedCategory = decodeURIComponent(categories);
    console.log('URL_PARAMETER', decodedCategory);
    const query = `
    *[_type == "blog" && '${decodedCategory}' in categories[]->title] {
          "currentSlug": slug.current,
          title,
          content,
          titleImage,
          smallDescription,
          tags,
          author,
          authorImage,
          publishedAt,
          categories[]->{title},
          featured,
      } 
    `;


    const data: BlogPost[] = await client.fetch(query);

    return data;
}

export default async function BlogsByCategory({
    params,
}: {
    params: { categories: string };
}) {
    // Assuming tags are passed as a string, you may need to adjust based on your routing
    const category = params.categories;
    const decodedCategory = decodeURIComponent(category);
    const data: BlogPost[] = await getDataByCategory(decodedCategory);

   

    return (
        <>
            <div className="w-full mt-5 mb-5">
                <h3 className="text-base text-left text-primary text-gray-800 font-semibold tracking-wide uppercase">
                    Official Blog
                </h3>
                <h1 className="text-2xl mt-2 mb-2">{decodedCategory}</h1>
                <p className="mt-2 mb-2">The official source for news about {decodedCategory}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-5 mb-5 gap-5">
                {data.map((post, idx) => (
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

                            <h3 className="text-lg line-clamp-2 ">{post.title}</h3>
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
        </>

    );
}
