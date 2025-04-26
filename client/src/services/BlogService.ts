import axios from "axios";
import { BlogItem } from "../models/objects/BlogItem";

const url = "http://localhost:5173/api/blog"

export class BlogService {
    public static GetAllBlogs() {
        return axios.get<BlogItem[]>(url, {timeout: 3000})
    }

    public static GetBlog(id: number | undefined) {
        return axios.get<BlogItem>(url + `/${id}`, {timeout: 3000});
    }
}