import CanvasDrawerInstance from '../helpers/CanvasDrawerInstance';

const drawers = new Map<string, CanvasDrawerInstance>();

export const useCanvas = (id: string, del?: boolean) => {
  if (!drawers.has(id)) drawers.set(id, new CanvasDrawerInstance(id));
  if (del) drawers.delete(id);
  return drawers.get(id);
};
