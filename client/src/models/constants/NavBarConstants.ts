import { NavBarItem } from "../objects/NavBarItem";
import { HomeRoute, ResumeRoute, BlogRoute } from "./RouteConstants";

export const HomeNav: NavBarItem = {
    title: "Home",
    route: HomeRoute
}

export const ResumeNav: NavBarItem = {
    title: "Resume",
    route: ResumeRoute
}

export const BlogNav: NavBarItem = {
    title: "Blog",
    route: BlogRoute
}

export const NavItems: NavBarItem[] = [
    HomeNav,
    ResumeNav,
    BlogNav,
]