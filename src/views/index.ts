import { MathView, EquationView, renderMath } from './MathView';
import { ImageView } from './ImageView';
import { IFrameView } from './IFrameView';
import { LinkView } from './LinkView';
import { TimeView } from './TimeView';
import { MentionView } from './Mention';
import { CodeBlockView } from './CodeBlockView';
import { FootnoteView } from './FootnoteView';
import createNodeView from './NodeView';
import WidgetView, { newWidgetView } from './WidgetView';
import { clickSelectFigure } from './utils';

export type { NodeViewProps, GetPos } from './types';

export default {
  createNodeView,
  MathView,
  EquationView,
  MentionView,
  renderMath,
  clickSelectFigure,
  ImageView,
  IFrameView,
  LinkView,
  TimeView,
  WidgetView,
  newWidgetView,
  CodeBlockView,
  FootnoteView,
};
