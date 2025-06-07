import { baseUrl } from "@/types/global";
import axios from "axios";

const token = document?.cookie?.split(';').filter(el => el.trim().startsWith('token')).join('').replace('token=', '').trim();

export async function getArticleById(id: string) {
    try {
        const respon = await axios.get(`${baseUrl}articles/?articleId=${id}`);
        return respon.data;
    } catch (err) {
        throw new Error("Failed when try to getArticleById");
    }
}