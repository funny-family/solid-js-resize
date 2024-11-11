import { useResize } from '../../../../lib/src/use-resize';

export var Section4 = () => {
  var resizer = useResize();
  window.resizer = resizer;

  return (
    <section>
      <h1>Section4</h1>
      <div>
        <div
          class="box"
          style={{ position: 'relative' }}
          ref={(element) => {
            resizer.setAnchorElement(element);
          }}
        >
          <div>resize me!</div>

          <div
            class="resizer-container__resizer resizer"
            style={{
              'top': 0,
              'block-size': '6px',
              'inline-size': '100%',
              'background-color': 'pink',
              'cursor': 'ns-resize',
            }}
            ref={(element) => {
              resizer.registerResizePoint('5', element);
            }}
          />

          <div
            class="resizer-container__resizer resizer"
            style={{
              'block-size': '6px',
              'inline-size': '100%',
              'background-color': 'violet',
              'cursor': 'ns-resize',
            }}
            ref={(element) => {
              resizer.registerResizePoint('6', element);
            }}
          />

          <div
            class="resizer-container__resizer resizer"
            style={{
              'block-size': '6px',
              'inline-size': '100%',
              'background-color': 'magenta',
              'writing-mode': 'vertical-lr',
              'cursor': 'ew-resize',
            }}
            ref={(element) => {
              resizer.registerResizePoint('7', element);
            }}
          />

          <div
            class="resizer-container__resizer resizer"
            style={{
              'left': 0,
              'block-size': '6px',
              'inline-size': '100%',
              'background-color': 'darkslategrey',
              'writing-mode': 'vertical-lr',
              'cursor': 'ew-resize',
            }}
            ref={(element) => {
              resizer.registerResizePoint('8', element);
            }}
          />

          {/* ------------------------------------------------------------ */}

          <div
            class="resizer-container__resizer resizer"
            style={{
              cursor: 'nwse-resize',
            }}
            ref={(element) => {
              resizer.registerResizePoint('1', element);
            }}
          />

          <div
            class="resizer-container__resizer resizer"
            style={{
              'top': 0,
              'background-color': 'green',
              'cursor': 'nesw-resize',
            }}
            ref={(element) => {
              resizer.registerResizePoint('2', element);
            }}
          />

          <div
            class="resizer-container__resizer resizer"
            style={{
              'top': 0,
              'left': 0,
              'background-color': 'yellow',
              'cursor': 'nwse-resize',
            }}
            ref={(element) => {
              resizer.registerResizePoint('3', element);
            }}
          />

          <div
            class="resizer-container__resizer resizer"
            style={{
              'left': 0,
              'background-color': 'blue',
              'cursor': 'nesw-resize',
            }}
            ref={(element) => {
              resizer.registerResizePoint('4', element);
            }}
          />
        </div>
      </div>
    </section>
  );
};
