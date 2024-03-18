const dataHandler = {
    getData: () => {
      fetch('../data/data.json')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log('Error fetching data:', error));
    }
  };

export default dataHandler;