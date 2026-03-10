export function formatDate(date) {
    if(!date) return '';

    const storedDate = new Date(date)
    const options = {
        day: "2-digit",
        month: "short",
        //without year: "numeric"
    }
    return storedDate.toLocaleDateString("en-GB", options)
}