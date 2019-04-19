export const getTreeLabel = (data) => {
  if (data.parent) {
    return getTreeLabel(data.parent) + ' / ' + data.label
  }
  return data.label
}
