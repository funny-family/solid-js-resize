import { createEffect, createSignal, onCleanup } from 'solid-js';

type ResizePointsMap = Map<string, HTMLElement>;

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
    element: T
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

  var currentElement: HTMLElement | null = null;

  var onResizeStart = (event: MouseEvent) => {
    var target = event.target! as HTMLElement;

    document.addEventListener('mousemove', onResize, false);

    resizePointsMap.forEach((resizePoint, key) => {
      if (target === resizePoint) {
        console.log(key, event);

        currentElement = target;
      }
    });
  };

  var onResize = (event: MouseEvent) => {
    var currentElementStyle = getComputedStyle(currentElement!);

    console.group('onResize:');
    console.log(event);
    console.log(currentElement);
    console.log(currentElementStyle);
    console.groupEnd();
  };

  var onResizeEnd = (event: MouseEvent) => {
    var target = event.target! as HTMLElement;

    console.group('onResizeEnd:');
    // console.log(target);
    console.log(currentElement);
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
    currentElement,
    setAnchorElement,
    registerResizePoint,
    unregisterResizePoint,
  };
};
