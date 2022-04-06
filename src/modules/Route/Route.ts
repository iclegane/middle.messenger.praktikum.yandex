import { Block } from '../Block';
import { renderDOM } from '../../utils/renderDOM';
import { IBlockClass, IRouterProps } from './types';

export class Route {
  private _pathname: string;

  private readonly _blockClass: IBlockClass;

  private _block: Block | null = null;

  private _props: IRouterProps | null = null;

  constructor(pathname: string, view: IBlockClass, props: IRouterProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
      this._block = null;
    }
  }

  match(pathname: string): boolean {
    const match = pathname?.match(this._pathname);
    if (match) {
      return match.index === 0;
    }
    return false;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      // @ts-ignore
      renderDOM(this._props.rootQuery, this._block);

      return;
    }

    this._block.show();
  }
}
