import React, {useEffect, useState} from 'react';
import {useForm} from '../Components/__Shared/Form/useForm';
import {createNewZoneRequest} from './editorRequests/createNewZoneRequest';
import {getZones} from './editorRequests/getZones';
import {createZone} from '../../data/config/zones/utils/createZone';
import {populateGlobalZoneConfig} from '../../data/config/zones/zoneConfig';
import {deleteZone} from './editorRequests/deleteZone';

function NewZoneForm(props: {onClose: () => void; handleSubmit: (formState: Record<string, string>) => void}) {
  const {submit, generateFields} = useForm();

  return (
    <div>
      <form>
        {generateFields({
          fields: [
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
          ]
        })}
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
  const [zones, setZones] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    getZones().then((zones) => {
      setZones(zones);
    });
  }, [isNewZoneFormOpen, fetchCount]);

  const trs = zones.map((zone: {act: number; chapter: number; description: string; id: string}) => {
    return (
      <tr key={`${zone.act}-${zone.chapter}`}>
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
        <td>
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to delete ${zone.id}?`)) {
                deleteZone(zone.id).then((res) => {
                  if (res.status === 'OK') {
                    alert(`deleted successfully ${zone.id}`);
                    setFetchCount(fetchCount + 1);
                  } else {
                    alert(`Could not delete ${zone.id}`);
                  }
                });
              }
            }}
          >
            &times;
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
          }).then((res) => {
            if (res.status === 'OK') {
              // dynamically extend the game config to include the new zone
              // this is usually done in build time, but when using the editor we must do it in runtime
              const ZONE = createZone(res.data.zoneJSON.id, res.data.tileMapJSON.tileMap, res.data.zoneJSON);
              populateGlobalZoneConfig(ZONE);
              setIsNewZoneFormOpen(false);
            }
          });
        }}
        onClose={() => {
          setIsNewZoneFormOpen(false);
        }}
      />
    );
  } else {
    return (
      <div>
        <table className={'editor-table'}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Zone ID</th>
              <th>Act</th>
              <th>Chapter</th>
              <th>Nav</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{trs}</tbody>
        </table>
        <button
          onClick={() => {
            setIsNewZoneFormOpen(true);
          }}
        >
          Create new zone
        </button>
      </div>
    );
  }
}
