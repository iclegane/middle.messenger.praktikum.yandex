import { Block } from '../Block';

export type IBlockClass = { new(): Block }

export type IRouterProps = {
    rootQuery: string;
}
