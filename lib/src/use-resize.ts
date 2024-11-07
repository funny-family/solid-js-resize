import { createEffect, createSignal } from 'solid-js';

type ResizePointsMap = Map<string, HTMLElement>;

export var useResize = () => {
  var anchorElementSignal = createSignal<HTMLElement>(null as any);
  var anchorElement = anchorElementSignal[0];
  var setAnchorElement = anchorElementSignal[1] as <T extends HTMLElement>(
    element: T
  ) => T;

  var resizePointsMap: ResizePointsMap = new Map();

  // prettier-ignore
  var createResizePointsMapControl = (
    (map: ResizePointsMap) => (
      <T extends any>(callback: (map: ResizePointsMap) => T) => (
        () => callback(map)
      )
    )
  );

  var addResizePoint = createResizePointsMapControl(resizePointsMap)((map) => {
    console.log(1231313, map);

    // return 1;
  });

  createEffect(() => {
    console.log({ anchorElement: anchorElement(), resizePointsMap });
  });

  return {
    setAnchorElement,
    addResizePoint,
  };
};
