import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function useDebounce(value: string, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export function formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}