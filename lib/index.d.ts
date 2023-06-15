import { FC, ReactNode } from 'react';
import './index.css';
export interface IValue {
    height: number;
    width: number;
    top: number;
    left: number;
}
export interface PropTypes {
    top?: number;
    left?: number;
    initHeight?: number;
    initWidth?: number;
    minWidth?: number;
    minHeight?: number;
    isOpen: boolean;
    className?: string;
    disableMove?: boolean;
    disableVerticalMove?: boolean;
    disableHorizontalMove?: boolean;
    isMinimised?: boolean;
    disableResize?: boolean;
    disableKeystroke?: boolean;
    disableVerticalResize?: boolean;
    disableHorizontalResize?: boolean;
    onRequestClose: () => void;
    onRequestMinimise?: () => void;
    onRequestRecover?: () => void;
    onFocus?: () => void;
    onValuesChange?: ({ height, width, top, left }: IValue) => void;
    currentWidth?: number;
    currentHeight?: number;
    children?: ReactNode;
}
export interface IRel {
    x: number;
    y: number;
}
export interface StateTypes {
    width: number;
    height: number;
    top: number;
    left: number;
    rel?: IRel;
    isDragging: boolean;
    isResizing: boolean;
}
declare const MovableModal: FC<PropTypes>;
export default MovableModal;
