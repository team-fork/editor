import { State } from '../types';
import { opts } from '../../connect';
import { getEditor } from '../state/selectors';

export function getEditorUI(state: State) {
  return state.editor.ui;
}

export function getSelectedEditorAndViews(state: State) {
  const { stateId } = getEditorUI(state);
  return getEditor(state, stateId);
}

export function isEditorViewFocused(state: State, stateKey: any | null, viewId: string) {
  if (stateKey == null) return null;
  const stateId = opts.transformKeyToId(stateKey);
  const { ui } = state.editor;
  return (
    ui.stateId === stateId
    && ui.viewId === viewId
    && ui.focused
  );
}
