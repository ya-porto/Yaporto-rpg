export interface ThreadProps {
    data: string,
    theme: string,
    message: string,
    commentsQuantity: string,
    threadStarter?: {
        login: string,
        avatar: string,
    }
    comments?:
        {
            commentMessage: string,
            commentator: {
                login: string,
                avatar: string
            }
        } []

}
