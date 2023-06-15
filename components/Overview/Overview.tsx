import Image from "next/image";

function Overview() {
  return (
    <div className="mb-10">
      <h2 className="hidden">Giới thiệu bản thân</h2>
      <div className="inline-flex items-center">
        <Image
          className="rounded-full"
          src="/namvh.jpeg"
          alt="Nam Vo"
          width={56}
          height={56}
        />
        <p className="ml-4">
          <strong>Nam Vo</strong>
          <br />
          Software Engineer
        </p>
      </div>
      <p>
        Đây là website cá nhân để lưu lại những kiến thức đã tích lũy trong thời
        gian qua. Và cũng như chia sẻ chúng với mọi người.
      </p>
    </div>
  );
}

export default Overview;
