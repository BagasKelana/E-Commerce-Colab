type Meta = {
    code: number;
    status: string;
    message: string;
};

type Image = string | null;

type Timestamps = {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

type Role = Timestamps & {
    id: number;
    name: string;
    guard_name: string;
};

type User = Timestamps & {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    is_active: number;
    image: Image;
    roles: Role[];
};

type ErrorData = {
    credentials: string;
};

type FeaturedImage = {
    id: number;
    image: string;
};

type ProductAdmin = Timestamps & {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    is_available: number;
    is_featured: number;
    featured_image_id: number;
    category_id: number;
    featured_image: FeaturedImage;
};

type PageLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type UserDataResponse = Timestamps & {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PageLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

type CategoryAdmin = Timestamps & {
    id: number;
    name: string;
    slug: string;
    image: string;
    item_count: number;
};

type ApiResponse<T> = {
    meta: Meta;
    data: T;
};

// FetchCurrentUserType
export type FetchCurrentUserType = ApiResponse<{
    user: User;
    role: string;
}>;

// ErrorFetchType
export type ErrorFetchType = ApiResponse<ErrorData>;

type AllProductAdmin = detailDataType & {
    data: ProductAdmin[];
    links: PageLink[];
};

type CategoryData = detailDataType & {
    data: CategoryAdmin[];
    links: PageLink[];
};

type detailDataType = {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};
export type OrderStatus = {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
};

export type OrderAdminDetailType = detailDataType & {
    data: OrderAdminType[];
    links: PageLink[];
};

export type OrderAdminType = {
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
};
// FetchAllProductAdmin
export type FetchAllProductAdmin = ApiResponse<AllProductAdmin>;

// FetchAllUserAdmin
export type FetchAllUserAdmin = ApiResponse<UserDataResponse>;

// FetchAllCategoryAdminType
export type FetchAllCategoryAdminType = ApiResponse<CategoryData>;

//FetchALlOrderAdmin
export type FetchAllOrderAdminType = ApiResponse<OrderAdminDetailType>;



