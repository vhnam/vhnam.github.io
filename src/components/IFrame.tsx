interface IFrameComponentProps {
  src: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  allowFullScreen?: boolean;
  loading?: "lazy" | "eager";
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
}

export const IFrameComponent = ({
  src,
  width = "100%",
  height = "100%",
  title,
  allowFullScreen = false,
  loading = "lazy",
  referrerPolicy = "strict-origin-when-cross-origin",
}: IFrameComponentProps) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      title={title}
      allowFullScreen={allowFullScreen}
      loading={loading}
      referrerPolicy={referrerPolicy}
    />
  );
};
