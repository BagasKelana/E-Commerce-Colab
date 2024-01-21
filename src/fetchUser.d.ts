export interface FetchUserOrderDetail {
    meta: Meta;
    data: Data;
}

export interface Meta {
    code: number;
    status: string;
    message: string;
}

export interface Data {
    current_page: number;
    data: UserOrderDetail[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface UserOrderDetail {
    id: number;
    date: string;
    invoice: string;
    total: number;
    name: string;
    address: string;
    phone: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user_id: number;
    order_status_id: number;
    order_status: OrderStatus;
    order_product: OrderProduct[];
}

export interface OrderStatus {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface OrderProduct {
    id: number;
    name: string;
    qty: number;
    price: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    order_id: number;
    product_id: number;
    product: Product;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    is_available: number;
    is_featured: number;
    featured_image_id: number;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    category_id: number;
    featured_image: FeaturedImage;
}

export interface FeaturedImage {
    id: number;
    image: string;
}

export interface Link {
    url?: string;
    label: string;
    active: boolean;
}

// product detail by slug

export interface DetailProductProps {
    meta: Meta;
    data: DetailProduct;
}

export interface DetailProduct {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    is_available: number;
    featured: number;
    featured_image_id: number;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    category_id: number;
    featured_image: FeaturedImage;
    product_image: ProductImage[];
}

export interface FeaturedImage {
    id: number;
    image: string;
}

export interface ProductImage {
    id: number;
    image: string;
    created_at?: string;
    updated_at?: string;
    product_id: number;
}
