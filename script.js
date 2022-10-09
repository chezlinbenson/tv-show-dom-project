//You can edit ALL of the code here
let progStatus = "first";
let allEpisodes;
function setup() {
  getDataAPI("https://api.tvmaze.com/shows/5/episodes");
}

function getDataAPI(myAPI) {
  fetch(myAPI)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        console.log(response);
        return response.json();
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((jsonResponse) => {
      // do whatever you want with the JSON response
      allEpisodes = jsonResponse;
      //create elements only the first time
      if (progStatus === "first") {
        const rootElem = document.getElementById("root");
        let allShows = getAllShows().sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        // Create section below for header
        let headerEl = document.createElement("header");
        rootElem.appendChild(headerEl);
        let sectionEl = document.createElement("section");
        sectionEl.setAttribute("id", "sectionEl");
        rootElem.appendChild(sectionEl);
        setupHeader(headerEl);
        let searchBar = document.createElement("div");
        searchBar.setAttribute("id", "search__bar");
        headerEl.appendChild(searchBar);
        setupSelectShow(allShows, allEpisodes, sectionEl);
        setupSelectEpisodes(sectionEl);
        setupSearchInput(headerEl, allEpisodes, sectionEl);
        makePageForEpisodes(allEpisodes);
        setupPageCredits(rootElem);
        progStatus = "other";
      } else {
        let showsCount = document.getElementById("showsCount");
        showsCount.textContent = allEpisodes.length;
        makePageForEpisodes(allEpisodes);
      }
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

function setupSelectShow(allShows, allEpisodes, sectionEl) {
  let selectShowEl = document.createElement("select");
  selectShowEl.setAttribute("id", "select__show");
  let searchBar = document.getElementById("search__bar");
  searchBar.appendChild(selectShowEl);

  let selectOptShow = document.createElement("option");
  selectOptShow.text = "Select for all shows.";
  selectShowEl.add(selectOptShow);
  allShows.forEach((el, inx) => {
    let selectOptShow = document.createElement("option");
    selectOptShow.text = allShows[inx].name;
    selectOptShow.value = inx;
    selectShowEl.add(selectOptShow);
  });

  selectShowEl.addEventListener("change", function () {
    if (this.value === "Select for all shows.") {
      makePageForEpisodes(allEpisodes);
    } else {
      let SHOW_ID = allShows[this.value].id;
      let showUrl = `https://api.tvmaze.com/shows/${SHOW_ID}/episodes`;
      let selectEl = document.getElementById("select__episodes");
      selectEl.options.length = 0;
      getDataAPI(showUrl);
    }
  });
}

function setupSelectEpisodes(sectionEl) {
  let selectEl = document.createElement("select");
  selectEl.setAttribute("id", "select__episodes");
  let searchBar = document.getElementById("search__bar");
  searchBar.appendChild(selectEl);

  selectEl.addEventListener("change", function () {
    if (this.value === "Select for all episodes.") {
      selectEl.options.length = 0;
      makePageForEpisodes(allEpisodes);
    } else {
      let singleArr = [];
      singleArr.push(allEpisodes[this.value]);
      console.log(singleArr); //[this.value]);
      makePageForEpisodes(singleArr);
    }
  });
}

function setupSearchInput(headerEl, episodeList, sectionEl) {
  // Create search bar below.

  let searchInput = document.createElement("input");
  searchInput.setAttribute("id", "input__field");
  searchInput.type = "text";
  searchInput.placeholder = "Search";
  let searchLabel = document.createElement("label");
  searchLabel.setAttribute("id", "label");
  let epCount = episodeList.length;
  let showsCount = episodeList.length;
  searchLabel.innerHTML = `Displaying <span id="epCount">${epCount}</span> / <span id="showsCount"> ${showsCount}</span> episodes`;
  let searchBar = document.getElementById("search__bar");
  searchBar.appendChild(searchInput);
  searchBar.appendChild(searchLabel);

  searchInput.addEventListener("input", function () {
    makePageForEpisodes(
      allEpisodes.filter((episode) => {
        let input = searchInput.value;
        return (
          episode.name.toUpperCase().includes(input.toUpperCase()) ||
          episode.summary.toUpperCase().includes(input.toUpperCase())
        );
      })
    );
  });
}

function makePageForEpisodes(episodeList) {
  // Clear screen
  let sectionEl = document.getElementById("sectionEl");
  while (sectionEl.firstChild) {
    sectionEl.removeChild(sectionEl.firstChild);
  }

  let showsCount = document.getElementById("showsCount");
  // showsCount.textContent =
  // console.log("Look here!!", allShows[this.value]);

  //change searchLabel to correct amount
  let selectEl = document.getElementById("select__episodes");
  //add my 2 options and event listener
  let selectOption = document.createElement("option");
  selectOption.text = "Select for all episodes.";
  selectEl.add(selectOption);

  let countEp = document.getElementById("epCount");
  countEp.textContent = episodeList.length;

  if (!episodeList.length) {
    sectionEl.innerText = "No Videos to Show";
  }

  console.log("Episode List", episodeList);

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

    if (episode.image === null || !episode.image.medium) {
      imageError = document.createElement("p");
      imageError.textContent = "No Image Available";
      articleEl.appendChild(imageError);
    } else {
      let imageEl = document.createElement("img");
      imageEl.src = episode.image.medium;
      imageEl.alt = `Picture of episode - ${seasonCode}`;
      articleEl.appendChild(imageEl);
    }

    let paraEl = document.createElement("p");
    if (!episode.summary) {
      paraEl.innerHTML = "Episode Summary Not Available";
    } else {
      paraEl.innerHTML = episode.summary;
    }

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
