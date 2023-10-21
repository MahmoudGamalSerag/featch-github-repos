let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");


getButton.onclick = function () {
    getRepos();
};

function getRepos() {

    if (theInput.value == "") {
        reposData.innerHTML = "<span>Please Write Github Username</span>"
    }
    else {
        feachRepos();
    }
}


function feachRepos() {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)

        .then((response) => response.json())
        .then((reposatories) => {
            reposData.innerHTML = '';
            createData(reposatories);
        });
}


function createData(reposatories) {
    reposatories.forEach(repo => {
        let mainDiv = document.createElement("div");
        let repoName = document.createTextNode(repo.name);
        mainDiv.appendChild(repoName);

        let theUrl = document.createElement("a");
        let urlText = document.createTextNode("visit");
        theUrl.appendChild(urlText);
        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
        theUrl.setAttribute('target', '_blank');
        mainDiv.appendChild(theUrl);
        let starsSpan = document.createElement('span');
        let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
        starsSpan.appendChild(starsText);
        mainDiv.appendChild(starsSpan);
        mainDiv.className = `repo-box`;

        reposData.appendChild(mainDiv);
    });
}