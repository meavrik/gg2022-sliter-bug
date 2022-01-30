export interface IFood {
    x: number;
    y: number;
    symbol: string;
    points: number;
    speed: number;
    type?: 'change' | 'food' | 'bomb' | 'crazy';
}
