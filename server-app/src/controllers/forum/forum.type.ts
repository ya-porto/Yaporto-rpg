export interface AuthorProps {
    display_name: string
}
export interface ThreadProps extends CreateThreadProps {
    thread_id?: number,
    comments?: number,

}

export interface CommentProps extends CreateCommentProps {
    comment_id: number,
    likes?: number,
    liked?: boolean,
    
}

export interface ToggleLikeCommentProps {
    user_id: number,
    thread_id: number,
    comment_id: number
}

export interface CreateThreadProps {
    user_info?: string,
    title?: string,
    text?: string
}
export interface CreateCommentProps {
    user_info: string,
    threadId: number,
    text: string
}