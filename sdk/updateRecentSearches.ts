export const updateRecentSearches = (search: string) => {
  if (!search) {
    return;
  }
  const recentSearches = JSON.parse(
    localStorage.getItem("recentSearches") || "[]"
  );
  if (!recentSearches.includes(search)) {
    // maintain only the last 7 searches
    if (recentSearches.length >= 7) {
      recentSearches.shift();
    }
    recentSearches.push(search);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }
};
