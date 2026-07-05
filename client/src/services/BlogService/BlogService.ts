import axios from "axios";

import { AxiosTimeoutInMs } from "../../models/constants/ConfigurationConstants";
import { BlogApiRoute } from "../../models/constants/RouteConstants";
import { BlogItem, MutateBlogItem } from "../../models/objects/BlogItem";

const url = `${import.meta.env.VITE_API_URL}${BlogApiRoute}`

export class BlogService {
    public static GetAllBlogs() {
        return axios.get<BlogItem[]>(url, { timeout: AxiosTimeoutInMs })
    }

    public static GetBlog(id: string | undefined) {
        return axios.get<BlogItem>(`${url}/${id}`, { timeout: AxiosTimeoutInMs });
    }

    public static PostBlog(blogItem: MutateBlogItem) {
        return axios.post<BlogItem>(url, blogItem, { timeout: AxiosTimeoutInMs });
    }

    public static PutBlog(id: string, blogItem: MutateBlogItem) {
        return axios.put<BlogItem>(`${url}/${id}`, blogItem, { timeout: AxiosTimeoutInMs });
    }

    public static DeleteBlog(id: string) {
        return axios.delete(`${url}/${id}`, { timeout: AxiosTimeoutInMs });
    }
}