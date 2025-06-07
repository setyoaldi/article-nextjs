import { baseUrl } from "@/types/global";
import axios from "axios";

export async function getArticleById(id: string) {
    try {
        const respon = await axios.get(`${baseUrl}articles/?articleId=${id}`);
        return respon.data;
    } catch (err) {
        throw new Error("Failed when try to getArticleById");
    }
}