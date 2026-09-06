const cities = [
  {name:'A Coruña', date:'3 oct', teams:8},
  {name:'Bilbao', date:'3 oct', teams:10},
  {name:'Madrid', date:'3 oct', teams:14},
  {name:'Oviedo', date:'3 oct', teams:8},
  {name:'Salamanca', date:'3 oct', teams:8},
  {name:'Sevilla', date:'3 oct', teams:12},
  {name:'Valencia', date:'3 oct', teams:10},
  {name:'Barcelona', date:'10 oct', teams:10},
  {name:'Granada', date:'10 oct', teams:8},
  {name:'Málaga', date:'10 oct', teams:8},
  {name:'Murcia', date:'10 oct', teams:8},
  {name:'Palma', date:'10 oct', teams:6},
  {name:'Valladolid', date:'10 oct', teams:8},
]

const teams = [
  ['Bilbao 1','Bilbao'],['Bilbao 2','Bilbao'],['Vitoria 1','Bilbao'],['Donostia 1','Bilbao'],
  ['Madrid Centro','Madrid'],['Madrid Norte','Madrid'],['Alcalá','Madrid'],['Pozuelo','Madrid'],
  ['Sevilla Capital','Sevilla'],['Córdoba','Sevilla'],['Cádiz','Sevilla'],['Huelva','Sevilla'],
  ['Valencia 1','Valencia'],['Alicante','Valencia'],['Castellón','Valencia'],['Gandía','Valencia'],
  ['Barcelona 1','Barcelona'],['Tarragona','Barcelona'],['Girona','Barcelona'],['Lleida','Barcelona'],
  ['Valladolid','Valladolid'],['León','Valladolid'],['Burgos','Valladolid'],['Palencia','Valladolid']
].map((x,i)=>({id:i+1,name:x[0],city:x[1],wins:Math.max(0,3-(i%4)),points:Math.round((76+(i%8)*1.2)*10)/10}))

const topics = [
  {title:'¿Debería España implantar una prueba única de acceso a la universidad?', votes:38, status:'Votación abierta'},
  {title:'¿Debe limitarse el acceso a redes sociales a menores de 16 años?', votes:31, status:'Votación abierta'},
  {title:'¿Debe priorizarse la energía nuclear en la transición energética española?', votes:24, status:'Votación abierta'},
  {title:'¿Debe reformarse el sistema de financiación autonómica?', votes:19, status:'Votación abierta'}
]

const qualifiers = [
  {city:'Bilbao', a:'Bilbao 1', b:'Vitoria 1', winner:'Bilbao 1'},
  {city:'Madrid', a:'Madrid Centro', b:'Pozuelo', winner:'Madrid Centro'},
  {city:'Sevilla', a:'Sevilla Capital', b:'Córdoba', winner:'Sevilla Capital'},
  {city:'Valencia', a:'Valencia 1', b:'Alicante', winner:'Valencia 1'}
]

export default {cities,teams,topics,qualifiers}
