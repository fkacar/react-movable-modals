import React from 'react';
export interface PropTypes {
    className: string;
    width: number;
    height: number;
    top: number;
    left: number;
    isDragging: boolean;
    isOpen: boolean;
    isMinimised: boolean;
    onRequestRecover: () => void;
    onFocus: () => void;
    children?: React.ReactNode;
}
declare const Modal: React.ForwardRefExoticComponent<PropTypes & React.RefAttributes<unknown>>;
export default Modal;
