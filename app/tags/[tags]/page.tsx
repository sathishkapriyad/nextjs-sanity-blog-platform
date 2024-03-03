import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/router';

export const revalidate = 30; // revalidate at most 30 seconds

async function getDataByTags(tags: string) {
    const decodedTag = decodeURIComponent(tags);
    const query = `
      *[_type == "blog" && tags == '${decodedTag}'] {
          "currentSlug": slug.current,
          title,
          content,
          titleImage,
          smallDescription,
          tags,
          author,
          authorImage,
      }`;

    const data = await client.fetch(query);
    return data;
}

export default async function BlogsByTag({
    params,
}: {
    params: { tags: string };
}) {
    // Assuming tags are passed as a string, you may need to decode or process them if they're in a different format
    const tag = params.tags;
    const data: fullBlog[] = await getDataByTags(tag);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1  md:grid-cols-2 mt-5 gap-5">
            {data.map((blog, idx) => (
                <Card key={idx}>
                    <Image
                        src={urlFor(blog.titleImage).url()}
                        alt="image"
                        width={500}
                        height={500}
                        className="rounded-t-lg h-[200px] object-cover"
                    />

                    <CardContent className="mt-5">
                        <h3 className="text-lg line-clamp-2 font-bold">{blog.title}</h3>
                        <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                            {blog.smallDescription}
                        </p>
                        <Button asChild className="w-full mt-7 py-5">
                            <Link href={`/blog/${blog.currentSlug}`}>Read More</Link>
                        </Button>
                        <Link className={`${badgeVariants({ variant: "outline" })} mt-4 mb-4`} href={`/tags/${blog.tags}`}>{blog.tags}</Link>

                    </CardContent>
                </Card>
            ))}
        </div>



    );

}