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
  };

  var unregisterResizePoint = (key: string) => {
    resizePointsMap.delete(key);

    // element.setAttribute('data-resize-point-key', key);
  };

  var onMousedown = (event: MouseEvent) => {
    var target = event.target! as HTMLElement;

    resizePointsMap.forEach((resizePoint, key) => {
      if (target === resizePoint) {
        console.log(key, event);
      }
    });
  };

  createEffect(() => {
    console.log({ anchorElement: anchorElement(), resizePointsMap });

    anchorElement().addEventListener('mousedown', onMousedown, true);
  });

  onCleanup(() => {
    anchorElement().removeEventListener('mousedown', onMousedown, false);
  });

  return {
    setAnchorElement,
    registerResizePoint,
    unregisterResizePoint,
  };
};
