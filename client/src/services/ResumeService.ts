import axios from "axios";
import { ResumeItems } from "../models/objects/ResumeItems";

const url = "http://localhost:5173/api/resume"

export class ResumeService {
    public static GetResume() {
        return axios.get<ResumeItems>(url, {timeout: 3000});
    }
}