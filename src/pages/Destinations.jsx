import React, { useState, useMemo } from "react";
import FiltroDestinos from "../components/FilterDestinations";
import ModalTokenizar from "../components/ModalTokenizar";

const destinosData = [
  // Perú 
  {
    id: 1,
    nombre: "Machu Picchu",
    pais: "Perú",
    ciudad: "Cusco",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "La emblemática ciudadela Inca declarada Patrimonio de la Humanidad, rodeada de majestuosas montañas y una biodiversidad única, símbolo del imperio Inca.",
    imagen: "https://tse3.mm.bing.net/th/id/OIP.ZtMc5PVmpXCVrn7i7-5paQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "250/500",
    precio: "0.5 ETH",
  },
  {
    id: 2,
    nombre: "Reserva Nacional de Tambopata",
    pais: "Perú",
    ciudad: "Madre de Dios",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Reserva amazónica que alberga una enorme diversidad biológica, ideal para el ecoturismo responsable y la observación de fauna única.",
    imagen: "https://tse3.mm.bing.net/th/id/OIP.T8o5OcYJKv-SFrDd2FR5sAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "100/300",
    precio: "0.3 ETH",
  },
  {
    id: 3,
    nombre: "Islas Uros",
    pais: "Perú",
    ciudad: "Puno",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Islas flotantes construidas con totora en el Lago Titicaca, hogar ancestral de la comunidad Uro con tradiciones vivas.",
    imagen: "https://th.bing.com/th/id/R.5516251f425982d83369860aca219a2a?rik=KM%2fUfrPVyHgIiw&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/abc12345",
    tokens: "50/100",
    precio: "0.4 ETH",
  },
  {
    id: 4,
    nombre: "Líneas de Nazca",
    pais: "Perú",
    ciudad: "Ica",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "Enigmáticos geoglifos milenarios visibles desde el aire, considerados Patrimonio de la Humanidad por la UNESCO.",
    imagen: "https://historia.nationalgeographic.com.es/medio/2022/12/21/istock-1336962106_4b78ead8_221221101144_1200x630.jpg",
    video: "",
    tokens: "120/300",
    precio: "0.35 ETH"
  },
  {
    id: 5,
    nombre: "Cañón del Colca",
    pais: "Perú",
    ciudad: "Arequipa",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Uno de los cañones más profundos del mundo, hábitat del majestuoso cóndor andino y con paisajes espectaculares.",
    imagen: "https://th.bing.com/th/id/R.0eb4912fa65332f158dca481fff50c24?rik=mpBI0MDfs2PnCw&pid=ImgRaw&r=0",
    video: "",
    tokens: "90/200",
    precio: "0.38 ETH"
  },

  // Costa Rica 
  {
    id: 6,
    nombre: "Monteverde",
    pais: "Costa Rica",
    ciudad: "Puntarenas",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Bosque nuboso con ecosistemas únicos y gran biodiversidad, ejemplo emblemático de conservación y ecoturismo sostenible.",
    imagen: "https://www.vyoforestal.com/wp-content/uploads/2023/09/monteverde-scaled.webp",
    video: "https://www.youtube.com/embed/nZ0o1hW1rTo",
    tokens: "150/400",
    precio: "0.45 ETH",
  },
  {
    id: 7,
    nombre: "Parque Nacional Corcovado",
    pais: "Costa Rica",
    ciudad: "Osa",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Uno de los parques más biodiversos del planeta, con selvas vírgenes y gran variedad de fauna exótica.",
    imagen: "https://lp-cms-production.imgix.net/2019-06/GettyImages-148307923_full.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
    video: "",
    tokens: "110/250",
    precio: "0.42 ETH",
  },
  {
    id: 8,
    nombre: "Volcán Arenal",
    pais: "Costa Rica",
    ciudad: "Alajuela",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Impresionante volcán activo rodeado de aguas termales y exuberante vegetación tropical.",
    imagen: "https://th.bing.com/th/id/R.8015b6d3a9f1943bc20c0b2fed3e386e?rik=%2fQs4YwdiA1NBxQ&pid=ImgRaw&r=0",
    video: "",
    tokens: "130/350",
    precio: "0.47 ETH"
  },
  {
    id: 9,
    nombre: "San José Colonial",
    pais: "Costa Rica",
    ciudad: "San José",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Centro histórico con arquitectura colonial, museos de oro precolombino y edificios históricos.",
    imagen: "https://casarolandsanjose.com/wp-content/uploads/2023/07/Discover-San-Jose-Costa-Rica-the-city-that-has-it-all-1024x683.jpg",
    video: "",
    tokens: "80/180",
    precio: "0.32 ETH"
  },
  {
    id: 10,
    nombre: "Tortuguero",
    pais: "Costa Rica",
    ciudad: "Limon",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Red de canales navegables donde se protegen tortugas marinas en peligro de extinción.",
    imagen: "https://costarica.org/wp-content/uploads/2014/12/L-Tortu-14-copy.jpg",
    video: "",
    tokens: "95/220",
    precio: "0.41 ETH"
  },

  // México 
  {
    id: 11,
    nombre: "Chichén Itzá",
    pais: "México",
    ciudad: "Yucatán",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Una de las nuevas siete maravillas del mundo, esta antigua ciudad maya destaca por sus pirámides y complejos arqueológicos impresionantes.",
    imagen: "https://www.omundoeseu.com.br/wp-content/uploads/2022/10/aerial-view-of-chichen-itza.jpg",
    video: "https://www.youtube.com/embed/w0MZRrcoB0k",
    tokens: "300/600",
    precio: "0.55 ETH",
  },
  {
    id: 12,
    nombre: "Teotihuacán",
    pais: "México",
    ciudad: "Estado de México",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Antigua ciudad prehispánica con las majestuosas Pirámides del Sol y la Luna.",
    imagen: "https://th.bing.com/th/id/R.8fba5550386f6bad94bf74e9645b2bc9?rik=6GTI1jKLYe0SbA&pid=ImgRaw&r=0",
    video: "",
    tokens: "180/400",
    precio: "0.45 ETH"
  },
  {
    id: 13,
    nombre: "Sian Ka'an",
    pais: "México",
    ciudad: "Quintana Roo",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Reserva de la biosfera con manglares, arrecifes y una gran diversidad de aves y vida marina.",
    imagen: "https://tse1.mm.bing.net/th/id/OIP.UxxY735pT_cmIyEeapg5uAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "110/280",
    precio: "0.39 ETH"
  },
  {
    id: 14,
    nombre: "Ciudad de México Histórica",
    pais: "México",
    ciudad: "CDMX",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Centro histórico con el Zócalo, Catedral Metropolitana y ruinas del Templo Mayor azteca.",
    imagen: "https://th.bing.com/th/id/R.c72a03c1005f9ffc3cce78697dfa5ec6?rik=UxHcy1FF85yLcg&pid=ImgRaw&r=0",
    video: "",
    tokens: "200/450",
    precio: "0.48 ETH"
  },
  {
    id: 15,
    nombre: "Barrancas del Cobre",
    pais: "México",
    ciudad: "Chihuahua",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Conjunto de cañones más extenso y profundo que el Gran Cañón de Colorado.",
    imagen: "https://th.bing.com/th/id/R.c029029bc282e8be04d02c99041b99a6?rik=HML1oe9FuHehWA&riu=http%3a%2f%2flaviajeramaya.com%2fwp-content%2fuploads%2f2017%2f12%2fbarrancas-del-cobre.jpg&ehk=ZIVN9DCq%2fYYa%2ffu0wWXS%2f8hm91D8ezRuHGhE5PXUwTo%3d&risl=&pid=ImgRaw&r=0",
    video: "",
    tokens: "150/350",
    precio: "0.42 ETH"
  },

  // Chile 
  {
    id: 16,
    nombre: "Isla Grande de Chiloé",
    pais: "Chile",
    ciudad: "Los Lagos",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "Isla con arquitectura tradicional de palafitos y iglesias de madera declaradas Patrimonio Mundial, con cultura viva y tradiciones ancestrales.",
    imagen: "https://blogskystorage.s3.amazonaws.com/2023/04/grande-de-chiloe.jpeg",
    video: "https://www.youtube.com/embed/1v4lh-9JBBk",
    tokens: "90/200",
    precio: "0.35 ETH",
  },
  {
    id: 17,
    nombre: "Parque Nacional Torres del Paine",
    pais: "Chile",
    ciudad: "Magallanes",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Impresionantes paisajes patagónicos con montañas, lagos y glaciares, ideal para trekking y naturaleza salvaje.",
    imagen: "https://cdn.getyourguide.com/img/location/5d13c5084862b.jpeg/88.jpg",
    video: "https://www.youtube.com/embed/vbQW0rxx-JE",
    tokens: "90/220",
    precio: "0.47 ETH",
  },
  {
    id: 18,
    nombre: "Valle de la Luna",
    pais: "Chile",
    ciudad: "Antofagasta",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Paisaje desértico que simula la superficie lunar, con formaciones geológicas únicas.",
    imagen: "https://live.staticflickr.com/2936/33817747052_c2df3bdaa7_b.jpg",
    video: "",
    tokens: "70/160",
    precio: "0.33 ETH"
  },
  {
    id: 19,
    nombre: "Valparaíso Cultural",
    pais: "Chile",
    ciudad: "Valparaíso",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Ciudad puerto con coloridos cerros, ascensores históricos y una vibrante vida bohemia.",
    imagen: "https://tse3.mm.bing.net/th/id/OIP.4GtQypyx8BNSCpahNLJfYwHaE9?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "85/190",
    precio: "0.36 ETH"
  },
  {
    id: 20,
    nombre: "Parque Nacional Conguillío",
    pais: "Chile",
    ciudad: "Araucanía",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Bosques milenarios de araucarias, lagos cristalinos y vistas al volcán Llaima.",
    imagen: "https://th.bing.com/th/id/R.d277a258cc6977c7020c07d88a73b6f6?rik=WBvltB93A2iKew&pid=ImgRaw&r=0",
    video: "",
    tokens: "95/210",
    precio: "0.38 ETH"
  },

  // Bolivia
  {
    id: 21,
    nombre: "Parque Nacional Madidi",
    pais: "Bolivia",
    ciudad: "La Paz",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Parque nacional con una de las mayores biodiversidades del mundo, conecta los Andes con la Amazonía, un paraíso para los amantes de la naturaleza.",
    imagen: "https://th.bing.com/th/id/R.9158da4580a4dca8104da7d8be2e6d01?rik=z%2fcmYYzWq5UrJg&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/hQrF5tbD1RU",
    tokens: "80/150",
    precio: "0.4 ETH",
  },
  {
    id: 22,
    nombre: "Salar de Uyuni",
    pais: "Bolivia",
    ciudad: "Potosí",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "El salar más grande del mundo, un paisaje surrealista de sal y espejos que cautiva turistas de todo el planeta.",
    imagen: "https://lalarebelo.com/wp-content/uploads/2017/02/22-Salar-de-Uyuni-deserto-de-sal-bolivia.jpg",
    video: "https://www.youtube.com/embed/A5cjNuK8m5E",
    tokens: "120/300",
    precio: "0.48 ETH",
  },
  {
    id: 23,
    nombre: "Tiwanaku",
    pais: "Bolivia",
    ciudad: "La Paz",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "Ruinas arqueológicas de una antigua civilización preincaica, Patrimonio de la Humanidad.",
    imagen: "https://farm5.staticflickr.com/4211/35271252622_96b5d23b93_b.jpg",
    video: "",
    tokens: "60/130",
    precio: "0.28 ETH"
  },
  {
    id: 24,
    nombre: "Parque Nacional Sajama",
    pais: "Bolivia",
    ciudad: "Oruro",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Alberga el nevado Sajama (pico más alto de Bolivia) y bosques de queñuas milenarias.",
    imagen: "https://tse1.mm.bing.net/th/id/OIP.wR0Vuj6FCz5g-1TeCwc-bAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "75/170",
    precio: "0.35 ETH"
  },
  {
    id: 25,
    nombre: "Potosí Colonial",
    pais: "Bolivia",
    ciudad: "Potosí",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "Ciudad histórica que fue uno de los centros mineros más importantes del mundo colonial.",
    imagen: "https://media.istockphoto.com/photos/view-panoramic-of-silver-mines-in-cerro-rico-mountain-from-san-in-picture-id806959964?k=6&m=806959964&s=612x612&w=0&h=90gNoTyoER3D7mUYi8t25GbVAgTIcGAiXHEEJLaPevk=",
    video: "",
    tokens: "65/150",
    precio: "0.31 ETH"
  },

  // Colombia 
  {
    id: 26,
    nombre: "Parque Tayrona",
    pais: "Colombia",
    ciudad: "Magdalena",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Reserva natural con playas vírgenes y selva tropical, refugio de comunidades indígenas y gran diversidad de flora y fauna.",
    imagen: "https://s3-us-west-2.amazonaws.com/denomades/blog/wp-content/uploads/2020/04/10142838/image.jpg",
    video: "https://www.youtube.com/embed/yTbWf2jQGv8",
    tokens: "130/350",
    precio: "0.4 ETH",
  },
  {
    id: 27,
    nombre: "Ciudad de Cartagena",
    pais: "Colombia",
    ciudad: "Cartagena",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Ciudad amurallada con historia colonial, calles coloridas y una vibrante cultura caribeña.",
    imagen: "https://cdn.colombia.com/images/v2/turismo/sitios-turisticos/cartagena/ciudad-cartagena-1200.jpg",
    video: "",
    tokens: "140/300",
    precio: "0.43 ETH",
  },
  {
    id: 28,
    nombre: "Caño Cristales",
    pais: "Colombia",
    ciudad: "Meta",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Conocido como 'el río de los cinco colores' por sus algas que crean un espectáculo natural único.",
    imagen: "https://www.fodors.com/wp-content/uploads/2018/01/colorful-nature-Colombia-Cano-Cristales.jpg",
    video: "",
    tokens: "100/250",
    precio: "0.39 ETH"
  },
  {
    id: 29,
    nombre: "San Agustín Arqueológico",
    pais: "Colombia",
    ciudad: "Huila",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "Parque arqueológico con cientos de estatuas y tumbas de una antigua civilización precolombina.",
    imagen: "https://tse3.mm.bing.net/th/id/OIP.R3-Ov5imaVblX2dZmJqoHAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "85/200",
    precio: "0.34 ETH"
  },
  {
    id: 30,
    nombre: "Valle de Cocora",
    pais: "Colombia",
    ciudad: "Quindío",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Bosque de palmas de cera (árbol nacional) en paisajes andinos de ensueño.",
    imagen: "https://www.triviantes.com/wp-content/uploads/2023/01/tours-imperdibles-en-el-valle-de-cocora-3.jpg",
    video: "",
    tokens: "95/220",
    precio: "0.37 ETH"
  },

  // Ecuador 
  {
    id: 31,
    nombre: "Ciudad Colonial de Quito",
    pais: "Ecuador",
    ciudad: "Quito",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Centro histórico con arquitectura colonial y museos, declarado Patrimonio de la Humanidad por la UNESCO.",
    imagen: "https://cdn.greengotravel.com/wp-content/uploads/2015/09/Colonial-Quito-Basilica-at-night.jpg",
    video: "https://www.youtube.com/embed/33EgEsI81N0",
    tokens: "200/450",
    precio: "0.5 ETH",
  },
  {
    id: 32,
    nombre: "Islas Galápagos",
    pais: "Ecuador",
    ciudad: "Galápagos",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Archipiélago volcánico con especies únicas que inspiraron la teoría de la evolución de Darwin.",
    imagen: "https://th.bing.com/th/id/R.53660c313f1465d0ec259b2040d99e0c?rik=XAkwOTTjGmM2jw&pid=ImgRaw&r=0",
    video: "",
    tokens: "300/700",
    precio: "0.65 ETH"
  },
  {
    id: 33,
    nombre: "Avenida de los Volcanes",
    pais: "Ecuador",
    ciudad: "Cotopaxi",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Corredor andino flanqueado por majestuosos volcanes nevados como el Cotopaxi y Chimborazo.",
    imagen: "https://www.casagangotena.com/wp-content/uploads/2023/09/cotopaxi-landscape-pnoramic.webp",
    video: "",
    tokens: "110/260",
    precio: "0.42 ETH"
  },
  {
    id: 34,
    nombre: "Cuenca Colonial",
    pais: "Ecuador",
    ciudad: "Cuenca",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Ciudad Patrimonio de la Humanidad con arquitectura colonial bien preservada y tradiciones artesanales.",
    imagen: "https://hotelesen.net/wp-content/uploads/Qu%C3%A9-hacer-en-Cuenca-la-ciudad-m%C3%A1s-colonial-de-Ecuador.jpg",
    video: "",
    tokens: "120/280",
    precio: "0.38 ETH"
  },
  {
    id: 35,
    nombre: "Reserva Cuyabeno",
    pais: "Ecuador",
    ciudad: "Sucumbíos",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Reserva amazónica con lagunas, delfines rosados y comunidades indígenas que mantienen sus tradiciones.",
    imagen: "https://ctfs.ceskatelevize.cz/porady-s3/episode/64884d8803e797399005edd3/card/dve-reky-1714582182.jpg",
    video: "",
    tokens: "95/230",
    precio: "0.41 ETH"
  },

  // Brasil 
  {
    id: 36,
    nombre: "Parque Nacional Lençóis Maranhenses",
    pais: "Brasil",
    ciudad: "Maranhão",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Increíbles dunas de arena blanca con lagunas cristalinas que crean un paisaje único y espectacular en el mundo.",
    imagen: "https://th.bing.com/th/id/R.8ab484f42fa80c4dd202273da49cee3a?rik=NATJ7r%2bjhXryhw&riu=http%3a%2f%2f3em3.com%2fwp-content%2fuploads%2f2018%2f12%2f3em3_lencoismaranhenses03.jpg&ehk=gQG5oE9apLl7bbU1F0LkUnYDfsgDihmtySqdO%2fYV6Zc%3d&risl=&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/DN1DtjW_4Og",
    tokens: "80/220",
    precio: "0.38 ETH",
  },
  {
    id: 37,
    nombre: "Teatro Amazonas",
    pais: "Brasil",
    ciudad: "Manaos",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "Teatro histórico y símbolo cultural en plena selva amazónica, representativo de la era del caucho.",
    imagen: "https://th.bing.com/th/id/R.50b95e3ddedc36c78e80493f1fc9ec42?rik=033Q%2bFKEAtVSww&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/eXwqf-y57qk",
    tokens: "60/140",
    precio: "0.33 ETH",
  },
  {
    id: 38,
    nombre: "Río de Janeiro Histórico",
    pais: "Brasil",
    ciudad: "Río de Janeiro",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Ciudad icónica con el Cristo Redentor, el Pan de Azúcar y playas famosas como Copacabana e Ipanema.",
    imagen: "https://th.bing.com/th/id/R.c5a7f1fedd50c0e015236201e579f5ec?rik=Rc7hzj4LHc0ikg&riu=http%3a%2f%2fwww.qualviagem.com.br%2fwp-content%2fuploads%2f2014%2f10%2fRio1.jpg&ehk=xeE8bS1ML99ewR6Nov5j4k%2b%2fNtgjm%2f3uSKBxwAleC7c%3d&risl=&pid=ImgRaw&r=0",
    video: "",
    tokens: "220/500",
    precio: "0.52 ETH"
  },
  {
    id: 39,
    nombre: "Pantanal",
    pais: "Brasil",
    ciudad: "Mato Grosso",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Mayor humedal tropical del mundo con una concentración extraordinaria de vida silvestre.",
    imagen: "https://th.bing.com/th/id/R.a8b51141fb22eb7b164e8710a4248043?rik=otJdVgSpLlSz7Q&pid=ImgRaw&r=0",
    video: "",
    tokens: "130/320",
    precio: "0.46 ETH"
  },
  {
    id: 40,
    nombre: "Ouro Preto",
    pais: "Brasil",
    ciudad: "Minas Gerais",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "Ciudad colonial barroca declarada Patrimonio de la Humanidad, con iglesias doradas y calles empedradas.",
    imagen: "https://destinosnotaveis.com.br/wp-content/uploads/2023/05/Ouro-Preto-MG-1.jpg",
    video: "",
    tokens: "95/210",
    precio: "0.37 ETH"
  },

  // Argentina 
  {
    id: 41,
    nombre: "Cataratas del Iguazú",
    pais: "Argentina/Brasil",
    ciudad: "Misiones",
    tipo: "ecologico",
    accesibilidad: "alta",
    descripcion: "Majestuosas cascadas en la frontera entre Argentina y Brasil, consideradas Patrimonio de la Humanidad.",
    imagen: "https://riosdelplaneta.com/wp-content/uploads/2019/12/cataratas-del-iguazu-2.jpg",
    video: "https://www.youtube.com/embed/p86J0nRKUxM",
    tokens: "180/400",
    precio: "0.52 ETH",
  },
  {
    id: 42,
    nombre: "Glaciar Perito Moreno",
    pais: "Argentina",
    ciudad: "Santa Cruz",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Impresionante glaciar que avanza continuamente, creando un espectáculo natural de desprendimientos.",
    imagen: "https://2.bp.blogspot.com/-RxMB9Hey2LI/WyVl2SUfB6I/AAAAAAAATPY/MFm5vgGCSjI7ONkjAyztovZc2gNBKsIaACLcBGAs/s1600/turismo10.jpg",
    video: "",
    tokens: "150/350",
    precio: "0.48 ETH"
  },
  {
    id: 43,
    nombre: "Bariloche y la Ruta de los Siete Lagos",
    pais: "Argentina",
    ciudad: "Río Negro",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Región de lagos cristalinos, bosques andinos y montañas nevadas en la Patagonia.",
    imagen: "https://www.nomadasocasionales.com/wp-content/uploads/2024/01/Ruta-de-los-7-Lagos-desde-Bariloche-a-San-Martin-de-los-Andes-.jpg",
    video: "",
    tokens: "120/280",
    precio: "0.43 ETH"
  },
  {
    id: 44,
    nombre: "Buenos Aires Histórico",
    pais: "Argentina",
    ciudad: "Buenos Aires",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Barrios como San Telmo y La Boca, con tango, arquitectura europea y coloridas casas de conventillo.",
    imagen: "https://th.bing.com/th/id/R.d9ca0a65ed2c33eadd233a4d886cdedf?rik=HrN6gWoEuXGVzw&pid=ImgRaw&r=0",
    video: "",
    tokens: "170/380",
    precio: "0.45 ETH"
  },
  {
    id: 45,
    nombre: "Quebrada de Humahuaca",
    pais: "Argentina",
    ciudad: "Jujuy",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "Valle montañoso con formaciones rocosas coloridas y pueblos indígenas que mantienen tradiciones ancestrales.",
    imagen: "https://i0.wp.com/leerdelviaje.com/wp-content/uploads/2017/11/20181108_101250.jpg?w=2415&ssl=1",
    video: "",
    tokens: "110/250",
    precio: "0.39 ETH"
  },

  // Cuba
  {
    id: 46,
    nombre: "Valle de Viñales",
    pais: "Cuba",
    ciudad: "Pinar del Río",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Paisajes de mogotes kársticos y una rica cultura agrícola tradicional, un tesoro natural y cultural cubano.",
    imagen: "https://th.bing.com/th/id/R.29f22881b05d214db50d9ad49146751a?rik=pHBdimVJqql9JA&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/TeTnOwhv-J4",
    tokens: "70/180",
    precio: "0.29 ETH",
  },
  {
    id: 47,
    nombre: "La Habana Vieja",
    pais: "Cuba",
    ciudad: "La Habana",
    tipo: "cultural",
    accesibilidad: "alta",
    descripcion: "Centro histórico con arquitectura colonial, plazas emblemáticas y el famoso Malecón habanero.",
    imagen: "https://deih43ym53wif.cloudfront.net/havana-cuba-october-12-2017-old-havana_df4cfc1128.jpeg",
    video: "",
    tokens: "140/320",
    precio: "0.42 ETH"
  },
  {
    id: 48,
    nombre: "Trinidad Colonial",
    pais: "Cuba",
    ciudad: "Sancti Spíritus",
    tipo: "cultural",
    accesibilidad: "media",
    descripcion: "Ciudad museo perfectamente conservada con calles empedradas y casas de colores pastel.",
    imagen: "https://i.ytimg.com/vi/lbg8NEKUMsk/maxresdefault.jpg",
    video: "",
    tokens: "100/230",
    precio: "0.36 ETH"
  },
  {
    id: 49,
    nombre: "Parque Nacional Alejandro de Humboldt",
    pais: "Cuba",
    ciudad: "Holguín",
    tipo: "ecologico",
    accesibilidad: "baja",
    descripcion: "Reserva de la biosfera con una de las mayores biodiversidades insulares del mundo.",
    imagen: "https://th.bing.com/th/id/R.ef112e9da11ee76d447f830d887690bf?rik=vODgSQgU0lPKNA&pid=ImgRaw&r=0",
    video: "",
    tokens: "85/200",
    precio: "0.34 ETH"
  },
  {
    id: 50,
    nombre: "Ciénaga de Zapata",
    pais: "Cuba",
    ciudad: "Matanzas",
    tipo: "ecologico",
    accesibilidad: "media",
    descripcion: "Mayor humedal del Caribe, refugio de cocodrilos, aves migratorias y especies endémicas.",
    imagen: "https://th.bing.com/th/id/R.3c71246381a882ea3d70b740b7aae29a?rik=xpJSDuKyKi0UXw&pid=ImgRaw&r=0",
    video: "",
    tokens: "90/210",
    precio: "0.35 ETH"
  }
];

