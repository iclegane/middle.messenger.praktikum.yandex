import Block from "../../utils/Block";

export type IBlockClass = { new(): Block }

export type IRouterProps = {
    rootQuery: string;
}