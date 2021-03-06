import React, {useState} from 'react';
import zonesJSONData from '../../data/json/zones.json';
import {useForm} from '../Components/__Shared/Form/useForm';
import {createNewZoneRequest} from './editorRequests/createNewZoneRequest';

function NewZoneForm(props: {onClose: () => void; handleSubmit: (formState: Record<string, string>) => void}) {
  const {submit, generateFields} = useForm();

  return (
    <div>
      <form>
        {generateFields([
          {
            name: 'act',
            type: 'number'
          },
          {
            name: 'chapter',
            type: 'number'
          },
          {
            name: 'numCols',
            type: 'number'
          },
          {
            name: 'numRows',
            type: 'number'
          }
        ])}
        <button {...submit(props.handleSubmit)}>Submit</button>
      </form>
      <button
        onClick={() => {
          props.onClose();
        }}
      >
        Cancel
      </button>
    </div>
  );
}

/**
 * Displays the JSON data for each zone, and provides a button to navigate between them
 * @param props
 * @constructor
 */
export function ZoneList(props: {onZoneNav: (act: number, chapter: number) => void; onCreateNewZone: () => void}) {
  const [isNewZoneFormOpen, setIsNewZoneFormOpen] = useState(false);

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

  if (isNewZoneFormOpen) {
    return (
      <NewZoneForm
        handleSubmit={(formState) => {
          createNewZoneRequest({
            act: +formState.act,
            chapter: +formState.chapter,
            numRows: +formState.numRows,
            numCols: +formState.numCols
          });
        }}
        onClose={() => {
          setIsNewZoneFormOpen(false);
        }}
      />
    );
  } else {
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

        <button
          onClick={() => {
            setIsNewZoneFormOpen(true);
          }}
        >
          Create new zone
        </button>
      </table>
    );
  }
}
