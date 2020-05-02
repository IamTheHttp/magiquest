import * as React from "react";
import './Attributes.scss';

import {
  AllowedAttributes,
  characterAttributesConfig
} from "data/attributesConfig";

import {IPlayerUIState} from "interfaces/interfaces";
import OptionsScreen from "ui/Components/__Shared/OptionsScreen/OptionsScreen";

export interface IAttributesProps {
  onCloseAttributes: () => void;
  onBuyAttributeClick: (attrID: AllowedAttributes) => void,
  currentPlayerState: IPlayerUIState,
}


function Attributes(props : IAttributesProps) {
  let attributeIDs = Object.keys(props.currentPlayerState.attributes) as AllowedAttributes[];
  let playerAttributeMap = props.currentPlayerState.attributes;
  let spendableAttributePoints = props.currentPlayerState.spendableAttributePoints;

  return (
    <OptionsScreen className='attributes-screen' onClose={props.onCloseAttributes} >
      <h3>Attributes <span>{spendableAttributePoints}</span></h3>
      <div>
        {attributeIDs.map((attrID) => {
          return (
            <div key={attrID}>
              <span>{characterAttributesConfig[attrID].displayName}</span>
              <span>{playerAttributeMap[attrID]}</span>
              <span><button onClick={() => {
                props.onBuyAttributeClick(attrID);
              }}>+</button></span>
            </div>
          )
        })}
      </div>
    </OptionsScreen>
  )

}

export default Attributes;