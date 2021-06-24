export interface AuthorProps {
    id: number,
    avatar?: string,
    name: string
}
export interface ThreadProps {
    id: number,
    author: AuthorProps,
    title: string,
    text: string,
    comments?: CommentProps[]
}

export interface CommentProps {
    id: number,
    author: AuthorProps,
    text: string,
    likes: number[]
}
