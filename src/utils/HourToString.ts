export const HourToString = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours();    
    return hours.toString();
}