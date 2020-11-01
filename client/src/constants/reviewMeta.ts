export const reviewMeta = {
  difficulty: [
    { value: 1, label: 'Very Easy' },
    { value: 2, label: 'Easy' },
    { value: 3, label: 'Medium' },
    { value: 4, label: 'Hard' },
    { value: 5, label: 'Very Hard' },
  ],
  rating: [
    { value: 1, label: 'Strongly Disliked' },
    { value: 2, label: 'Disliked' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Liked' },
    { value: 5, label: 'Strongly Liked' },
  ],
  translateDifficulty(value: number): string {
    return this.translate(value, 'difficulty');
  },
  translateRating(value: number): string {
    return this.translate(value, 'rating');
  },
  translate(value: number, key: 'difficulty' | 'rating'): string {
    return this[key].find((other) => other.value === value)!.label;
  },
};
