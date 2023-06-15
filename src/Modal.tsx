import React, { FC, useRef, forwardRef } from 'react';
import * as FontAwesome from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

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

const Modal = forwardRef((props: PropTypes, ref: any) => {
  const {
    className,
    width,
    height,
    top,
    left,
    isDragging,
    isOpen,
    isMinimised,
    onRequestRecover,
    onFocus,
    children
  } = props;

  return (
    <>
      {isOpen && (
        <>
          <CSSTransition
            in={!isMinimised}
            timeout={300}
            classNames='minimise'
            unmountOnExit
          >
            <div
              onClick={onFocus}
              ref={ref}
              draggable={isDragging}
              className={
                !className ? 'flexible-modal' : 'flexible-modal ' + className
              }
              style={{ width, height, top, left }}
            >
              {children}
            </div>
          </CSSTransition>
          {isMinimised && (
            <button
              className='flexible-modal-rebound-btn'
              onClick={onRequestRecover}
            >
              <FontAwesome.FaBars />
            </button>
          )}
        </>
      )}
    </>
  );
});

export default Modal;
