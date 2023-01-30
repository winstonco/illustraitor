import CanvasDrawerInstance from '../../../helpers/CanvasDrawerInstance';

const drawers = new Map<string, CanvasDrawerInstance>();

export const useCanvas = (id: string) => {
  if (!drawers.has(id)) drawers.set(id, new CanvasDrawerInstance(id));
  return drawers.get(id);
};
