import dayjs from "dayjs";
import Link from "next/link";
import type { Page } from "nextra";

export type PageProps = Page & {
  frontMatter: {
    date?: string;
    description: string;
  };
};

interface PostItemProps {
  page: PageProps;
}

function PostItem(props: PostItemProps) {
  const { page } = props;
  const frontMatter = page.frontMatter;

  return (
    <div className="mb-10">
      <Link
        href={page.route}
        className="post-item__title block mt-8 text-xl lg:text-2xl no-underline hover:underline"
      >
        {page.meta.title || page.name}
      </Link>
      <p className="my-1 text-sm text-gray-500 dark:text-gray-400">
        Ngày đăng {dayjs(frontMatter.date).format("DD/MM/YYYY")}
      </p>
      <p className="opacity-80 mt-0 leading-7">
        {frontMatter.description}{" "}
        <span className="block">
          <Link
            href={page.route}
            className="post-item__read-more no-underline hover:underline underline-offset-2 decoration-from-font"
          >
            Chi tiết →
          </Link>
        </span>
      </p>
    </div>
  );
}

export default PostItem;
