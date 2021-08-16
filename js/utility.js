function stringDate(startDate) {
    date = new Date(startDate)
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date == undefined
        ? "undefined"
        : date.toLocaleDateString("en-us", options);
}