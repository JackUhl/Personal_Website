import { createBrowserRouter } from "react-router-dom";
import { BlogRoute, HomeRoute, ProjectsRoute, ResumeRoute } from "../../models/constants/InternalUrlConstants.ts";
import Layout from "../../pages/Layout/Layout.tsx";
import Home from "../../pages/Home/Home.tsx";
import Resume from "../../pages/Resume/Resume.tsx";
import Projects from "../../pages/Projects/Projects.tsx";
import Blog from "../../pages/Blog/Blog.tsx";

export const router = createBrowserRouter([
    {
        path: HomeRoute,
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: ResumeRoute,
                Component: Resume
            },
            {
                path: ProjectsRoute,
                Component: Projects
            },
            {
                path: BlogRoute,
                Component: Blog
            },
        ]
    },
]);