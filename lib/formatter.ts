import formatDuration from "format-duration";

export const formatTime = (timeInSeconds: number = 0): string => {
  return formatDuration(timeInSeconds * 1000);
};
