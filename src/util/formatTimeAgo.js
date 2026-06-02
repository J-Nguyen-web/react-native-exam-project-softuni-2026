export function formatTimeAgo(date) {
    if (!date) return '';
    
    const jsDate =
    date instanceof Date
        ? date
        : date?.toDate
            ? date.toDate() // nested тернарен оператор o_O
            : new Date(date);

    const seconds = Math.floor((Date.now() - jsDate.getTime()) / 1000);

    if (seconds < 60) return 'Just now';

    const minutes = Math.floor(seconds / 60);
    if (seconds < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} d ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} w ago`;

    const months = Math.round(days / 30);
    if (months < 12) return `${months} mo ago`;

    const years = Math.floor(days / 365);
    return `${years} y ago`;
}