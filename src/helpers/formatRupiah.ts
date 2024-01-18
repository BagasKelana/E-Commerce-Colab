export function formatRupiah(currency?: number | null) {
    if (currency) {
        const formattedNumber = new Intl.NumberFormat('id-ID', {
            currency: 'IDR'
        }).format(currency);
        return formattedNumber;
    }
    return null;
}
