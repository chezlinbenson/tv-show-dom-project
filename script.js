//You can edit ALL of the code here
function setup() {
  fetch("https://api.tvmaze.com/shows/5/episodes")
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((jsonResponse) => {
      // do whatever you want with the JSON response
      const allEpisodes = jsonResponse;
      const rootElem = document.getElementById("root");

      // Create section below for header
      let headerEl = document.createElement("header");
      rootElem.appendChild(headerEl);
      let sectionEl = document.createElement("section");
      rootElem.appendChild(sectionEl);
      setupHeader(headerEl);
      setupSearchInput(headerEl, allEpisodes, sectionEl);
      setupSelectEpisodes(allEpisodes, sectionEl);
      makePageForEpisodes(allEpisodes, sectionEl);

      setupPageCredits(rootElem);
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });
}

function setupHeader(headerEl) {
  // Create page title below
  let pageTitle = document.createElement("h1");
  pageTitle.innerText = "TV Show Project";
  headerEl.appendChild(pageTitle);
}

function setupSearchInput(headerEl, episodeList, sectionEl) {
  // Create search bar below.
  let searchBar = document.createElement("div");
  searchBar.setAttribute("id", "search__bar");
  let searchInput = document.createElement("input");
  searchInput.setAttribute("id", "input__field");
  searchInput.type = "text";
  searchInput.placeholder.innerHTML = "search";
  let searchLabel = document.createElement("label");
  searchLabel.setAttribute("id", "label");
  let epCount = episodeList.length;
  searchLabel.innerHTML = `Displaying <span id="epCount">${epCount}</span>/ ${episodeList.length} episodes`;

  searchBar.appendChild(searchInput);
  searchBar.appendChild(searchLabel);
  headerEl.appendChild(searchBar);

  searchInput.addEventListener("input", function () {
    makePageForEpisodes(
      episodeList.filter((episode) => {
        let input = searchInput.value;
        return (
          episode.name.toUpperCase().includes(input.toUpperCase()) ||
          episode.summary.toUpperCase().includes(input.toUpperCase())
        );
      }),
      sectionEl
    );
  });
}

function setupSelectEpisodes(allEpisodes, sectionEl) {
  let selectEl = document.createElement("select");
  selectEl.setAttribute("id", "select__episodes");
  let searchBar = document.getElementById("search__bar");
  searchBar.appendChild(selectEl);

  let selectOption = document.createElement("option");
  selectOption.text = "Select for all episodes.";
  selectEl.add(selectOption);

  selectEl.addEventListener("change", function () {
    if (this.value === "Select for all episodes.") {
      makePageForEpisodes(allEpisodes, sectionEl);
    } else {
      let singleArr = [];
      singleArr.push(allEpisodes[this.value]);
      makePageForEpisodes(singleArr, sectionEl);
    }
  });
}

function makePageForEpisodes(episodeList, sectionEl) {
  // Clear screen
  while (sectionEl.firstChild) {
    sectionEl.removeChild(sectionEl.firstChild);
  }

  //change searchLabel to correct amount
  let countEp = document.getElementById("epCount");
  countEp.textContent = episodeList.length;

  if (!episodeList.length) {
    sectionEl.innerText = "No Videos to Show";
  }

  //Display Episodes
  episodeList.forEach((episode, inx) => {
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

    let selectOption = document.createElement("option");
    selectOption.text = `${episode.name} - ${seasonCode}`;
    selectOption.value = inx;
    let selectEl = document.getElementById("select__episodes");
    selectEl.add(selectOption);
  });
}

function setupPageCredits(rootElem) {
  // Create website reference link.
  let sourceEl = document.createElement("p");
  sourceEl.innerHTML =
    'The data for this website originally comes from <a href="https://www.tvmaze.com/">TVMaze.com<a>';
  rootElem.appendChild(sourceEl);
}

window.onload = setup;
