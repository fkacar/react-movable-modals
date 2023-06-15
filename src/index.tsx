import React, {
  FC,
  useEffect,
  useState,
  useRef,
  ReactNode,
  useCallback
} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Resizer from './Resizer';
import Modal from './Modal';

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

const MovableModal: FC<PropTypes> = (props) => {
  const {
    isOpen,
    isMinimised,
    onRequestClose,
    onRequestMinimise,
    onRequestRecover,
    disableResize,
    className,
    onFocus,
    currentHeight,
    currentWidth,
    top,
    left,
    initHeight,
    initWidth,
    disableMove,
    disableVerticalMove,
    disableHorizontalMove,
    minWidth,
    minHeight,
    disableVerticalResize,
    disableHorizontalResize,
    disableKeystroke,
    children,
    onValuesChange
  } = props;

  const node_modal = useRef<any>(null);
  const dragArea = useRef<any>(null);
  const dragArea2 = useRef<HTMLDivElement | null>(null);
  const dragArea3 = useRef<HTMLDivElement | null>(null);
  const dragArea4 = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const isResizing = useRef<boolean>(false);
  const rel = useRef<IRel | null>(null);
  const [topState, setTopState] = useState<number>(
    top !== undefined
      ? top
      : initHeight
      ? window.innerHeight / 2 - initHeight / 2 - 50
      : window.innerHeight / 2 - 400 / 2 - 50
  );
  const [leftState, setLeftState] = useState<number>(
    left !== undefined
      ? left
      : initWidth
      ? window.innerWidth / 2 - initWidth / 2 - 21
      : window.innerWidth / 2 - 800 / 2 - 21
  );
  const [width, setWidth] = useState<number>(initWidth || 800);
  const [height, setHeight] = useState<number>(initHeight || 400);

  const funcResizing = (clientX: number, clientY: number) => {
    const mWidth: number = minWidth;
    const mHeight: number = minHeight;
    let node = ReactDOM.findDOMNode(node_modal.current) as HTMLElement;
    let minWidthInner = mWidth ? mWidth : 200;
    let minHeightInner = mHeight ? mHeight : 100;
    if (
      !disableHorizontalResize &&
      node &&
      clientX > node.offsetLeft + minWidthInner
    ) {
      setWidth(clientX - node.offsetLeft + 16 / 2);
    }
    if (
      !disableVerticalResize &&
      node &&
      clientY > node.offsetTop + minHeightInner
    ) {
      setHeight(clientY - node.offsetTop + 16 / 2);
    }
  };

  const onMouseMove = useCallback(
    (e: {
      pageY: number;
      pageX: number;
      clientX: any;
      clientY: any;
      stopPropagation: () => void;
      preventDefault: () => void;
    }) => {
      if (isDragging.current && rel.current) {
        if (disableMove) {
        } else if (disableVerticalMove && disableHorizontalMove) {
        } else if (!disableVerticalMove && disableHorizontalMove) {
          setTopState(e.pageY - rel.current.y);
        } else if (disableVerticalMove && !disableHorizontalMove) {
          setLeftState(e.pageX - rel.current.x);
        } else if (!disableVerticalMove && !disableHorizontalMove) {
          setLeftState(e.pageX - rel.current.x);
          setTopState(e.pageY - rel.current.y);
        }
      } else if (isResizing.current) {
        funcResizing(e.clientX, e.clientY);
      } else {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
    },
    []
  );

  const onMouseUp = useCallback((e: { stopPropagation: () => void }) => {
    document.removeEventListener('mousemove', onMouseMove);
    isDragging.current = false;
    isResizing.current = false;

    e.stopPropagation();
    // e.preventDefault();
  }, []);

  const onMouseDown = useCallback(
    (e: {
      button: number;
      pageX: number;
      pageY: number;
      stopPropagation: () => void;
      preventDefault: () => void;
    }) => {
      // only left mouse button
      document.addEventListener('mousemove', onMouseMove);
      if (e.button !== 0) return;
      const pos = ReactDOM.findDOMNode(node_modal.current) as HTMLElement;
      if (pos) {
        isDragging.current = true;

        rel.current = {
          x: e.pageX - pos.offsetLeft,
          y: e.pageY - pos.offsetTop
        };
      }
      e.stopPropagation();
      e.preventDefault();
    },
    []
  );

  const updateStateResizing = (isResizingInner: any) => {
    document.addEventListener('mousemove', onMouseMove);
    isResizing.current = isResizingInner;
  };

  const pressKey = useCallback((e: { ctrlKey: any; keyCode: any }) => {
    if (e.ctrlKey) {
      switch (e.keyCode) {
        case 37:
          !disableResize && setWidth(width - 20);
          break;
        case 38:
          !disableResize && setHeight(height - 20);
          break;
        case 39:
          !disableResize && setWidth(width + 20);
          break;
        case 40:
          !disableResize && setHeight(height + 20);
          break;
      }
    } else {
      switch (e.keyCode) {
        case 27:
          onRequestClose();
          break;
        case 37:
          !disableMove &&
            !disableHorizontalMove &&
            setLeftState(leftState - 20);
          break;
        case 38:
          !disableMove && !disableVerticalMove && setTopState(topState - 20);
          break;
        case 39:
          !disableMove &&
            !disableHorizontalMove &&
            setLeftState(leftState + 20);
          break;
        case 40:
          !disableMove && !disableVerticalMove && setTopState(topState + 20);
          break;
      }
    }
  }, []);

  const resize = (widthInner: any, heightInner: any) => {
    setWidth(widthInner || width);
    setHeight(heightInner || height);
  };

  const blockStateChange = useRef<boolean>(false);
  const firstRender = useRef<boolean>(true);
  useEffect(() => {
    if (blockStateChange.current) return;
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    setHeight(currentHeight);
  }, [currentHeight]);

  const firstRenderForWidth = useRef<boolean>(true);
  useEffect(() => {
    if (blockStateChange.current) return;
    if (firstRenderForWidth.current) {
      firstRenderForWidth.current = false;

      return;
    }

    setWidth(currentWidth);
  }, [currentWidth]);

  useEffect(() => {
    if (blockStateChange.current) return;
    setTopState(top);
    setLeftState(left);
  }, [top, left]);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    if (!disableKeystroke) document.addEventListener('keydown', pressKey);

    return () => {
      if (document.removeEventListener) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (!disableKeystroke)
          document.removeEventListener('keydown', pressKey);
      }
    };
  }, []);

  useEffect(() => {
    if (!onValuesChange) return;

    blockStateChange.current = true;
    setTimeout(() => {
      blockStateChange.current = false;
    }, 200);
    onValuesChange({ height, width, top: topState, left: leftState });
  }, [width, height, topState, leftState]);

  return (
    <div>
      {/*this mask is a must*/}
      {isOpen && !isMinimised && (
        <div
          onClick={onRequestMinimise ? onRequestMinimise : onRequestClose}
          className='flexible-modal-mask'
        />
      )}
      <Modal
        className={className}
        onFocus={onFocus}
        width={width}
        height={height}
        top={topState}
        left={leftState}
        isDragging={isDragging.current}
        onRequestRecover={onRequestRecover}
        isMinimised={isMinimised}
        isOpen={isOpen}
        ref={node_modal}
      >
        {children}
        <div
          onMouseDown={onMouseDown}
          className='flexible-modal-drag-area'
          style={{
            width
          }}
          ref={dragArea}
        />
        <div
          onMouseDown={onMouseDown}
          className='flexible-modal-drag-area-left'
          style={{
            height
          }}
          ref={dragArea2}
        />
        <div
          onMouseDown={onMouseDown}
          className='flexible-modal-drag-area-bottom'
          style={{
            width
          }}
          ref={dragArea3}
        />
        <div
          onMouseDown={onMouseDown}
          className='flexible-modal-drag-area-right'
          style={{
            height
          }}
          ref={dragArea4}
        />
        {!disableResize && (
          <Resizer updateStateResizing={updateStateResizing} />
        )}
      </Modal>
    </div>
  );
};

export default MovableModal;
