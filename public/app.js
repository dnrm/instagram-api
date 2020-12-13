class App {
    constructor() {
        this.response;
    }

    getData() {
        let username = document.getElementById('btn').value;
        let uri = `https://instagram.com/${username}/?__a=1`;
        console.log(uri);
        fetch(uri)
            .then(response => response.json())
            .then(data => {
                console.log(data["graphql"])
                this.response = data["graphql"];
                this.displayPFP(this.response["user"]["profile_pic_url_hd"]);
            });
    }

    displayPFP(url) {
        let parent = document.getElementsByClassName('result')[0];
        let img = document.createElement('img');
        img.src = url;
        parent.appendChild(img);
    }
}

const app = new App;