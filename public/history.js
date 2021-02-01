window.onload = () => {
    let div = document.getElementById('usernames');
    fetch('https://api.danielmedina.dev/v1/usernames')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                let el = document.createElement('p');
                el.innerHTML = element["content"];
                div.append(el);
            });
        })
}