export function showImageAPI(url?: string | null) {
    if (url) {
        const endPointImage = import.meta.env.VITE_DEVELOPE_API_IMG;
        const srcImage = `${endPointImage}/${url}`;

        return srcImage;
    }
    // default images
    return '/images/profile_3135715.png';
}
