import CanvasDrawerInstance from '../helpers/CanvasDrawerInstance';

const drawers = new Map<string, CanvasDrawerInstance>();

type CanvasDrawerInstanceDeleter = () => void;

export const useCanvas = (
  id: string
): [CanvasDrawerInstance, CanvasDrawerInstanceDeleter] => {
  let instance = drawers.get(id);
  if (!instance) {
    const newInstance = new CanvasDrawerInstance(id);
    drawers.set(id, newInstance);
    instance = newInstance;
  }
  const deleter = () => {
    drawers.delete(id);
  };
  return [instance, deleter];
};
