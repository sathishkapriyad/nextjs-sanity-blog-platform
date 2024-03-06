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

async function getDataByTags(tags: string) {
  const decodedTag = decodeURIComponent(tags);
  const query = `
    *[_type == "blog" && tags match '${decodedTag}'] {
        "currentSlug": slug.current,
        title,
        content,
        titleImage,
        smallDescription,
        tags,
        author,
        authorImage,
        publishedAt,
        categories,
        featured,
    }`;

  const data: BlogPost[] = await client.fetch(query);

  return data;
}

export default async function BlogsByTag({
  params,
}: {
  params: { tags: string };
}) {
  // Assuming tags are passed as a string, you may need to adjust based on your routing
  const tag = params.tags;
  const data: BlogPost[] = await getDataByTags(tag);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
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
  );
}
