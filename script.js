const repositoryList = document.querySelector("#repositories");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  for (const repository of repositories) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const owner = document.createElement("span");
    const description = document.createElement("p");
    const starredDate = document.createElement("span");

    link.href = repository.url;
    link.textContent = repository.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    owner.className = "repository-owner";
    owner.textContent = ` by ${repository.owner}`;

    description.className = "repository-description";
    description.textContent = repository.description;

    starredDate.className = "starred-date";
    starredDate.textContent = `Starred ${repository.starred_at}`;

    item.append(link, owner, description, starredDate);
    repositoryList.append(item);
  }
}

fetch("./events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to load starred repositories (${response.status}).`);
    }
    return response.json();
  })
  .then(renderRepositories)
  .catch((error) => {
    console.error(error);
    repositoryList.replaceChildren();
    const message = document.createElement("li");
    message.textContent = "Starred repositories could not be loaded.";
    repositoryList.append(message);
  });
