import axios from 'axios';

export const deleteItem = async (
    id: number,
    itemType: 'ORDER' | 'PRODUCT' | 'CATEGORY' | 'USER',
    token?: string
) => {
    try {
        const itemTypeMap: Record<
            'ORDER' | 'PRODUCT' | 'CATEGORY' | 'USER',
            string
        > = {
            ORDER: import.meta.env.VITE_ADMIN_DELETE_ORDER,
            PRODUCT: import.meta.env.VITE_ADMIN_DELETE_PRODUCT,
            CATEGORY: import.meta.env.VITE_ADMIN_DELETE_CATEGORY,
            USER: import.meta.env.VITE_ADMIN_DELETE_USER
        };

        if (!itemTypeMap[itemType]) {
            throw new Error('Invalid itemType');
        }

        const url = `${itemTypeMap[itemType]}/${id}`;
        console.log(url);

        await axios.delete(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
    } catch (err) {
        console.log(err);
    }
};
