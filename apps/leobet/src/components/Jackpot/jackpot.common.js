export const isNumber = val => {
	const rex = /[0-9]/;
	return rex.test(val);
};

export const takeJackItemList = ({ startPoint = 0, endPoint }) => {
	const NUMBER_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const MAX_NUMBER = NUMBER_LIST.length;

	const _start = Number(startPoint);
	const _end = Number(endPoint);

	if (_start < _end) return NUMBER_LIST.slice(_start, _end + 1);

	if (_start > _end)
		return [
			...NUMBER_LIST.slice(_start, MAX_NUMBER),
			...NUMBER_LIST.slice(0, _end + 1)
		];

	if (_start === _end) return [_end];

	return [];
};
