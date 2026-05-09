export function formatDate(date) {
    if(!date) return '';

    // firebase formatDate
    const jsDate = 
        date?.toDate ? date.toDate() : new Date(date.seconds * 1000);

        return jsDate.toLocaleDateString();

    // JS formatDate
    // const storedDate = new Date(date)
    // const options = {
    //     day: "2-digit",
    //     month: "long",
    //     //without year: "numeric"
    // }
    // return storedDate.toLocaleDateString("en-GB", options)
}