export interface AuthorProps {
    display_name: string
}
export interface ThreadProps extends CreateThreadProps {
    thread_id: number,
    comments?: number
}

export interface CommentProps extends CreateCommentProps {
    id: number,
    likes?: number
}

export interface ToggleLikeCommentProps {
    userId: number,
    threadId: number,
    commentId: number
}

export interface CreateThreadProps {
    user_info: string,
    title: string,
    text: string
}
export interface CreateCommentProps {
    user_info: string,
    threadId: number,
    text: string
}