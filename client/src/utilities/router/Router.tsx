import { createBrowserRouter } from "react-router-dom";
import { BlogArticleRoute, BlogRoute, HomeRoute, ResumeRoute } from "../../models/constants/InternalUrlConstants.ts";
import Layout from "../../pages/Layout/Layout.tsx";
import { lazy, Suspense } from "react";

const HomeLazy = lazy(() => import("../../pages/Home/Home.tsx"))
const ResumeLazy = lazy(() => import("../../pages/Resume/Resume.tsx"));
const BlogLazy = lazy(() => import("../../pages/Blog/Blog.tsx"));
const BlogArticleLazy = lazy(() => import("../../pages/BlogArticle/BlogArticle.tsx"));

export const Router = createBrowserRouter([
    {
        path: HomeRoute,
        Component: Layout,
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <HomeLazy/>
                    </Suspense>
                )
            },
            {
                path: ResumeRoute,
                element: (
                    <Suspense>
                        <ResumeLazy/>
                    </Suspense>
                )
            },
            {
                path: BlogRoute,
                element: (
                    <Suspense>
                        <BlogLazy/>
                    </Suspense>
                )
            },
            {
                path: BlogArticleRoute,
                element: (
                    <Suspense>
                        <BlogArticleLazy/>
                    </Suspense>
                )
            }
        ]
    },
]);