import { type Component } from 'solid-js';
import { useResize } from '@lib/index';

export var Section1: Component = () => {
  var resize = useResize();

  return (
    <section>
      <h1>Section 1:</h1>
      <div class="resizer-container">
        <div
          class="box"
          ref={(element) => {
            resize.resizableRef(element);
          }}
        >
          resize me "both"
        </div>
        <div
          class="resizer-container__resizer resizer resizer_se"
          ref={(element) => {
            // resize.resizerRef(element);
          }}
        />
        <div
          class="resizer-container__resizer resizer resizer_se"
          style={{ top: 0 }}
          ref={(element) => {
            resize.resizerRef(element);
          }}
        />
      </div>
    </section>
  );
};
