export interface ClothItemPrpos {
    type: string,
    onClick: (data: ClothItemPrpos) => void,
    img: string
}

export interface ClothCardProps {
    img?: string,
    viewedItem: ClothItemPrpos
    isViewed: boolean
}
