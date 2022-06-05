const sort_popularity = (mode = 'full') => ([_, a], [__, b]) => b[mode].percent - a[mode].percent;
const sort_alphabet = () => ([a], [b]) => a.localeCompare(b);

export const sort_helpers = {
    popularity: sort_popularity,
    alphabet: sort_alphabet
}