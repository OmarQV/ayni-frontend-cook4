import React, { useState, useMemo } from "react";
import FiltroDestinos from "../components/FilterDestinations";
import ModalTokenizar from "../components/ModalTokenizar";

const destinosData = [
  // Peru
  {
    id: 1,
    nombre: "Machu Picchu",
    pais: "Peru",
    ciudad: "Cusco",
    tipo: "cultural",
    accesibilidad: "medium",
    descripcion: "The emblematic Inca citadel declared a World Heritage Site, surrounded by majestic mountains and unique biodiversity, a symbol of the Inca empire.",
    imagen: "https://tse3.mm.bing.net/th/id/OIP.ZtMc5PVmpXCVrn7i7-5paQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "250/500",
    precio: "0.5 ETH",
  },
  {
    id: 2,
    nombre: "Tambopata National Reserve",
    pais: "Peru",
    ciudad: "Madre de Dios",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "Amazonian reserve that houses an enormous biological diversity, ideal for responsible ecotourism and the observation of unique fauna.",
    imagen: "https://tse3.mm.bing.net/th/id/OIP.T8o5OcYJKv-SFrDd2FR5sAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "100/300",
    precio: "0.3 ETH",
  },
  {
    id: 3,
    nombre: "Uros Islands",
    pais: "Peru",
    ciudad: "Puno",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Floating islands built with totora reeds on Lake Titicaca, ancestral home of the Uro community with living traditions.",
    imagen: "https://th.bing.com/th/id/R.5516251f425982d83369860aca219a2a?rik=KM%2fUfrPVyHgIiw&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/abc12345",
    tokens: "50/100",
    precio: "0.4 ETH",
  },
  {
    id: 4,
    nombre: "Nazca Lines",
    pais: "Peru",
    ciudad: "Ica",
    tipo: "cultural",
    accesibilidad: "medium",
    descripcion: "Enigmatic ancient geoglyphs visible from the air, considered a UNESCO World Heritage Site.",
    imagen: "https://historia.nationalgeographic.com.es/medio/2022/12/21/istock-1336962106_4b78ead8_221221101144_1200x630.jpg",
    video: "",
    tokens: "120/300",
    precio: "0.35 ETH"
  },
  {
    id: 5,
    nombre: "Colca Canyon",
    pais: "Peru",
    ciudad: "Arequipa",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "One of the deepest canyons in the world, habitat of the majestic Andean condor and with spectacular landscapes.",
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
    accesibilidad: "medium",
    descripcion: "Cloud forest with unique ecosystems and great biodiversity, an emblematic example of conservation and sustainable ecotourism.",
    imagen: "https://www.vyoforestal.com/wp-content/uploads/2023/09/monteverde-scaled.webp",
    video: "https://www.youtube.com/embed/nZ0o1hW1rTo",
    tokens: "150/400",
    precio: "0.45 ETH",
  },
  {
    id: 7,
    nombre: "Corcovado National Park",
    pais: "Costa Rica",
    ciudad: "Osa",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "One of the most biodiverse parks on the planet, with virgin jungles and a great variety of exotic fauna.",
    imagen: "https://lp-cms-production.imgix.net/2019-06/GettyImages-148307923_full.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
    video: "",
    tokens: "110/250",
    precio: "0.42 ETH",
  },
  {
    id: 8,
    nombre: "Arenal Volcano",
    pais: "Costa Rica",
    ciudad: "Alajuela",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Impressive active volcano surrounded by hot springs and lush tropical vegetation.",
    imagen: "https://th.bing.com/th/id/R.8015b6d3a9f1943bc20c0b2fed3e386e?rik=%2fQs4YwdiA1NBxQ&pid=ImgRaw&r=0",
    video: "",
    tokens: "130/350",
    precio: "0.47 ETH"
  },
  {
    id: 9,
    nombre: "Colonial San Jose",
    pais: "Costa Rica",
    ciudad: "San Jose",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Historic center with colonial architecture, pre-Columbian gold museums and historic buildings.",
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
    accesibilidad: "low",
    descripcion: "Network of navigable channels where endangered sea turtles are protected.",
    imagen: "https://costarica.org/wp-content/uploads/2014/12/L-Tortu-14-copy.jpg",
    video: "",
    tokens: "95/220",
    precio: "0.41 ETH"
  },

  // Mexico
  {
    id: 11,
    nombre: "Chichen Itza",
    pais: "Mexico",
    ciudad: "Yucatan",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "One of the new seven wonders of the world, this ancient Mayan city stands out for its impressive pyramids and archaeological complexes.",
    imagen: "https://www.omundoeseu.com.br/wp-content/uploads/2022/10/aerial-view-of-chichen-itza.jpg",
    video: "https://www.youtube.com/embed/w0MZRrcoB0k",
    tokens: "300/600",
    precio: "0.55 ETH",
  },
  {
    id: 12,
    nombre: "Teotihuacan",
    pais: "Mexico",
    ciudad: "Estado de Mexico",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Ancient pre-Hispanic city with the majestic Pyramids of the Sun and the Moon.",
    imagen: "https://th.bing.com/th/id/R.8fba5550386f6bad94bf74e9645b2bc9?rik=6GTI1jKLYe0SbA&pid=ImgRaw&r=0",
    video: "",
    tokens: "180/400",
    precio: "0.45 ETH"
  },
  {
    id: 13,
    nombre: "Sian Ka'an",
    pais: "Mexico",
    ciudad: "Quintana Roo",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "Biosphere reserve with mangroves, reefs and a great diversity of birds and marine life.",
    imagen: "https://tse1.mm.bing.net/th/id/OIP.UxxY735pT_cmIyEeapg5uAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "110/280",
    precio: "0.39 ETH"
  },
  {
    id: 14,
    nombre: "Historic Mexico City",
    pais: "Mexico",
    ciudad: "CDMX",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Historic center with the Zocalo, Metropolitan Cathedral and ruins of the Aztec Templo Mayor.",
    imagen: "https://th.bing.com/th/id/R.c72a03c1005f9ffc3cce78697dfa5ec6?rik=UxHcy1FF85yLcg&pid=ImgRaw&r=0",
    video: "",
    tokens: "200/450",
    precio: "0.48 ETH"
  },
  {
    id: 15,
    nombre: "Copper Canyon",
    pais: "Mexico",
    ciudad: "Chihuahua",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "A set of canyons that is more extensive and deeper than the Grand Canyon of Colorado.",
    imagen: "https://th.bing.com/th/id/R.c029029bc282e8be04d02c99041b99a6?rik=HML1oe9FuHehWA&riu=http%3a%2f%2flaviajeramaya.com%2fwp-content%2fuploads%2f2017%2f12%2fbarrancas-del-cobre.jpg&ehk=ZIVN9DCq%2fYYa%2ffu0wWXS%2f8hm91D8ezRuHGhE5PXUwTo%3d&risl=&pid=ImgRaw&r=0",
    video: "",
    tokens: "150/350",
    precio: "0.42 ETH"
  },

  // Chile
  {
    id: 16,
    nombre: "Isla Grande de Chiloe",
    pais: "Chile",
    ciudad: "Los Lagos",
    tipo: "cultural",
    accesibilidad: "medium",
    descripcion: "Island with traditional stilt house architecture and wooden churches declared a World Heritage Site, with a living culture and ancestral traditions.",
    imagen: "https://blogskystorage.s3.amazonaws.com/2023/04/grande-de-chiloe.jpeg",
    video: "https://www.youtube.com/embed/1v4lh-9JBBk",
    tokens: "90/200",
    precio: "0.35 ETH",
  },
  {
    id: 17,
    nombre: "Torres del Paine National Park",
    pais: "Chile",
    ciudad: "Magallanes",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Impressive Patagonian landscapes with mountains, lakes and glaciers, ideal for trekking and wild nature.",
    imagen: "https://cdn.getyourguide.com/img/location/5d13c5084862b.jpeg/88.jpg",
    video: "https://www.youtube.com/embed/vbQW0rxx-JE",
    tokens: "90/220",
    precio: "0.47 ETH",
  },
  {
    id: 18,
    nombre: "Moon Valley",
    pais: "Chile",
    ciudad: "Antofagasta",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Desert landscape that simulates the lunar surface, with unique geological formations.",
    imagen: "https://live.staticflickr.com/2936/33817747052_c2df3bdaa7_b.jpg",
    video: "",
    tokens: "70/160",
    precio: "0.33 ETH"
  },
  {
    id: 19,
    nombre: "Cultural Valparaiso",
    pais: "Chile",
    ciudad: "Valparaiso",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Port city with colorful hills, historic elevators and a vibrant bohemian life.",
    imagen: "https://tse3.mm.bing.net/th/id/OIP.4GtQypyx8BNSCpahNLJfYwHaE9?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "85/190",
    precio: "0.36 ETH"
  },
  {
    id: 20,
    nombre: "Conguillio National Park",
    pais: "Chile",
    ciudad: "Araucania",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Ancient araucaria forests, crystalline lakes and views of the Llaima volcano.",
    imagen: "https://th.bing.com/th/id/R.d277a258cc6977c7020c07d88a73b6f6?rik=WBvltB93A2iKew&pid=ImgRaw&r=0",
    video: "",
    tokens: "95/210",
    precio: "0.38 ETH"
  },

  // Bolivia
  {
    id: 21,
    nombre: "Madidi National Park",
    pais: "Bolivia",
    ciudad: "La Paz",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "National park with one of the greatest biodiversities in the world, it connects the Andes with the Amazon, a paradise for nature lovers.",
    imagen: "https://th.bing.com/th/id/R.9158da4580a4dca8104da7d8be2e6d01?rik=z%2fcmYYzWq5UrJg&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/hQrF5tbD1RU",
    tokens: "80/150",
    precio: "0.4 ETH",
  },
  {
    id: 22,
    nombre: "Salar de Uyuni",
    pais: "Bolivia",
    ciudad: "Potosi",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "The largest salt flat in the world, a surreal landscape of salt and mirrors that captivates tourists from all over the planet.",
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
    accesibilidad: "medium",
    descripcion: "Archaeological ruins of an ancient pre-Inca civilization, a World Heritage Site.",
    imagen: "https://farm5.staticflickr.com/4211/35271252622_96b5d23b93_b.jpg",
    video: "",
    tokens: "60/130",
    precio: "0.28 ETH"
  },
  {
    id: 24,
    nombre: "Sajama National Park",
    pais: "Bolivia",
    ciudad: "Oruro",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "It houses the Sajama snow-capped peak (the highest peak in Bolivia) and ancient queñua forests.",
    imagen: "https://tse1.mm.bing.net/th/id/OIP.wR0Vuj6FCz5g-1TeCwc-bAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "75/170",
    precio: "0.35 ETH"
  },
  {
    id: 25,
    nombre: "Colonial Potosi",
    pais: "Bolivia",
    ciudad: "Potosi",
    tipo: "cultural",
    accesibilidad: "medium",
    descripcion: "Historic city that was one of the most important mining centers in the colonial world.",
    imagen: "https://media.istockphoto.com/photos/view-panoramic-of-silver-mines-in-cerro-rico-mountain-from-san-in-picture-id806959964?k=6&m=806959964&s=612x612&w=0&h=90gNoTyoER3D7mUYi8t25GbVAgTIcGAiXHEEJLaPevk=",
    video: "",
    tokens: "65/150",
    precio: "0.31 ETH"
  },

  // Colombia
  {
    id: 26,
    nombre: "Tayrona Park",
    pais: "Colombia",
    ciudad: "Magdalena",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Natural reserve with virgin beaches and tropical jungle, a refuge for indigenous communities and a great diversity of flora and fauna.",
    imagen: "https://s3-us-west-2.amazonaws.com/denomades/blog/wp-content/uploads/2020/04/10142838/image.jpg",
    video: "https://www.youtube.com/embed/yTbWf2jQGv8",
    tokens: "130/350",
    precio: "0.4 ETH",
  },
  {
    id: 27,
    nombre: "Cartagena City",
    pais: "Colombia",
    ciudad: "Cartagena",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Walled city with colonial history, colorful streets and a vibrant Caribbean culture.",
    imagen: "https://cdn.colombia.com/images/v2/turismo/sitios-turisticos/cartagena/ciudad-cartagena-1200.jpg",
    video: "",
    tokens: "140/300",
    precio: "0.43 ETH",
  },
  {
    id: 28,
    nombre: "Cano Cristales",
    pais: "Colombia",
    ciudad: "Meta",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "Known as 'the river of five colors' because of its algae that create a unique natural spectacle.",
    imagen: "https://www.fodors.com/wp-content/uploads/2018/01/colorful-nature-Colombia-Cano-Cristales.jpg",
    video: "",
    tokens: "100/250",
    precio: "0.39 ETH"
  },
  {
    id: 29,
    nombre: "Archaeological San Agustin",
    pais: "Colombia",
    ciudad: "Huila",
    tipo: "cultural",
    accesibilidad: "medium",
    descripcion: "Archaeological park with hundreds of statues and tombs of an ancient pre-Columbian civilization.",
    imagen: "https://tse3.mm.bing.net/th/id/OIP.R3-Ov5imaVblX2dZmJqoHAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    video: "",
    tokens: "85/200",
    precio: "0.34 ETH"
  },
  {
    id: 30,
    nombre: "Cocora Valley",
    pais: "Colombia",
    ciudad: "Quindio",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Forest of wax palms (national tree) in dreamlike Andean landscapes.",
    imagen: "https://www.triviantes.com/wp-content/uploads/2023/01/tours-imperdibles-en-el-valle-de-cocora-3.jpg",
    video: "",
    tokens: "95/220",
    precio: "0.37 ETH"
  },

  // Ecuador
  {
    id: 31,
    nombre: "Colonial Quito",
    pais: "Ecuador",
    ciudad: "Quito",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Historic center with colonial architecture and museums, declared a UNESCO World Heritage Site.",
    imagen: "https://cdn.greengotravel.com/wp-content/uploads/2015/09/Colonial-Quito-Basilica-at-night.jpg",
    video: "https://www.youtube.com/embed/33EgEsI81N0",
    tokens: "200/450",
    precio: "0.5 ETH",
  },
  {
    id: 32,
    nombre: "Galapagos Islands",
    pais: "Ecuador",
    ciudad: "Galapagos",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "Volcanic archipelago with unique species that inspired Darwin's theory of evolution.",
    imagen: "https://th.bing.com/th/id/R.53660c313f1465d0ec259b2040d99e0c?rik=XAkwOTTjGmM2jw&pid=ImgRaw&r=0",
    video: "",
    tokens: "300/700",
    precio: "0.65 ETH"
  },
  {
    id: 33,
    nombre: "Avenue of the Volcanoes",
    pais: "Ecuador",
    ciudad: "Cotopaxi",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Andean corridor flanked by majestic snow-capped volcanoes such as Cotopaxi and Chimborazo.",
    imagen: "https://www.casagangotena.com/wp-content/uploads/2023/09/cotopaxi-landscape-pnoramic.webp",
    video: "",
    tokens: "110/260",
    precio: "0.42 ETH"
  },
  {
    id: 34,
    nombre: "Colonial Cuenca",
    pais: "Ecuador",
    ciudad: "Cuenca",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "World Heritage city with well-preserved colonial architecture and artisan traditions.",
    imagen: "https://hotelesen.net/wp-content/uploads/Qu%C3%A9-hacer-en-Cuenca-la-ciudad-m%C3%A1s-colonial-de-Ecuador.jpg",
    video: "",
    tokens: "120/280",
    precio: "0.38 ETH"
  },
  {
    id: 35,
    nombre: "Cuyabeno Reserve",
    pais: "Ecuador",
    ciudad: "Sucumbios",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "Amazonian reserve with lagoons, pink dolphins and indigenous communities that maintain their traditions.",
    imagen: "https://ctfs.ceskatelevize.cz/porady-s3/episode/64884d8803e797399005edd3/card/dve-reky-1714582182.jpg",
    video: "",
    tokens: "95/230",
    precio: "0.41 ETH"
  },

  // Brazil
  {
    id: 36,
    nombre: "Lencois Maranhenses National Park",
    pais: "Brazil",
    ciudad: "Maranhao",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Incredible white sand dunes with crystalline lagoons that create a unique and spectacular landscape in the world.",
    imagen: "https://th.bing.com/th/id/R.8ab484f42fa80c4dd202273da49cee3a?rik=NATJ7r%2bjhXryhw&riu=http%3a%2f%2f3em3.com%2fwp-content%2fuploads%2f2018%2f12%2f3em3_lencoismaranhenses03.jpg&ehk=gQG5oE9apLl7bbU1F0LkUnYDfsgDihmtySqdO%2fYV6Zc%3d&risl=&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/DN1DtjW_4Og",
    tokens: "80/220",
    precio: "0.38 ETH",
  },
  {
    id: 37,
    nombre: "Amazon Theater",
    pais: "Brazil",
    ciudad: "Manaos",
    tipo: "cultural",
    accesibilidad: "medium",
    descripcion: "Historic theater and cultural symbol in the heart of the Amazon jungle, representative of the rubber era.",
    imagen: "https://th.bing.com/th/id/R.50b95e3ddedc36c78e80493f1fc9ec42?rik=033Q%2bFKEAtVSww&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/eXwqf-y57qk",
    tokens: "60/140",
    precio: "0.33 ETH",
  },
  {
    id: 38,
    nombre: "Historic Rio de Janeiro",
    pais: "Brazil",
    ciudad: "Rio de Janeiro",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Iconic city with Christ the Redeemer, Sugarloaf Mountain and famous beaches like Copacabana and Ipanema.",
    imagen: "https://th.bing.com/th/id/R.c5a7f1fedd50c0e015236201e579f5ec?rik=Rc7hzj4LHc0ikg&riu=http%3a%2f%2fwww.qualviagem.com.br%2fwp-content%2fuploads%2f2014%2f10%2fRio1.jpg&ehk=xeE8bS1ML99ewR6Nov5j4k%2b%2fNtgjm%2f3uSKBxwAleC7c%3d&risl=&pid=ImgRaw&r=0",
    video: "",
    tokens: "220/500",
    precio: "0.52 ETH"
  },
  {
    id: 39,
    nombre: "Pantanal",
    pais: "Brazil",
    ciudad: "Mato Grosso",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "The largest tropical wetland in the world with an extraordinary concentration of wildlife.",
    imagen: "https://th.bing.com/th/id/R.a8b51141fb22eb7b164e8710a4248043?rik=otJdVgSpLlSz7Q&pid=ImgRaw&r=0",
    video: "",
    tokens: "130/320",
    precio: "0.46 ETH"
  },
  {
    id: 40,
    nombre: "Ouro Preto",
    pais: "Brazil",
    ciudad: "Minas Gerais",
    tipo: "cultural",
    accesibilidad: "medium",
    descripcion: "Baroque colonial city declared a World Heritage Site, with golden churches and cobblestone streets.",
    imagen: "https://destinosnotaveis.com.br/wp-content/uploads/2023/05/Ouro-Preto-MG-1.jpg",
    video: "",
    tokens: "95/210",
    precio: "0.37 ETH"
  },

  // Argentina
  {
    id: 41,
    nombre: "Iguazu Falls",
    pais: "Argentina/Brazil",
    ciudad: "Misiones",
    tipo: "ecologico",
    accesibilidad: "high",
    descripcion: "Majestic waterfalls on the border between Argentina and Brazil, considered a World Heritage Site.",
    imagen: "https://riosdelplaneta.com/wp-content/uploads/2019/12/cataratas-del-iguazu-2.jpg",
    video: "https://www.youtube.com/embed/p86J0nRKUxM",
    tokens: "180/400",
    precio: "0.52 ETH",
  },
  {
    id: 42,
    nombre: "Perito Moreno Glacier",
    pais: "Argentina",
    ciudad: "Santa Cruz",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Impressive glacier that advances continuously, creating a natural spectacle of detachments.",
    imagen: "https://2.bp.blogspot.com/-RxMB9Hey2LI/WyVl2SUfB6I/AAAAAAAATPY/MFm5vgGCSjI7ONkjAyztovZc2gNBKsIaACLcBGAs/s1600/turismo10.jpg",
    video: "",
    tokens: "150/350",
    precio: "0.48 ETH"
  },
  {
    id: 43,
    nombre: "Bariloche and the Route of the Seven Lakes",
    pais: "Argentina",
    ciudad: "Rio Negro",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Region of crystalline lakes, Andean forests and snow-capped mountains in Patagonia.",
    imagen: "https://www.nomadasocasionales.com/wp-content/uploads/2024/01/Ruta-de-los-7-Lagos-desde-Bariloche-a-San-Martin-de-los-Andes-.jpg",
    video: "",
    tokens: "120/280",
    precio: "0.43 ETH"
  },
  {
    id: 44,
    nombre: "Historic Buenos Aires",
    pais: "Argentina",
    ciudad: "Buenos Aires",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Neighborhoods like San Telmo and La Boca, with tango, European architecture and colorful conventillo houses.",
    imagen: "https://th.bing.com/th/id/R.d9ca0a65ed2c33eadd233a4d886cdedf?rik=HrN6gWoEuXGVzw&pid=ImgRaw&r=0",
    video: "",
    tokens: "170/380",
    precio: "0.45 ETH"
  },
  {
    id: 45,
    nombre: "Humahuaca Gorge",
    pais: "Argentina",
    ciudad: "Jujuy",
    tipo: "cultural",
    accesibilidad: "medium",
    descripcion: "Mountain valley with colorful rock formations and indigenous peoples who maintain ancestral traditions.",
    imagen: "https://i0.wp.com/leerdelviaje.com/wp-content/uploads/2017/11/20181108_101250.jpg?w=2415&ssl=1",
    video: "",
    tokens: "110/250",
    precio: "0.39 ETH"
  },

  // Cuba
  {
    id: 46,
    nombre: "Vinales Valley",
    pais: "Cuba",
    ciudad: "Pinar del Rio",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "Karst hill landscapes and a rich traditional agricultural culture, a Cuban natural and cultural treasure.",
    imagen: "https://th.bing.com/th/id/R.29f22881b05d214db50d9ad49146751a?rik=pHBdimVJqql9JA&pid=ImgRaw&r=0",
    video: "https://www.youtube.com/embed/TeTnOwhv-J4",
    tokens: "70/180",
    precio: "0.29 ETH",
  },
  {
    id: 47,
    nombre: "Old Havana",
    pais: "Cuba",
    ciudad: "Havana",
    tipo: "cultural",
    accesibilidad: "high",
    descripcion: "Historic center with colonial architecture, emblematic squares and the famous Malecon in Havana.",
    imagen: "https://deih43ym53wif.cloudfront.net/havana-cuba-october-12-2017-old-havana_df4cfc1128.jpeg",
    video: "",
    tokens: "140/320",
    precio: "0.42 ETH"
  },
  {
    id: 48,
    nombre: "Colonial Trinidad",
    pais: "Cuba",
    ciudad: "Sancti Spiritus",
    tipo: "cultural",
    accesibilidad: "medium",
    descripcion: "Perfectly preserved museum city with cobblestone streets and pastel-colored houses.",
    imagen: "https://i.ytimg.com/vi/lbg8NEKUMsk/maxresdefault.jpg",
    video: "",
    tokens: "100/230",
    precio: "0.36 ETH"
  },
  {
    id: 49,
    nombre: "Alejandro de Humboldt National Park",
    pais: "Cuba",
    ciudad: "Holguin",
    tipo: "ecologico",
    accesibilidad: "low",
    descripcion: "Biosphere reserve with one of the greatest island biodiversities in the world.",
    imagen: "https://th.bing.com/th/id/R.ef112e9da11ee76d447f830d887690bf?rik=vODgSQgU0lPKNA&pid=ImgRaw&r=0",
    video: "",
    tokens: "85/200",
    precio: "0.34 ETH"
  },
  {
    id: 50,
    nombre: "Cienaga de Zapata",
    pais: "Cuba",
    ciudad: "Matanzas",
    tipo: "ecologico",
    accesibilidad: "medium",
    descripcion: "The largest wetland in the Caribbean, a refuge for crocodiles, migratory birds and endemic species.",
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

  // Extraer paises unicos usando useMemo para eficiencia
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
      <h1 className="text-3xl font-bold mb-4 text-center">Destination Explorer</h1>
      <p className="text-gray-600 mb-6 text-center">
        Sustainable and cultural tourist destinations in Latin America
      </p>

      {/* Filtros, pasando los paises dinamicamente */}
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
                📍 {destino.ciudad}, {destino.pais} | Type: {destino.tipo} | Accessibility: {destino.accesibilidad}
              </p>
              <p className="text-gray-700 mb-4">{destino.descripcion}</p>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">{destino.precio}</span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => abrirModal(destino)}
                >
                  Tokenize
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {destinosFiltrados.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No destinations were found with the selected filters.
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