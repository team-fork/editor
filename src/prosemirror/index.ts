import { migrateHTML } from '@curvenote/schema';
import { EditorState, Transaction } from 'prosemirror-state';
import { DOMParser as Parser } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { getSelectedViewId } from '../store/selectors';
import schema from './schema';
import { store, opts } from '../connect';
import views from '../views';
import { isEditable } from './plugins/editable';
import { addLink } from '../store/actions/utils';
import { getPlugins } from './plugins';
import { uploadAndInsertImages } from './plugins/ImagePlaceholder';

export { schema };

export function createEditorState(
  stateKey: any, content: string, version: number, startEditable: boolean,
) {
  const plugins = getPlugins(stateKey, version, startEditable);
  let state: EditorState;
  try {
    const data = JSON.parse(content);
    state = EditorState.fromJSON(
      { schema, plugins },
      { doc: data, selection: { type: 'text', anchor: 0, head: 0 } },
    );
  } catch (error) {
    const element = migrateHTML(content, document, DOMParser);
    const doc = Parser.fromSchema(schema).parse(element);
    state = EditorState.create({ doc, plugins });
  }
  return state;
}

export function createEditorView(
  dom: HTMLDivElement,
  state: EditorState,
  dispatch: (tr: Transaction) => void,
): EditorView {
  const editorView = new EditorView(dom, {
    state,
    dispatchTransaction: dispatch,
    nodeViews: {
      math(node, view, getPos) {
        return new views.MathView(node, view, getPos as () => number, true);
      },
      equation(node, view, getPos) {
        return new views.MathView(node, view, getPos as () => number, false);
      },
      image(node, view, getPos) {
        return new views.ImageView(node, view, getPos as () => number);
      },
      iframe(node, view, getPos) {
        return new views.IFrameView(node, view, getPos as () => number);
      },
      link(node, view, getPos) {
        return new views.LinkView(node, view, getPos as () => number);
      },
      cite: views.CiteView,
      button: views.newWidgetView,
      display: views.newWidgetView,
      dynamic: views.newWidgetView,
      range: views.newWidgetView,
      switch: views.newWidgetView,
      variable: views.newWidgetView,
      ...opts.nodeViews,
    },
    // This can be set in the middleware `tr.setMeta(editable, false)`
    editable: (s) => isEditable(s),
    // handleClickOn: (view, pos, node, nodePos, event, direct) => {
    // },
    handlePaste: (view, event) => {
      if (!view.hasFocus()) return true;
      return (
        addLink(view, event.clipboardData)
        || uploadAndInsertImages(view, event.clipboardData)
      );
    },
    // clipboardTextSerializer: (slice) => {},
    handleDrop: (view, event) => (
      uploadAndInsertImages(view, (event as DragEvent).dataTransfer)
    ),
    handleDoubleClick: (view: EditorView<any>, pos: number, event: MouseEvent): boolean => {
      const { viewId, stateId } = getSelectedViewId(store.getState());
      return opts.onDoubleClick(stateId, viewId, view, pos, event);
    },
  });
  return editorView;
}
