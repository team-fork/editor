import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EditorActionTypes } from './types';
import { AppThunk } from '../types';
export declare function initEditorState(stateKey: any, editable: boolean, content: string, version: number): EditorActionTypes;
export declare function updateEditorState(stateKey: any, viewId: string | null, editorState: EditorState): EditorActionTypes;
export declare function applyProsemirrorTransaction(stateKey: any, tr: Transaction): AppThunk<boolean>;
export declare function subscribeView(stateKey: any, viewId: string, view: EditorView): EditorActionTypes;
export declare function unsubscribeView(stateKey: any, viewId: string): EditorActionTypes;
