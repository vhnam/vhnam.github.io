interface IFrameComponentProps {
  src: string;
  width?: string;
  height?: string;
}

export function IFrameComponent(props: IFrameComponentProps) {
  const { src, width = "100%", height = "100%" } = props;

  return (
    <>
      <iframe src={src} width={width} height={height} />
    </>
  );
}
