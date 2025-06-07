import axios from "axios";
import { baseUrl } from "@/types/global";

export async function registerUser({ username, password, role }: { username: string; password: string; role: string }) {
    try {
        const res = await axios.post(
            `${baseUrl}auth/register`,
            {
                username,
                password,
                role,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return res.data;
    } catch (err) {
        throw new Error(`Error when register user from auth: ${err}`);
    }
}

export async function loginUser({ username, password, role }: { username: string; password: string; role: string }) {
    try {
        const res = await axios.post(
            `${baseUrl}auth/login`,
            {
                username,
                password,
                role,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return res.data;
    } catch (err) {
        throw new Error(`Error when login user from auth: ${err}`);
    }
}