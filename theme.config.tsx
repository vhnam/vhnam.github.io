import dayjs from "dayjs";

import Footer from "./components/Footer";

const ThemeConfig = {
  back: true,
  darkMode: true,
  dateFormatter: (date) => `Ngày đăng ${dayjs(date).format("DD/MM/YYYY")}`,
  footer: <Footer />,
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}

      {title && <title>{title}</title>}

      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </>
  ),
  logoLink: "/favicon.ico",
  navigation: {
    prev: true,
    next: true,
  },
  readMore: "Chi tiết →",
  staticImage: true,
  themeSwitch: {
    useOptions() {
      return {
        light: "Light",
        dark: "Dark",
        system: "System",
      };
    },
  },
  toc: {
    float: true,
    title: "Mục lục",
  },
};

export default ThemeConfig;
