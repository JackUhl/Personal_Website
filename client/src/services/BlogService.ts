import axios from "axios";
import { BlogItem, CreateBlogItem } from "../models/objects/BlogItem";
import { AxiosTimeoutInMs } from "../models/constants/ConfigurationConstants";
import { BlogApiRoute } from "../models/constants/RouteConstants";

const url = `${import.meta.env.VITE_API_URL}${BlogApiRoute}`

export class BlogService {
    public static GetAllBlogs() {
        return axios.get<BlogItem[]>(url, { timeout: AxiosTimeoutInMs })
    }

    public static GetBlog(id: string | undefined) {
        return axios.get<BlogItem>(`${url}/${id}`, { timeout: AxiosTimeoutInMs });
    }

    public static PostBlog(postBlogItem: CreateBlogItem) {
        return axios.post<BlogItem>(url, postBlogItem, { timeout: AxiosTimeoutInMs });
    }
}