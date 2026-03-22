export function calculateRating(ratings) {
    if(!ratings.length) return 0;

    const sum = ratings.reduce(
        (acc, r) => acc + r.ratings,
        0
    );
    return (sum / ratings.length).toFixed(1)
}