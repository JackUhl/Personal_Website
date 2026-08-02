import axios from "axios";

import { AxiosLongTimeoutInMs } from "../../models/constants/ConfigurationConstants";
import { UploadApiRoute } from "../../models/constants/RouteConstants";

const url = `${import.meta.env.VITE_API_URL}${UploadApiRoute}`

export class UploadService {
    public static GetFile(key: string) {
        return `${url}/${key}`;
    }

    public static PostFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        return axios.post<string>(url, formData, {
            timeout: AxiosLongTimeoutInMs,
            headers: { "Content-Type": "multipart/form-data" },
        });
    }

    public static DeleteFile(key: string) {
        return axios.delete(`${url}/${key}`);
    }
}