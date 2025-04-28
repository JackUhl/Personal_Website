import axios from "axios";
import { BlogItem } from "../models/objects/BlogItem";
import { AxiosTimeoutInMs } from "../models/constants/ConfigurationConstants";
import { BlogApiRoute } from "../models/constants/RouteConstants";

const url = `${import.meta.env.VITE_BACKEND_URL}${BlogApiRoute}`

export class BlogService {
    public static GetAllBlogs() {
        return axios.get<BlogItem[]>(url, {timeout: AxiosTimeoutInMs})
    }

    public static GetBlog(id: number | undefined) {
        return axios.get<BlogItem>(`${url}/${id}`, {timeout: AxiosTimeoutInMs});
    }
}