import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  accion(){
    // No editar
const teams = [
  { id: 1, country: 'Spain', name: 'Real Madrid C.F.' },
  { id: 2, country: 'Italy', name: 'A.C. Milan' },
  { id: 3, country: 'Spain', name: 'Futbol Club Barcelona' },
  { id: 4, country: 'Germany', name: 'FC Bayern Munich' },
  { id: 5, country: 'England', name: 'Liverpool F.C.' },
  { id: 6, country: 'Netherlands', name: 'AFC Ajax' },
  { id: 7, country: 'Italy', name: 'Inter Milan' },
  { id: 8, country: 'England', name: 'Manchester United F.C.' },
  { id: 9, country: 'England', name: 'Chelsea F.C.' },
  { id: 10, country: 'Portugal', name: 'FC Porto' },
  { id: 11, country: 'Germany', name: 'Borussia Dortmund' },
  { id: 12, country: 'Italy', name: 'Juventus FC' },
  { id: 13, country: 'France', name: 'Olympique Marseille' }

]

const leagues = [
  { id: 1, country: 'England', name: 'Premier League' },
  { id: 2, country: 'Germany', name: 'Bundesliga' },
  { id: 3, country: 'Netherlands', name: 'Eredivisie' },
  { id: 4, country: 'Spain', name: 'La Liga' },
  { id: 5, country: 'Italy', name: 'Serie A' },
  { id: 6, country: 'Portugal', name: 'Liga NOS' },
  { id: 7, country: 'France', name: 'Lige 1' }
]

const teamsByLeague = [
  { teamId: 12, leagueId: 5 },
  { teamId: 6, leagueId: 3 },
  { teamId: 2, leagueId: 5 },
  { teamId: 3, leagueId: 4 },
  { teamId: 4, leagueId: 2 },
  { teamId: 8, leagueId: 1 },
  { teamId: 10, leagueId: 6 },
  { teamId: 5, leagueId: 1 },
  { teamId: 7, leagueId: 5 },
  { teamId: 9, leagueId: 1 },
  { teamId: 11, leagueId: 2 },
  { teamId: 1, leagueId: 4 },
  { teamId: 13, leagueId: 7 }
]

const winsByTeams = [
  { teamId: 10, wins: 2 },
  { teamId: 6, wins: 4 },
  { teamId: 5, wins: 5 },
  { teamId: 1, wins: 13 },
  { teamId: 7, wins: 3 },
  { teamId: 4, wins: 5 },
  { teamId: 8, wins: 3 },
  { teamId: 2, wins: 7 },
  { teamId: 9, wins: 1 },
  { teamId: 3, wins: 5 },
  { teamId: 11, wins: 1 },
  { teamId: 12, wins: 2 },
  { teamId: 13, wins: 1 }
]
// 1 Arreglo con los nombres de los equipos y el país al que pertenecen, ordenados alfabéticamente por el nombre de su país de origen.
    // const newTeams = []
    // newTeams.push(teams.sort((a, b) => {
    //   if (a.country < b.country) return -1
    // }).map(team => {
    //   return [team.name + ' , ' + team.country]
    // }))
    // console.log(newTeams)


// 2 Arreglo con los nombres de los equipos ordenados de mayor a menor por la cantidad de victorias en champions league.
// const arr = []
// winsByTeams.sort((a,b) => {
//   if(a.wins > b.wins) return -1
// }).map(win =>{
//   teams.filter(team => {
//     if(team.id == win.teamId) arr.push(team.name) 
//   })
// })

// 3 Arreglo de objetos en donde se muestre el nombre de las ligas y la sumatoria de las victorias de los equipos que pertenecen a ellas.
// let newLeages = []
// leagues.map(leage => {
//   let wins = 0
//   teamsByLeague.filter(team => {
//     if(team.leagueId == leage.id){
//       winsByTeams.filter(win => {
//         if (win.teamId == team.teamId){
//           wins+= win.wins
//         }
//       })
//     }
//   })
//   newLeages.push({'name':leage.name,wins})
// })

// 4 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la menor cantidad de victorias en champions.
// let obj = new Object()
// leagues.map(league => {
//   let name
//   winsByTeams.sort((a, b) => {
//     if (a.wins > b.wins) return -1
//   }).map(win => {
//     teamsByLeague.map(teamLeague => {
//       teams.map(team => {
//         if (league.id == teamLeague.leagueId && win.teamId == teamLeague.teamId && team.id == win.teamId) {
//           name = team.name
//         }
//       })
//     })
//   })
//   obj[league.name] = name
// })

// 5 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la mayor cantidad de victorias en champions.
// let obj = new Object()
// leagues.map(league => {
//   let name
//   winsByTeams.sort((a, b) => {
//     if (a.wins < b.wins) return -1
//   }).map(win => {
//     teamsByLeague.map(teamLeague => {
//       teams.map(team => {
//         if (league.id == teamLeague.leagueId && win.teamId == teamLeague.teamId && team.id == win.teamId) {
//           name = team.name
//         }
//       })
//     })
//   })
//   obj[league.name] = name
// })

// 6 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de victorias de sus equipos.
// let newLeages = []
// leagues.map(leage => {
//   let wins = 0
//   teamsByLeague.filter(team => {
//     if(team.leagueId == leage.id){
//       winsByTeams.filter(win => {
//         if (win.teamId == team.teamId){
//           wins+= win.wins
//         }
//       })
//     }
//   })
//   newLeages.push({'name':leage.name,wins})
// })
// let arr = newLeages.sort((a,b) => {
//   if (a.wins > b.wins) return -1
// })


// 7 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de equipos que participan en ellas.
// let newLeages = []
//   leagues.map(leage => {
//     let amount = 0
//     teamsByLeague.filter(team => {
//       if (team.leagueId == leage.id) {
//         winsByTeams.filter(win => {
//           if (win.teamId == team.teamId) {
//             amount += 1
//           }
//         })
//       }
//     })
//     newLeages.push({ 'name': leage.name, amount })
//   })
//   let arr = newLeages.sort((a, b) => {
//     if (a.amount > b.amount) return -1
//   })

// 8 Agregar un nuevo equipo con datos ficticios a "teams", asociarlo a la liga de Francia y agregar un total de 4 victorias en champions.
// Luego devolver el lugar que ocupa este equipo en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
// teams.push({id:14,country:'France',name:'Nuevo equipo'})
// winsByTeams.push({teamId:14,wins:4})
// teamsByLeague.push({teamId:14,leagueId:7})
// let teamsByWins = []
//   winsByTeams.sort((a, b) => {
//     if (a.wins > b.wins) return -1
//   }).map(win => {
//     teams.filter(team => {
//       if (team.id == win.teamId) teamsByWins.push(team.name)
//     })
//   })
//   let rank
//   teamsByWins.map((team,index) => {
//     if(team == 'Nuevo equipo') rank = index + 1
//   })

// 9 Realice una función que retorne una promesa con los nombres de los equipos en upper case.
// haga la llamada a la función creada desde esta función y asignarle la respuesta a la variable response.
// recuerde que debe esperar el retorno de función asíncrona para que su resultado pueda ser mostrado por el
// console.log. Utilice async await para la llamada asíncrona a la función.
// NOTA: solo debe crear la función asíncrona y agregar la llamada en la siguiente función.
async function getTeamsNamesAsUpperCase () {
  let response
  // ------MAKE AWAIT CALL HERE------
  
  // --------------------------------
  console.log('response:')
  console.log(response)
}

console.log(getTeamsNamesAsUpperCase)

// console.log(arr)
  }

}
