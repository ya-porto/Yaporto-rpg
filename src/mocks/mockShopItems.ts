import {ClothProps} from '../components/clothButton/clothButton';

export const mockShopItems: ClothProps[] = [
    {
        defence: 1,
        hitpoint: 0,
        img: '',
        type: 'armor',
        name: 'Мега-пыщ-шлем',
        baf: 'Защита +1',
        description: 'Старый и ржавый щлем способный защитить разве что от напильника. Но лучше чем ничего',
        isBought: false,
        isPutOn: false,
        onClick: ()=> {}
    },
    {
        defence: 0,
        hitpoint: 1,
        img: '',
        type: 'weapon',
        name: 'Мега-пыщ-меч',
        baf: 'Атака +1',
        description: 'Старый и ржавый меч в зазубринах. Если не режет - всегда можно огреть как дубинкой',
        isBought: false,
        isPutOn: false,
        onClick: ()=> {}
    }
]