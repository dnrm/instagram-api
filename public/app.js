class App {
    constructor() {
        this.response;
        this.urls;
        this.post;
        this.json;
    }

    getData() {
        this.clear()
        let username = document.getElementById('btn').value;
        fetch(`https://dnrm-instagram-api.herokuapp.com/db/${username}`)
            .then(() => console.log('Successfully tracked'))
            .catch(() => console.log('Error sending request to server'));
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

    analyzeJson() {
        this.clear();
        let json = document.getElementById('json').value;
        json = JSON.stringify(json);

        this.urls = json.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g);
        this.urls.forEach(item => {
            let img = document.createElement('img');
            if (item.slice(0, 1) == 'h') {
                img.src = item;
            } else {
                img.src = `https://instagram.com${item}`;
            }
            document.getElementsByClassName('result')[0].appendChild(img);
        })

        this.json = JSON.parse(document.getElementById('json').value);
        console.log(this.json)

        fetch(`https://dnrm-instagram-api.herokuapp.com/json/db/${this.json.graphql.user.username}/${this.json.graphql.user.biography}`);
    }

    clear() {
        document.getElementsByClassName('result')[0].innerHTML = '';
    }
}

const app = new App;