// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  let directors = moviesArray.map(movie => movie.director);
  let cleanedDirectorsArray = [];

  for (i = 0; i < directors.length; i++) {
    let currentDirector = directors[i];

    if (!cleanedDirectorsArray.includes(currentDirector)) {
      cleanedDirectorsArray.push(currentDirector);
    }
  }

  return cleanedDirectorsArray;  // satisfies bonus requirement
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  let result = moviesArray.filter(movie => {
    return (movie.director === 'Steven Spielberg' && movie.genre.includes('Drama'));
  }).length;

  return result;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) return 0;

  const sum = moviesArray.reduce((score, currentScore) => {
    if(currentScore.score) {
      return score + currentScore.score
    }
    return score;
  }, 0);
  const avg = sum / moviesArray.length;

  return Math.round(avg * 100) / 100;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {

  let dramaMoviesArray = moviesArray.filter(movie => movie.genre.includes('Drama'));

  if (dramaMoviesArray.length === 0) return 0;

  let dramaScore = dramaMoviesArray.map(movie => movie.score);

  let avgScore = dramaScore.reduce((sum, currentScore) => {
    return sum + currentScore;
  }, 0)/dramaScore.length;

  return Math.round(avgScore * 100) / 100;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const copyArray = moviesArray.slice();

  return copyArray.sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    } else {
      return a.year - b.year;
    }
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const arrayCopy = moviesArray.slice();

  let movieTitles = arrayCopy.map(movie => movie.title);

  let sortedTitles = movieTitles.sort((a, b) => a.localeCompare(b));

  return sortedTitles.length < 20 ? sortedTitles : sortedTitles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const arrCopy = moviesArray.slice();

  function timeToMinutes(timeString) {
    const timeParts = timeString.split(' ');

    let totalMinutes = 0;

    for (const part of timeParts) {
      if (part.includes('h') && parseInt(part) !== 0) {
        let hours = parseInt(part);
        totalMinutes += hours * 60;
      } else if (part.includes('min')) {
        let minutes = parseInt(part);
        totalMinutes += minutes;
      }
    }

    return totalMinutes;
  }

  return arrCopy.map(movie => {
    return { movie, duration: timeToMinutes(movie.duration) };
  })
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) return null;

  if (moviesArray.length === 1) {
    const movie = moviesArray[0]
    const year = movie.year;
    const score = movie.score;

    return `The best year was ${year} with an average score of ${score}`
  }

  const yearsAndScores = {
  }

  moviesArray.forEach(movie => {
    const yearsArr = Object.keys(yearsAndScores);
    const score = movie.score;
    const currentYear = movie.year;

    if (yearsAndScores[currentYear]) {
      yearsAndScores[currentYear].push(score);
    } else {
      yearsAndScores[currentYear] = [score];
    }
  });

  const yearArr = Object.keys(yearsAndScores);

  function sum(accumulator, currentValue) {
    return accumulator + currentValue;
  }

  const yearsAndAverages = yearArr.map((year, idx) => {
    const currentLength = yearsAndScores[year].length;
    const avgScore = yearsAndScores[year].reduce(sum) / currentLength;
    const currentYear = yearArr[idx];
    const currentObj = {};

    currentObj[currentYear] = avgScore;

    return currentObj;
  });

  const bestYear = yearsAndAverages.sort((currentYearAvg1, currentYearAvg2) => {
    if (currentYearAvg2.score !== currentYearAvg1.score) {
    return currentYearAvg2.score - currentYearAvg1.score;
    } else {
      return currentYearAvg1.year - currentYearAvg2.year;
    }
  });

  const year = Object.keys(bestYear[0]);
  const score = Object.values(bestYear[0]);

  return `The best year was ${year} with an average score of ${score}`;
}
