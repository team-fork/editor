import { State } from '../types';
export declare function getEditorView(state: State, viewId: string | null): {
    viewId: string | null;
    stateId: null;
    view: null;
} | {
    stateId: string;
    view: import("prosemirror-view").EditorView<any>;
    viewId: string;
};
export declare function getEditorState(state: State, stateKey: any | null): {
    key: any;
    state: import("prosemirror-state").EditorState<import("prosemirror-model").Schema<"paragraph" | "display" | "dynamic" | "range" | "switch" | "button" | "variable" | "math" | "equation" | "cite" | "cite_group" | "aside" | "callout" | "iframe" | "ordered_list" | "bullet_list" | "list_item" | "doc" | "text" | "heading" | "blockquote" | "code_block" | "image" | "horizontal_rule" | "hard_break" | "time", "link" | "code" | "em" | "strong" | "superscript" | "subscript" | "strikethrough" | "underline" | "abbr">>;
    viewIds: string[];
    counts: import("./utils").StateCounter;
} | {
    key: null;
    state: null;
    viewIds: never[];
    counts: null;
};
