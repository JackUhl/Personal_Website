import { NavBarItem } from "../objects/NavBarItem";
import { BlogRoute, ProjectsRoute, ResumeRoute } from "./InternalUrlConstants";

export const ResumeNav: NavBarItem = {
    title: "Resume",
    route: ResumeRoute
}

export const ProjectsNav: NavBarItem = {
    title: "Projects",
    route: ProjectsRoute
}

export const BlogNav: NavBarItem = {
    title: "Blog",
    route: BlogRoute
}

export const NavItems: NavBarItem[] = [
    ResumeNav,
    ProjectsNav,
    BlogNav,
]