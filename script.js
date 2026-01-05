const API_KEY = "AIzaSyDg-8Tyg-gdwDV6jJYgdOi98HrBw2lY1YI";

function search() {
  const query = document.getElementById("query").value;
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "Please type something to search.";
    return;
  }

  resultsDiv.innerHTML = "Searching...";

  fetch(https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=5&type=video&key=${API_KEY})
    .then(response => response.json())
    .then(data => {
      resultsDiv.innerHTML = ""; // clear previous results
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.medium.url;

        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnail}" alt="${title}">
            <p>${title}</p>
          </a>
        `;
        resultsDiv.appendChild(videoCard);
      });
    })
    .catch(err => {
      resultsDiv.innerHTML = "Error fetching videos.";
      console.log(err);
    });
}
