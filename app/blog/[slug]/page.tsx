import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge"

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
    const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
          tags,
          author,
          authorImage,
      }[0]`;

    const data = await client.fetch(query);
    return data;
}

export default async function BlogArticle({
    params,
}: {
    params: { slug: string };
}) {
    const data: fullBlog = await getData(params.slug);

    return (
        <div className="mt-8 w-full max-w-4xl mx-auto px-4 py-5 pb-8">
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                    BYTE BRIDGES - Blog
                </span>
                <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
                    {data.title}
                </span>
            </h1>

            <Image
                src={urlFor(data.titleImage).url()}
                width={800}
                height={800}
                alt="Title Image"
                priority
                className="rounded-lg mt-8 border"
            />

            <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
                <PortableText value={data.content} />
            </div>

            <div className="flex">
                <div className="flex-1 text-left px-4 py-2 mt-4 mb-4">
                    <Link className={badgeVariants({ variant: "outline" })} href={""}>{data.tags}</Link>
                </div>
                <div className="flex text-left space-x-4 px-4 py-2 mt-4 mb-4">
                    <Avatar>
                        <AvatarImage src={data.authorImage ? urlFor(data.authorImage).url() : "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Link className={badgeVariants({ variant: "outline" })} href={""}>{data.author}</Link>
                </div>
            </div>


        </div>
    );
}