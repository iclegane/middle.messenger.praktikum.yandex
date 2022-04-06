export type IActionListItem = {
    label:string;
}

export type IActionList = {
    label: string;
    position: 'top' | 'bottom';
    items: Array<IActionListItem>
}
