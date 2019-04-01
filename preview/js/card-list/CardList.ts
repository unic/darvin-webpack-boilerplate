export interface TileList {
    items: CardItem[];
}

export interface CardItem {
    id: string;

    name: string;

    title: string;

    target: string;

    type: string;

    chunkName?: string;

    path: string;

    variants: string;
}
