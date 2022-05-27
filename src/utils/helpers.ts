// This is not the best solution, it is copy pasted from stack overflow
// Probably there is a good package for handling all CSV edge cases, but in this case this regex helps
/*eslint-disable */
export const regexForSplitingCSVRow =
  /(?<=")[^"]+?(?="(?:\s*?,|\s*?$))|(?<=(?:^|,)\s*?)(?:[^,"\s][^,"]*[^,"\s])|(?:[^,"\s])(?![^"]*?"(?:\s*?,|\s*?$))(?=\s*?(?:,|$))/g;
