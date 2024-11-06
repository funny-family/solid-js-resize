import { createEffect, onCleanup, onMount, type JSX } from 'solid-js';
import {
  mousedown_eventName,
  mousemove_eventName,
  mouseup_eventName,
} from '../dev';

interface On {
  (type: string, listener: Function): void;
  // clearListeners(type: string): void;
}

// document.addEventListener(
//   'mousemove',
//   (event) => {
//     // console.log('mousemove');

//     mousemoveListenersMap.forEach((listener) => {
//       listener(event);
//     });
//   },
//   false
// );

// document.addEventListener(
//   'mouseup',
//   (event) => {
//     // console.log('mouseup');

//     mouseupListenersMap.forEach((listener) => {
//       listener(event);
//     });
//   },
//   false
// );

export var useResize = () => {
  var _resizableRef: HTMLElement = null as any;
  var _resizerRef: HTMLElement = null as any;

  var resizableRef: <TElement extends HTMLElement>(
    element: TElement
  ) => void = (element) => {
    _resizableRef = element;
  };

  var resizerRef: <TElement extends HTMLElement>(element: TElement) => void = (
    element
  ) => {
    _resizerRef = element;
  };

  var startClientX = 0;
  var startClientY = 0;

  var startResizableElementWidth = 0;
  var startResizableElementHeight = 0;

  var resize = () => {
    //
  };

  var onResizeStart = <TEvent extends MouseEvent>(event: TEvent) => {
    console.log(event.type);

    // prettier-ignore
    _resizableRef.style.width = (
      startResizableElementWidth +
      event.clientX -
      startClientX
    ) + 'px';

    // prettier-ignore
    _resizableRef.style.height = (
      startResizableElementHeight +
      event.clientY -
      startClientY
    ) + 'px';
  };

  var onResizeEnd = <TEvent extends MouseEvent>(event: TEvent) => {
    console.log(event.type);

    document.removeEventListener(mousemove_eventName, onResizeStart, false);
    document.removeEventListener(mouseup_eventName, onResizeEnd, false);
  };

  var initResize = <TEvent extends MouseEvent>(event: TEvent) => {
    console.log(event.type);

    startClientX = event.clientX;
    startClientY = event.clientY;

    const resizableElementStyle = getComputedStyle(_resizableRef);

    startResizableElementWidth = parseInt(resizableElementStyle.width, 10);
    startResizableElementHeight = parseInt(resizableElementStyle.height, 10);

    document.addEventListener(mousemove_eventName, onResizeStart, false);
    document.addEventListener(mouseup_eventName, onResizeEnd, false);
  };

  var resizeStartListeners = new Array<Function>();
  var resizeListeners = new Array<Function>();
  var resizeEndListeners = new Array<Function>();

  // var on = ((type, listener) => {
  //   if (type === 'resize-start') {
  //     resizeStartListeners.push(listener);
  //   }

  //   if (type === 'resize') {
  //     resizeListeners.push(listener);
  //   }

  //   if (type === 'resize-end') {
  //     resizeEndListeners.push(listener);
  //   }
  // }) as On;

  createEffect(() => {
    _resizerRef.addEventListener(mousedown_eventName, initResize, false);
  });

  onCleanup(() => {
    _resizerRef.removeEventListener(mousedown_eventName, initResize, false);
  });

  return {
    resizableRef,
    resizerRef,
    // on,
  };
};
