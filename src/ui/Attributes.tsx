import * as React from "react";
import './Attributes.scss';

import {
  AllowedAttributes,
  characterAttributesConfig
} from "../data/attributesConfig";

import {IPlayerUIState} from "../interfaces/interfaces";
import OptionsScreen from "./Components/Shared/OptionsScreen/OptionsScreen";

export interface IAttributesProps {
  onCloseAttributes: () => void;
  onBuyAttributeClick: () => void,
  currentPlayerState: IPlayerUIState
}


function Attributes(props : IAttributesProps) {
  let attributeIDs = Object.keys(props.currentPlayerState.attributes) as AllowedAttributes[];
  let playerAttributeMap = props.currentPlayerState.attributes;

  return (
    <OptionsScreen onClose={props.onCloseAttributes} >
      <h1>Attributes</h1>
      <div>
        {attributeIDs.map((attrID) => {
          return (
            <div key={attrID}>
              <span>{characterAttributesConfig[attrID].displayName}</span>
              <span>{playerAttributeMap[attrID]}</span>
            </div>
          )
        })}
      </div>
    </OptionsScreen>
  )

}

export default Attributes;