export interface AuthorProps {
    id: number,
    avatar?: string,
    name: string
}
export interface ThreadProps extends CreateThreadProps {
    id: number,
    comments?: CommentProps[]
}

export interface CommentProps extends CreateCommentProps {
    id: number,
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