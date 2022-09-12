//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

const rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  // Create section below for header.
  let headerEl = document.createElement("header");
  rootElem.appendChild(headerEl);

  // Create page title below
  let pageTitle = document.createElement("h1");
  pageTitle.innerText = "TV Show Project";
  headerEl.appendChild(pageTitle);

  // Create search bar below.
  let searchBar = document.createElement("div");
  let searchInput = document.createElement("input");
  searchInput.setAttribute("id", "input__field");
  searchInput.type = "text";
  searchInput.placeholder.innerHTML = "search";
  let searchLabel = document.createElement("label");
  searchLabel.setAttribute("id", "label");
  searchLabel.innerText = "Displaying 10/73 episodes";

  searchBar.appendChild(searchInput);
  searchBar.appendChild(searchLabel);
  headerEl.appendChild(searchBar);

  searchInput.addEventListener("input", function () {
    makePageForEpisodes(
      episodeList.filter((episode) => {
        let input = searchInput.value;
        return episode.name.includes(input) || episode.summary.includes(input);
      })
    );
  });

  // Create section to hold episode articles
  let sectionEl = document.createElement("section");
  rootElem.appendChild(sectionEl);

  //Display Episodes
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

  // Create website reference link.
  let sourceEl = document.createElement("p");
  sourceEl.innerHTML =
    'The data for this website originally comes from <a href="https://www.tvmaze.com/">TVMaze.com<a>';
  rootElem.appendChild(sourceEl);
}

window.onload = setup;

// Complete all requirements from Level 100
// Add a "live" search input:
// Only episodes whose summary OR name contains the search term should be displayed
// The search should be case-insensitive
// The display should update immediately after each keystroke changes the input.
// Display how many episodes match the current search
// If the search box is cleared, all episodes should be shown.
// If you have been fetching the episode data from the API, be careful not to cause many frequent requests with this search feature. The search should look through an in-memory copy of the episode list. Do not fetch the data again each time something is typed!
