import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment';


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export function formatDate(dateString: Date, formatString?: string) {
    return moment(dateString).format(formatString ? formatString : "MMMM Do YYYY");
}
