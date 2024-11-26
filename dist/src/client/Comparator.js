import { isNull, isNotNull, stringify } from './utils';
export const check = {
    isLike: (entry, value) => stringify(entry).indexOf(stringify(value)) > -1,
    isNotLike: (entry, value) => stringify(entry).indexOf(stringify(value)) === -1,
    startsWith: (entry, value) => stringify(entry).startsWith(stringify(value)),
    endsWith: (entry, value) => stringify(entry).endsWith(stringify(value)),
    isEqualTo: (entry, value) => stringify(entry) === stringify(value),
    isNotEqualTo: (entry, value) => stringify(entry) !== stringify(value),
    isGreaterThan: (entry, value) => isNull(entry) ? false : (entry > value),
    isGreaterThanOrEqualTo: (entry, value) => isNull(entry) ? false : (entry >= value),
    isLessThan: (entry, value) => isNull(entry) ? false : (entry < value),
    isLessThanOrEqualTo: (entry, value) => isNull(entry) ? false : (entry <= value),
    isBetween: (entry, [min, max]) => isNull(entry) ? false : (entry >= min && entry <= max),
    isStrictlyBetween: (entry, [min, max]) => isNull(entry) ? false : (entry > min && entry < max),
    isTrue: (entry, _) => entry === true,
    isFalse: (entry, _) => entry === false,
    isNull: (entry, _) => isNull(entry),
    isNotNull: (entry, _) => isNotNull(entry),
    whereIn: (entry, criteria = []) => {
        if (isNull(entry))
            return false;
        if (criteria.length === 0)
            return false;
        for (const { value, check } of criteria) {
            if (check(entry, value)) {
                return true;
            }
        }
        return false;
    },
    match: (entry, pattern) => {
        const match = pattern.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/);
        const regex = match ? new RegExp(match[2], match[3]
            .split('')
            .filter((char, pos, flagArr) => flagArr.indexOf(char) === pos)
            .join(''))
            : new RegExp(pattern);
        return stringify(entry).match(regex) ? true : false;
    }
};
