export type FilterListProps = {
    onClick: React.MouseEventHandler;
    id: string;
    children: React.ReactNode;
    className?: string;
    isLoading: boolean;
};

export type Filter = {
    term?: string | null;
    category_id?: string | null;
    page?: string | null;
    min?: string | null;
    max?: string | null;
    sf?: string | null;
    so?: string | null;
    [key: string]: string | null | undefined;
};

export type FilterComponentProps = {
    filter: Filter;
};
