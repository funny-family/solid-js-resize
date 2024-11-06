import { type Component } from 'solid-js';

export var Section3: Component = () => {
  return (
    <section>
      <h1>Section 3 (native resize):</h1>
      <div class="resizer-container" style={{ position: 'static' }}>
        <div
          class="box"
          style={{ width: '300px', height: '300px', resize: 'both' }}
        >
          resize me "both"
        </div>
      </div>
    </section>
  );
};
