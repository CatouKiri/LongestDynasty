
// B. Longest Reining Dynasty
function convertYear(year) {
  let romanValues = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let convertedYear= 0;
  let i = 0;

  while (i < year.length) {
    if (i + 1 < year.length && romanValues[year.substring(i, i + 2)]) {
      convertedYear += romanValues[year.substring(i, i + 2)];
      i += 2;
    } else {
      convertedYear += romanValues[year.charAt(i)];
      i++;
    }
      romanValues = Object.fromEntries(Object.entries(romanValues).slice(1));
  }
    // If passed roman number in convertYear() is invalid, return the word "Invalid" instead of the year
  if(isNaN(convertedYear)) {
      convertedYear = "Invalid";
  }
  
  // console.log(convertedYear);
  return convertedYear;
}

function longestDynasty(dynastyReign) {
  // If dynastyReign is empty return "No Data"
  if (dynastyReign.length === 0) {
    return "No Data";
  }

  let longestDuration = 0;
  let longestDynastyName = "";

  for (let i = 0; i < dynastyReign.length; i++) {
    let dynasty = dynastyReign[i];
    let dynastyName = Object.keys(dynasty)[0];
    let endOfReign = dynasty[dynastyName];
    let endOfReignYear = convertYear(endOfReign);
    let duration = 0;
      // Remove entries with invalid roman numerals (year of end of reign)
    if (endOfReignYear !== "Invalid") {
      // Starting year is year 1000 (M in roman numerals)
        if(dynasty === dynastyReign[0]) {
           duration = endOfReignYear - 1000;
        }
      // The end of reign of one dynasty is the start of reign of another
        else {
            let previousDynasty = dynastyReign[i-1]
            let previousDynastyName = Object.keys(previousDynasty)[0];
            let previousEndOfReign = previousDynasty[previousDynastyName];
            let prevoiusEndOfReignYear = convertYear(previousEndOfReign);
            // console.log(prevoiusEndOfReignYear);
            duration = endOfReignYear - prevoiusEndOfReignYear;
        }
        
          if (duration > longestDuration) {
            longestDuration = duration;
            longestDynastyName = dynastyName;
          }
    }
  }
  console.log(longestDynastyName);
  return longestDynastyName;
}

let dynastyReign = [
  {"San Dynasty": "MXLI"},
  {"Viloria Dynasty": "MCCCIIII"},
  {"Tan Dynasty":"MCCCXCVIII"},
  {"Bon Dynasty": "MCDXLV"},
  {"Maiko Dynasty": "MDCLXIV"},
  {"Paul Dynasty": "MCMXLIX"},
  {"Andre Dynasty": "MMMXICX"}
];

longestDynasty(dynastyReign);
