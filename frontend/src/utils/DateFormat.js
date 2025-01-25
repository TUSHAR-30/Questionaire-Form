export const dateConverter = (inputDate) => {
    
    const date = new Date(inputDate); // Convert to Date object

    // Format the date
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`; // Combine into desired format
    return formattedDate
}