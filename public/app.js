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

    postRequest() {
        let data = {
            client_id: '790042041543698',
            client_secret: '83a9f075689032b3c00ce421ef2ba84b',
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: 'https://dnrm-instagram-api.herokuapp.com/'
        }

        fetch('https://api.instagram.com/oauth/access_token', {
            method: "POST", 
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        });
    }
}

const app = new App;