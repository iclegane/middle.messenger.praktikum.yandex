import { WithRouterProps } from '../../modules/Router/types';

export interface ILinkProps extends WithRouterProps{
    label: string;
    classes:string;
    href: string;
}
