// {
//     <button id="get">Get</button>
//     <button id="post">Post</button>
// }

const get = document.getElementById('get');
const post = document.getElementById('post');


const get = document.getElementById('get');
const post = document.getElementById('post');

get.addEventListener('click', () => {
    fetch('http://localhost:5000/movies').then(res => res.json()).then(resData => console.log(resData)).catch(err => console.log(err));
});

post.addEventListener('click', () => {
    fetch('http://localhost:5000/movies/postmovie', {
        method: 'POST',
        body: JSON.stringify({
            title: "Sample",
            cover: "Sample",
            description: "Sample",
            genres: ["Sample", "Sample", "Sample"],
            actors: ["Sample", "Sample", "Sample"],
            rating: 1,
            year: 2021
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(resData => console.log(resData)).catch(err => console.log(err));
});