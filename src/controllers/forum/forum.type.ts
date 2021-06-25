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

export interface ToggleLikeCommentProps {
    userId: number,
    threadId: number,
    commentId: number
}

export interface CreateThreadProps {
    author: AuthorProps,
    title: string,
    text: string
}
export interface CreateCommentProps {
    author: AuthorProps,
    threadId: number,
    text: string
}