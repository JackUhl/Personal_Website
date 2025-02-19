import { createBrowserRouter } from "react-router-dom";
import { BlogRoute, HomeRoute, ProjectsRoute, ResumeRoute } from "../../models/constants/InternalUrlConstants.ts";
import Layout from "../../pages/Layout/Layout.tsx";
import { lazy, Suspense } from "react";
import { Loading } from "../../pages/Loading/Loading.tsx";

const Home = lazy(() => import("../../pages/Home/Home.tsx"))
const Resume = lazy(() => import("../../pages/Resume/Resume.tsx"));
const Projects = lazy(() => import("../../pages/Projects/Projects.tsx"));
const Blog = lazy(() => import("../../pages/Blog/Blog.tsx"))

export const router = createBrowserRouter([
    {
        path: HomeRoute,
        Component: Layout,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Home/>
                    </Suspense>
                )
            },
            {
                path: ResumeRoute,
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Resume/>
                    </Suspense>
                )
            },
            {
                path: ProjectsRoute,
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Projects/>
                    </Suspense>
                )
            },
            {
                path: BlogRoute,
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Blog/>
                    </Suspense>
                )
            },
        ]
    },
]);