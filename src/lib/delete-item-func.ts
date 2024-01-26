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
            ORDER: 'order',
            PRODUCT: 'product',
            CATEGORY: 'category',
            USER: 'user'
        };

        if (!itemTypeMap[itemType]) {
            throw new Error('Invalid itemType');
        }

        const url = `/admin/${itemTypeMap[itemType]}/${id}`;
        console.log(url);

        await axios.delete(url, {
            headers: {
                Authorization: 'Bearer ' + token,
                // Untuk mengatur dan mengirim header yang Anda inginkan
                'ngrok-skip-browser-warning': 'any_value'
            }
        });
    } catch (err) {
        console.log(err);
    }
};
