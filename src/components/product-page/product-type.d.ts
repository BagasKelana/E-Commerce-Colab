export type FilterListProps = {
    onClick: React.MouseEventHandler;
    id: string;
    children: React.ReactNode;
    className?: string;
};

export type Filter = {
    term?: string | null;
    category_id?: string | null;
    page?: string | null;
    min?: string | null;
    max?: string | null;
    sf?: string | null;
    so?: string | null;
};

export type FilterComponentProps = {
    filter: Filter;
};
