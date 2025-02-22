import { createBrowserRouter } from "react-router-dom";
import { BlogRoute, HomeRoute, ProjectsRoute, ResumeRoute } from "../../models/constants/InternalUrlConstants.ts";
import Layout from "../../pages/Layout/Layout.tsx";
import { lazy, Suspense } from "react";

const HomeLazy = lazy(() => import("../../pages/Home/Home.tsx"))
const ResumeLazy = lazy(() => import("../../pages/Resume/Resume.tsx"));
const ProjectsLazy = lazy(() => import("../../pages/Projects/Projects.tsx"));
const BlogLazy = lazy(() => import("../../pages/Blog/Blog.tsx"))

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
                path: ProjectsRoute,
                element: (
                    <Suspense>
                        <ProjectsLazy/>
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
        ]
    },
]);