export const max = (arr, select = undefined) => {
    return Math.max(...((select && arr.map(select)) || arr));
};