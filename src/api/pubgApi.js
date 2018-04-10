import axios from 'axios'

const base_url = 'https://pure-hollows-99814.herokuapp.com/'

function getPlayer(player_name){
  const url = base_url + '/players/' + player_name + '.json'

  const encodedURI = window.encodeURI(url)

  return axios.get(encodedURI).then((response) => {
    if(response.data === null){
      return {
        playerName: 'No Player Found. Have you played a match in the last 14 days?',
        matchIds: []
      }
    }
    return {
      playerName: response.data.name,
      matchIds: response.data.match_ids
    }
  })
  .catch((error) => {
    console.log(error)
  });
}

function getMatch(matchId){
  const url = base_url + '/matches/' + matchId + '.json'

  const encodedURI = window.encodeURI(url)

  return axios.get(encodedURI).then((response) => {

    return {
      match: response.data
    }
  });
}

function getTelemetry(link){
  const url = link

  const encodedURI = window.encodeURI(url)

  return axios.get(encodedURI).then((response) => {

    return {
      telemetry: response.data
    }
  });
}

const api = {
  getMatch,
  getPlayer,
  getTelemetry
}

export default api;
