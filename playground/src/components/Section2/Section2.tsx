import { type Component } from 'solid-js';
import { useResize } from '@lib/index';

export var Section2: Component = () => {
  var resize = useResize();

  return (
    <section>
      <h1>Section 2:</h1>
      <div class="resizer-container">
        <div
          class="box"
          style={{ width: '300px', height: '300px' }}
          ref={(element) => {
            resize.resizableRef(element);
          }}
        >
          resize me "both"
        </div>
        <div
          class="resizer-container__resizer resizer resizer_se"
          ref={(element) => {
            resize.resizerRef(element);
          }}
        />
      </div>
    </section>
  );
};
