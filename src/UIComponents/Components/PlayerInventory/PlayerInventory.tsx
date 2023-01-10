import React, {ReactElement} from 'react';
import './PlayerInventory.scss';

// TODO remove this after we implement it through Canvas
export function PlayerInventory(props: {isInventoryOpen: boolean; onClose: () => void}): ReactElement {
  if (props.isInventoryOpen) {
    return (
      <div className={'inventory'}>
        <div className="inventory-close" onClick={props.onClose}>
          &times;
        </div>
        <div>
          <h4>Weapons</h4>
          <div className={'items'}>
            <div className={'item'}></div>
            <div className={'item'}></div>
            <div className={'item'}></div>
            <div className={'item'}></div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
