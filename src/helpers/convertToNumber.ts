export function convertToNumber(input: string) {
    const cleanedInput = input.replace(/\./g, '');
    const sanitizedInput = cleanedInput.replace(',', '.');
    const result = parseFloat(sanitizedInput);

    return isNaN(result) ? 0 : result;
}