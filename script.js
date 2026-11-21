const CORSPROXY_API_KEY = "f14ec467";
const GIPHY_API_KEY = "UreA5U9CKBN0iC69rWrD2vauHwCszg5d";

(function() {

  // Cw1

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

      cw1t.innerHTML =  `<img src="${result.data.images.fixed_width.url}" alt="gif">`;

    } catch (error) {
      cw1t.innerHTML =  `Bład przy pobieraniu danych`;
    }

  })

  // Cw2

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
      });
      text += "<table/>"

      cw2t.innerHTML = text;
    } catch (error) {
      console.log(error)
      cw2t.innerHTML =  `Bład przy pobieraniu danych`;
    }

  })

  // Cw3
  
  const cw3 = document.getElementById('cw3')
  const cw3t = document.getElementById('cw3t')
  const cw3n = document.getElementById('cw3n')
  const cw3p = document.getElementById('cw3p')

  let gifList = [];
  const cw3Max = 3;
  const cw3PerSide = 9;
  let cw3Current = 1;


  function cw3ShowImages(side){
    let text = "<table>";
    let n = 0;

    for(let i = 0; i < cw3PerSide; i++){
      const gif = gifList[i+cw3PerSide*(side-1)];
      
      if(n % 3 == 0){
        text += "<tr>";
      }
      text += `<td><img src=${gif}></td>`; 
      if(n % 3 == 2){
        text += "<tr/>";
      }
      n++;
    }
    text += "<table/>"

    cw3t.innerHTML = text;
  }


  function cw3PaginationP(){
    if(cw3Current == 1)
      return;
    cw3ShowImages(--cw3Current);
  }
  
  function cw3PaginationN(){
    if(cw3Current == cw3Max)
      return;
    cw3ShowImages(++cw3Current);
  }

  function cw3PaginationClick(i){
    cw3ShowImages(i);
    cw3Current = i;
  }

  function cw3ReturnButton(id, text){
    return `<button id=${id}>${text}</button>`
  }

  function cw3PaginationInit(){
    let text = `<tr><td>${cw3ReturnButton("cw3pp", "Poprzedni")}</td>`;
    for (let i = 1; i <= cw3Max; i++) {
      const id = "cw3p" + i;
      text += `<td>${cw3ReturnButton(id, i)}</td>`;
    } 
    text += `<td>${cw3ReturnButton("cw3pn", "Następny")}</td></tr>`;
    cw3p.innerHTML += text;
    for (let i = 1; i <= cw3Max; i++) {
      const id = "cw3p" + i;
      document.getElementById(id).addEventListener("click", () => cw3PaginationClick(i));
    } 
    document.getElementById("cw3pp").addEventListener("click", () => cw3PaginationP());
    document.getElementById("cw3pn").addEventListener("click", () => cw3PaginationN());
  }
  cw3PaginationInit();

  cw3.addEventListener("click", async function() {
    const text = encodeURIComponent(cw3n.value);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&rating=g&q=${text}&limit=${cw3Max*cw3PerSide}`;

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

      gifList = [];
      result.data.forEach(gif => {
        gifList.push(gif.images.fixed_width.url);
      });

      cw3ShowImages(1);
      cw3Current = 1;
    } catch (error) {
      console.log(error)
      cw3t.innerHTML =  `Bład przy pobieraniu danych`;
    }

  })


})();
