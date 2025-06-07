import { ReactNode } from "react";

export interface InputText {
    value?: string;
    type?: string;
    placeholder?: string;
    suffixIcon?: React.ReactNode;
    prefixIcon?: React.ReactNode;
    errorMessage?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    inputStyle?: string;
    inputStyleFromComponent?: string;
}

export interface InputPaassword {
    type?: string;
    placeholder?: string;
    errorMessage?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    suffixIcon?: React.ReactNode;
    preffixIcon?: React.ReactNode;
    inputStyle?: string;
}

export type InputSelect = {
    value: string;
    label: string;
};

export interface SelectRole {
    value?: string;
    type?: string;
    placeholder?: string;
    suffixIcon?: React.ReactNode;
    prefixIcon?: React.ReactNode;
    errorMessage?: string;
    onBlur?: React.FocusEventHandler<HTMLSelectElement>;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    inputStyle?: string;
    dropDownValue?: InputSelect[];
    inputStyleFromComponent?: string;
}

export interface ButtonProps {
    styles?: string;
    text?: string;
    img?: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    patchName?: string;
    type?: "submit" | "reset" | "button" | undefined;
}

export interface Category {
    id?: string;
    userId?: string;
    name?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface User {
    id?: string;
    username?: string;
}

export interface Article {
    id?: string;
    userId?: string;
    categoryId?: string;
    title?: string;
    content?: string;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    category?: Category;
    user?: User;
}

export interface Articles {
    data?: Article[];
    limit?: number;
    page?: number;
    total?: number;
}

export interface UserProfile {
    id: string;
    role?: string;
    username?: string;
}

export interface Categorys {
    data?: Category[];
    totalData?: number;
    totalPages?: number;
    currentPage?: number;
    name?: string;
    id?: string;
}

export interface EditData {
    articleId: string;
    articleContent: string;
    articleTitle: string;
    imageUrl: string;
    categoryId: string;
    categoryName: string;
}

export interface Footer {
    title?: string;
    profileText?: string;
    style?: string;
    wraperProfileStyle?: string;
    imgStyle?: string;
    profileTextStyle?: string;
    wrapperTitleStyle?: string;
    titleStyle?: string;
    profilePict?: string;
    logoUrl?: string;
    logoStyle?: string;
}

export interface Header {
    title?: string;
    profileText?: string;
    style?: string;
    wraperProfileStyle?: string;
    imgStyle?: string;
    profileTextStyle?: string;
    wrapperTitleStyle?: string;
    titleStyle?: string;
    profilePict?: string;
    logoUrl?: string;
    logoStyle?: string;
    category?: Categorys;
    logoClickable?: boolean;
    logoRedirectTo?: string;
    dropdown?: string;
    hamburgerMenu?: boolean;
    handleNavbarClicked?: () => void;
}

export interface QuillEditorComponentProps {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
}

export const baseUrl = "https://test-fe.mysellerpintar.com/api/";