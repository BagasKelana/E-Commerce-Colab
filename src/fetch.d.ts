export interface FetchCurrentUserType {
    meta: Meta;
    data: Data;
}

export interface Meta {
    code: number;
    status: string;
    message: string;
}

export interface Data {
    user: User;
    role: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    is_active: number;
    image: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    roles: Role[];
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
}

export interface Pivot {
    model_type: string;
    model_id: number;
    role_id: number;
}

export interface ErrorFetchType {
    meta: Meta;
    data: ErrorData;
}

export interface ErrorData {
    credentials: string;
}
