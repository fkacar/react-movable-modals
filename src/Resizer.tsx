import React, { FC, useCallback } from 'react';

export interface PropTypes {
  updateStateResizing: (v: boolean) => void;
}

const Resizer: FC<PropTypes> = ({ updateStateResizing }) => {
  const style = {
    width: 16,
    height: 16
  };

  const handleMouseDown = useCallback(() => {
    updateStateResizing(true);
  }, []);

  return (
    <div
      className='flexible-modal-resizer'
      style={style}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Resizer;
