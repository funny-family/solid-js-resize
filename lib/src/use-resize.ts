import { createEffect, createSignal, onCleanup } from 'solid-js';

type ResizePointsMap = Map<string, HTMLElement>;

/**
  @example
  {
    'n': ⬆️,
    'e': ➡️,
    's': ⬇️,
    'w': ⬅️,
    'ne': ↗️,
    'nw': ↖️,
    'se': ↘️,
    'sw': ↙️,
  }
*/
type ResizePointDirectionName = 'n' | 'e' | 's' | 'w' | 'ne' |'nw' | 'se' | 'sw'

export var useResize = () => {
  var anchorElementSignal = createSignal<HTMLElement>(null as any);

  var anchorElement = anchorElementSignal[0];
  var setAnchorElement = anchorElementSignal[1] as <T extends HTMLElement>(
    element: T
  ) => T;

  var resizePointsMap: ResizePointsMap = new Map();

  // // prettier-ignore
  // var createResizePointsMapControl = (
  //   (map: ResizePointsMap) => (
  //     <T extends any>(callback: (map: ResizePointsMap) => T) => (
  //       () => callback(map)
  //     )
  //   )
  // );

  var registerResizePoint = <T extends HTMLElement>(
    key: string,
    element: T,
    option: {
      direction:
    }
  ) => {
    resizePointsMap.set(key, element);

    element.setAttribute('data-resize-point-key', key);
  };

  var unregisterResizePoint = (key: string) => {
    var resizePoint = resizePointsMap.get(key);

    if (resizePoint == null) {
      return false;
    }

    resizePoint.removeAttribute('data-resize-point-key');

    return resizePointsMap.delete(key);
  };

  // ----------------------------------------------------------------

  var currentResizePoint: HTMLElement | null = null;

  var anchorElement_startWidth = 0;
  var anchorElement_startHeight = 0;

  var anchorElement_clientX = 0;
  var anchorElement_clientY = 0;

  var onResizeStart = (event: MouseEvent) => {
    var target = event.target! as HTMLElement;

    var anchorElementStyle = getComputedStyle(anchorElement());

    anchorElement_startWidth = parseInt(anchorElementStyle.width, 10);
    anchorElement_startHeight = parseInt(anchorElementStyle.height, 10);

    anchorElement_clientX = event.clientX;
    anchorElement_clientY = event.clientY;

    document.addEventListener('mousemove', onResize, false);

    resizePointsMap.forEach((resizePoint, key) => {
      if (target === resizePoint) {
        console.log(key, event);

        currentResizePoint = target;
      }
    });
  };

  var onResize = (event: MouseEvent) => {
    var currentResizePointStyle = getComputedStyle(currentResizePoint!);

    console.group('onResize:');
    console.log(event);
    console.log(currentResizePoint);
    console.log(currentResizePointStyle);
    console.groupEnd();

    // prettier-ignore
    anchorElement().style.width = (
      anchorElement_clientX +
      event.clientX -
      anchorElement_clientX
    ) + 'px';

    // prettier-ignore
    anchorElement().style.height = (
      anchorElement_clientY +
      event.clientY -
      anchorElement_clientY
    ) + 'px';
  };

  var onResizeEnd = (event: MouseEvent) => {
    var target = event.target! as HTMLElement;

    console.group('onResizeEnd:');
    // console.log(target);
    console.log(currentResizePoint);
    console.groupEnd();

    document.removeEventListener('mousemove', onResize, false);
  };

  // ----------------------------------------------------------------

  createEffect(() => {
    console.log({ anchorElement: anchorElement(), resizePointsMap });

    anchorElement().addEventListener('mousedown', onResizeStart, true);
    document.addEventListener('mouseup', onResizeEnd, true);
  });

  onCleanup(() => {
    anchorElement().removeEventListener('mousedown', onResizeStart, false);
    document.addEventListener('mouseup', onResizeEnd, false);
  });

  return {
    currentResizePoint,
    setAnchorElement,
    registerResizePoint,
    unregisterResizePoint,
  };
};
