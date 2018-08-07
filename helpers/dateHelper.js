const addDays = (date, days) => {
    let result = new Date
    return result.setDate(date.getDate() + days)
}

const diffDays = (date2, date1) => {
    var timeDiff = date2.getTime() - date1.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

module.exports = { addDays, diffDays }