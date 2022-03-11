import * as React from 'react';

export function EditorPopup(props: {children: React.ReactNode; onClose: () => void}) {
  return (
    <div id="editor-popup">
      <div id="editor-popup__actions">
        <div id="editor-close" onClick={props.onClose}>
          &times;
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
