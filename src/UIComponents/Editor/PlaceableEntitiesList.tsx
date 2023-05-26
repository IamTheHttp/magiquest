import React from 'react';
import {getAllPlaceableEntityJSONFiles} from '../../utils/getAllPlaceableEntityJSONFiles';
import {IPlaceableEntityJSON} from '../../interfaces/IPlaceableEntityJSON';

const placeableEntities = getAllPlaceableEntityJSONFiles();

/**
 * Displays the JSON data for each zone, and provides a button to navigate between them
 * @constructor
 */
export function PlaceableEntitiesList() {
  const trs = placeableEntities.map((placeableEntity: IPlaceableEntityJSON) => {
    return (
      <tr>
        <td>{placeableEntity.id}</td>
        <td>{placeableEntity.displayName}</td>
        <td>{placeableEntity.dmg}</td>
        <td>{placeableEntity.health}</td>
        <td>{placeableEntity.speed}</td>
        <td>{placeableEntity.vision}</td>
        <td>{placeableEntity.attackSpeed}</td>
        <td>{placeableEntity.sizeInTiles}</td>
        <td>{placeableEntity.animationNames}</td>
      </tr>
    );
  });

  return (
    <table className={'editor-table'}>
      <thead>
        <tr>
          <th>id</th>
          <th>display name</th>
          <th>damage</th>
          <th>health</th>
          <th>speed</th>
          <th>vision</th>
          <th>attackSpeed</th>
          <th>sizeInTiles</th>
          <th>animationNames</th>
        </tr>
      </thead>
      <tbody>{trs}</tbody>
    </table>
  );
}
