//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  let pageTitle = document.createElement("h1");
  pageTitle.innerText = "TV Show Project";
  rootElem.appendChild(pageTitle);

  let sectionEl = document.createElement("section");
  rootElem.appendChild(sectionEl);

  episodeList.forEach((episode) => {
    let articleEl = document.createElement("article");
    sectionEl.appendChild(articleEl);

    let titleEl = document.createElement("h2");
    let seasonCode = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    titleEl.innerText = `${episode.name} - ${seasonCode}`;
    articleEl.appendChild(titleEl);

    let imageEl = document.createElement("img");
    imageEl.src = episode.image.medium;
    imageEl.alt = `Picture of Game of Thrones - ${seasonCode}`;
    articleEl.appendChild(imageEl);

    let paraEl = document.createElement("p");
    paraEl.innerHTML = episode.summary;
    articleEl.appendChild(paraEl);
  });

  let sourceEl = document.createElement("p");
  sourceEl.innerHTML =
    'The data for this website originally comes from <a href="https://www.tvmaze.com/">TVMaze.com<a>';
  rootElem.appendChild(sourceEl);
}

window.onload = setup;

// All episodes must be shown
// For each episode, AT LEAST following must be displayed:
// the episode's name
// the season number
// the episode number
// the episode's medium-sized image
// the episode's summary text
// You should combine season number and episode number into an episode code:
// Each part should be zero-padded to two digits.
// Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be incorrect.
// Your page should state somewhere that the data has (originally) come from TVMaze.com, and link back to that site (or the specific episode on that site). See tvmaze.com/api#licensing.
