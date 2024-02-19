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

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getTimeOfDay(currentDate: Date) {
    const hour = moment(currentDate).hour();

    if (hour >= 5 && hour < 12) {
        return 'morning';
    } else if (hour >= 12 && hour < 17) {
        return 'afternoon';
    } else if (hour >= 17 && hour < 21) {
        return 'evening';
    } else {
        return 'night';
    }
}
