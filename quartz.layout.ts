import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        repo: "oandy-rgb/MyPublicBlog",
        repoId: "R_kgDOQ9sT0Q",
        category: "Announcements",
        categoryId: "DIC_kwDOQ9sT0c4C1UhA",
        lightTheme: "light_high_contrast", 
        darkTheme: "transparent_dark",
        mapping: "pathname",
        strict: true,
        reactionsEnabled: true,
        inputPosition: "bottom",
        lang: "zh-TW",
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/oandy-rgb/MyPublicBlog",
      Discord: "https://discord.gg/bp67EWpMch",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    // === 加入這段條件渲染的最近更新 ===
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "最近更新",
        limit: 5,
        filter: (f) => f.slug !== "index", // 不要顯示首頁自己
        // 依照最後修改時間排序
        sort: (f1, f2) =>
          (f2.dates?.modified?.getTime() ?? 0) - (f1.dates?.modified?.getTime() ?? 0),
      }),
      // 判斷條件：只有當頁面是首頁 (index) 時才顯示
      condition: (page) => page.fileData.slug === "index" || page.fileData.slug === "",
    }),
    // ===================================
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}