const Destinos = () => {
  const [filtros, setFiltros] = useState({
    pais: "",
    tipo: "",
    accesibilidad: "",
  });

  const [modalAbierto, setModalAbierto] = useState(false);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);

  // Extraer países únicos usando useMemo para eficiencia
  const paises = useMemo(() => {
    const setPaises = new Set(destinosData.map((d) => d.pais));
    return Array.from(setPaises);
  }, []);

  const destinosFiltrados = destinosData.filter((destino) => {
    return (
      (filtros.pais === "" || destino.pais === filtros.pais) &&
      (filtros.tipo === "" || destino.tipo === filtros.tipo) &&
      (filtros.accesibilidad === "" || destino.accesibilidad === filtros.accesibilidad)
    );
  });

  const abrirModal = (destino) => {
    setDestinoSeleccionado(destino);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setDestinoSeleccionado(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">Explorador de Destinos</h1>
      <p className="text-gray-600 mb-6 text-center">
        Lugares turísticos sostenibles y culturales de Latinoamérica
      </p>

      {/* Filtros, pasando los países dinámicamente */}
      <FiltroDestinos filtros={filtros} setFiltros={setFiltros} paises={paises} />

      {/* Listado de tarjetas */}
      <div className="grid md:grid-cols-3 gap-8">
        {destinosFiltrados.map((destino) => (
          <div
            key={destino.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <figure className="relative overflow-hidden">
             {destino.imagen && (
                <img
                  src={destino.imagen}
                  alt={destino.nombre}
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                />
              )}

              <div className="absolute top-4 right-4 badge bg-accent text-white font-semibold">
                {destino.tokens}
              </div>
            </figure>

            <div className="card-body">
              <h3 className="card-title text-gray-800">{destino.nombre}</h3>
              <p className="text-secondary font-medium mb-2">
                📍 {destino.ciudad}, {destino.pais} | Tipo: {destino.tipo} | Accesibilidad: {destino.accesibilidad}
              </p>
              <p className="text-gray-700 mb-4">{destino.descripcion}</p>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">{destino.precio}</span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => abrirModal(destino)}
                >
                  Tokenizar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {destinosFiltrados.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No se encontraron destinos con los filtros seleccionados.
        </p>
      )}

      {/* Modal Tokenizar */}
      <ModalTokenizar
        isOpen={modalAbierto}
        onClose={cerrarModal}
        destino={destinoSeleccionado}
      />
    </div>
  );
};

export default Destinos;
