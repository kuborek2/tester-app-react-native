let results = [{
    "nick": "Nick",
    "score": "Score",
    "total": "Total",
    "type": "Type",
    "date": "Date" }, 
    {
    "nick": "Marek",
    "score": 18,
    "total": 20,
    "type": "history",
    "date": "2018-11-12"}, 
    {
    "nick": "Robert",
    "score": 12,
    "total": 20,
    "type": "Math",
    "date": "2018-10-11"
    }]

const pushToResults = (obj) => {
    results.push(obj)
}

const worker = {
  results,
  pushToResults,
};

module.exports = worker;
