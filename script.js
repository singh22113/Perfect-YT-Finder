const API_KEY = "AIzaSyDg-8Tyg-gdwDV6jJYgdOi98HrBw2lYI";

function search() {
  const query = document.getElementById("query").value;
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "Please type something to search.";
    return;
  }

  resultsDiv.innerHTML = "Searching...";

  // Use encodeURIComponent to avoid issues with special characters
  fetch(https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=5&type=video&key=${API_KEY})
    .then(response => response.json())
    .then(data => {
      resultsDiv.innerHTML = "";
      if (!data.items || data.items.length === 0) {
        resultsDiv.innerHTML = "No videos found. Try a different search!";
        return;
      }

      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.medium.url;

        const videoCard = document.createElement("div");
        videoCard.style.margin = "15px";
        videoCard.style.display = "inline-block";
        videoCard.style.textAlign = "center";
        videoCard.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnail}" alt="${title}" style="width:300px; border-radius:10px;">
            <p>${title}</p>
          </a>
        `;
        resultsDiv.appendChild(videoCard);
      });
    })
    .catch(err => {
      resultsDiv.innerHTML = "Error fetching videos. Check console.";
      console.log("YouTube API error:", err);
    });
}
