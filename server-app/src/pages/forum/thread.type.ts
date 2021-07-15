export interface AuthorProps {
    user_id: number,
    avatar?: string,
    display_name: string
}
export interface ThreadProps extends CreateThreadProps {
    thread_id: number,
    comments?: CommentProps[]
}

export interface CreateThreadProps {
    author_info: AuthorProps,
    user_id: number,
    title: string,
    text: string
}

export interface CommentProps extends CreateCommentProps {
    comment_id: number,
    liked: boolean
    count: number
}

export interface CreateCommentProps {
    author_info: AuthorProps,
    user_id: number,
    thread_id: number,
    text: string
}

export interface ToggleLikeCommentProps {
    user_id: number,
    comment_id: number
}


