const sort_popularity = ([_, a], [__, b]) => b.full.percent - a.full.percent;
const sort_alphabet = ([a], [b]) => a.localeCompare(b);

export const sort_helpers = {
    popularity: sort_popularity,
    alphabet: sort_alphabet
}