export function readableDate(date?: string | null) {
    if (date) {
        const inputDate = new Date(date);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        } as Intl.DateTimeFormatOptions;

        const formattedDate = inputDate.toLocaleDateString('id-ID', options);

        return formattedDate;
    }
    return null;
}
