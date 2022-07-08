document.addEventListener('DOMContentLoaded', () => {
  const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';
  const imgContainer = document.querySelector('#dog-image-container');
  const breedList = document.querySelector('#dog-breeds');
  const breedDropdown = document.querySelector('#breed-dropdown');

  fetch(imgUrl)
  .then(res => res.json())
  .then(renderDogPics)

  renderBreedList();

  function fetchBreeds(url) {
    return fetch(url)
    .then(res => res.json())
  }

  function renderDogPics({ message:urlArray }) {
    urlArray.forEach(url => {
      const img = document.createElement('img');
      
      img.src = url;

      imgContainer.append(img);
    })
  }
  
  function renderBreedList(filterBy = undefined) {
    fetchBreeds(breedUrl)
    .then(breeds => {
      let breedsArray = Object.keys(breeds.message);
      
      while(breedList.firstChild) {
        breedList.firstChild.remove();
      }
      
      // If filter parameter is set, filter breedsArray
      if(filterBy) {
        breedsArray = breedsArray.filter(breed => breed[0] == filterBy);
      }
      
      breedsArray.forEach(breed => {
        const li = document.createElement('li');

        li.textContent = breed;

        li.addEventListener('click', (e) => {
          e.target.style.color = 'red';
          e.target.style.transform = 'scale(1.20)';
        })

        breedList.append(li);
      })

      breedDropdown.addEventListener('change', (e) => {
        const selection = e.target.value;
        if(selection == 'All') {
          renderBreedList();
        } else {
          renderBreedList(selection);
        }
      })

    })
  }

})