import React from 'react';
import zonesJSONData from '../../data/json/zones.json';

/**
 * Displays the JSON data for each zone, and provides a button to navigate between them
 * @param props
 * @constructor
 */
export function ZoneList(props: {onZoneNav: (act: number, chapter: number) => void}) {
  const trs = zonesJSONData.map((zone: {act: number; chapter: number; description: string; id: string}) => {
    return (
      <tr>
        <td>{zone.description}</td>
        <td>{zone.id}</td>
        <td>{zone.act}</td>
        <td>{zone.chapter}</td>
        <td>
          <button
            onClick={() => {
              props.onZoneNav(zone.act, zone.chapter);
            }}
          >
            Go
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Zone ID</th>
          <th>Act</th>
          <th>Chapter</th>
          <th>Nav</th>
        </tr>
      </thead>
      <tbody>{trs}</tbody>
    </table>
  );
}
