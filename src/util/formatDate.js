export function formatDate(date) {
    if(!date) return '';

    let jsDate; // transformed date will be stored here

    if (date instanceof Date ) { // check if its JS type Date
        jsDate = date;
    } else if (date?.toDate){ // check if its firestore Timestamp Date (bcoz it would got .toDate method inside)
        jsDate = date.toDate();
    } else if (date?.seconds) { // check if not actual Timestamp after modifications
        jsDate = new Date(date.seconds * 1000)
    } else {
        jsDate = new Date(date); // last-resort parser
    }
    
    // JS formatDate
    const options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }
    return jsDate.toLocaleDateString("en-GB", options) // convert the converted jsDate to text visual date

    // firebase formatDate
    // const jsDate = 
    //     date?.toDate ? date.toDate() : new Date(date.seconds * 1000);

    //     return jsDate.toLocaleDateString();


}