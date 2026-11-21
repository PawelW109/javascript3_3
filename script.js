const CORSPROXY_API_KEY = "f14ec467";
const GIPHY_API_KEY = "UreA5U9CKBN0iC69rWrD2vauHwCszg5d";

(function() {
  const cw1 = document.getElementById('cw1')
  const cw1t = document.getElementById('cw1t')

  cw1.addEventListener("click", async function() {

    const url = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&rating=g&_=${Date.now()}`;

    const params = new URLSearchParams({
      key: CORSPROXY_API_KEY,
      url: url,
    })
    let response;
    try {
      response = await fetch(
        `https://corsproxy.io/?` + params
      )
      const result = await response.json();

      console.log(result);
      console.log()

      cw1t.innerHTML =  `<img src="${result.data.images.fixed_width.url}" alt="gif">`;

    } catch (error) {
      cw1t.innerHTML =  `Bład przy pobieraniu danych`;
    }

  })


  const cw2 = document.getElementById('cw2')
  const cw2t = document.getElementById('cw2t')
  const cw2n = document.getElementById('cw2n')

  cw2.addEventListener("click", async function() {
    const text = encodeURIComponent(cw2n.value);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&rating=g&q=${text}&limit=9`;

    const params = new URLSearchParams({
      key: CORSPROXY_API_KEY,
      url: url,
    })
    let response;
    try {
      response = await fetch(
        `https://corsproxy.io/?` + params
      )

      const result = await response.json();
      console.log(result)

      let text = "<table>";
      let n = 0;

      result.data.forEach(gif => {
        if(n % 3 == 0){
          text += "<tr>";
        }
        text += `<td><img src=${gif.images.fixed_width.url}></td>`; 
        if(n % 3 == 2){
          text += "<tr/>";
        }
        n++;
        console.log(gif)
      });
      text += "<table/>"

      console.log(result);
      console.log()

      cw2t.innerHTML = text;
    } catch (error) {
      console.log(error)
      cw2t.innerHTML =  `Bład przy pobieraniu danych`;
    }


  })


})();
