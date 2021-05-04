export const threadMock: ThreadProps[] = [{
    data: '05.07.2020',
    theme: 'Привет мир',
    message: 'Первое сообщение',
    commentsQuantity: '5'
},
{
    data: '05.07.2020',
    theme: 'Привет мир',
    message: 'Первое сообщение',
    commentsQuantity: '5'
},

]


interface ThreadProps {
    data: string,
    theme: string,
    message: string,
    commentsQuantity: string
}