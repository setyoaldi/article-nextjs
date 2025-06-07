import { Articles, Category, UserProfile, baseUrl } from "@/types/global";
import axios from "axios";
import { getToken } from "@/utils/helper";

export async function getAllArticles(title: string, page = 1, limit = 10, category?: string): Promise<Articles> {
    try {
        const respon = await axios.get(`${baseUrl}articles`, {
            params: {
                page,
                limit,
                category,
                title
            }
        });
        return respon.data;
    } catch (err) {
        throw new Error(`Error when getAllArticles: ${err}`);
    }
}

export async function getUserProfile(): Promise<UserProfile> {
    const token = getToken();
    try {
        const respon = await axios.get(`${baseUrl}auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return respon.data;
    } catch (e) {
        throw new Error(`Failed get user profile with error: ${e}`)
    }
}

export async function getAllCategory(page: number, limit: number, search?: string,) {
    try {
        const respon = await axios.get(`${baseUrl}categories`, {
            params: {
                page,
                limit,
                search
            }
        })
        return respon.data;
    } catch (e) {
        throw new Error(`Error when get all category: ${e}`)
    }
}

export async function uploadImage(imageFile: File): Promise<string> {
    const token = getToken();
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        const respon = await axios.post(`${baseUrl}upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        })
        return respon?.data?.imageUrl
    } catch (e) {
        throw new Error(`Error when upload image: ${e}`);
    }
}

export async function createCategory(name: string): Promise<Category> {
    const token = getToken();
    try {
        const respon = await axios.post(
            `${baseUrl}categories`,
            {
                name,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return respon?.data;
    } catch (e) {
        throw new Error(`Error when upload image: ${e}`);
    }
}

export async function editCategory(id: string, name: string): Promise<Category> {
    const token = getToken();
    try {
        const respon = await axios.put(
            `${baseUrl}categories/${id}`,
            {
                name
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return respon?.data;
    } catch (e) {
        throw new Error(`Error when upload image: ${e}`);
    }
}

export async function deleteCategory(id: string): Promise<Category> {
    const token = getToken();
    try {
        const respon = await axios.delete(`${baseUrl}categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return respon?.data;
    } catch (e) {
        throw new Error(`Error when upload image: ${e}`);
    }
}

export async function createArticle(title: string, content: string, categoryId: string): Promise<Category> {
    const token = getToken();
    try {
        const respon = await axios.post(`${baseUrl}articles`, {
            title,
            categoryId,
            content
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

        return respon?.data;
    } catch (e) {
        throw new Error(`Error from server when create article: ${e}`);
    }
}

export async function editArticle(title: string, content: string, categoryId: string, id: string): Promise<Category> {
    const token = getToken();
    try {
        const respon = await axios.put(`${baseUrl}articles/${id}`, {
            title,
            categoryId,
            content
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return respon?.data;
    } catch (e) {
        throw new Error(`Error from server when create article: ${e}`);
    }
}

export async function deleteArticle(id: string): Promise<Category> {
    const token = getToken();
    try {
        const respon = await axios.delete(`${baseUrl}articles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return respon?.data;
    } catch (e) {
        throw new Error(`Error delete article: ${e}`);
    }
}