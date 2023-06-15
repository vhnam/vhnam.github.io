import { getPagesUnderRoute } from "nextra/context";

import PostItem, { PageProps } from "../PostItem";
import { useEffect } from "react";

interface TOCProps {
  route: string;
}

function TOC(props: TOCProps) {
  const { route } = props;

  return (
    <>
      {getPagesUnderRoute(route).map((page) => {
        return (
          <PostItem key={page.route} page={page as unknown as PageProps} />
        );
      })}
    </>
  );
}

export default TOC;
