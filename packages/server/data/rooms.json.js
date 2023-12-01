export default [
  {
    rooms: [
      {
        id: 1,
        name: 'La Codificación Mágica en el Taller de Santa',
        response: {
          value: 'feliz prospero año'
        },
        statement: `
En el Taller de Santa, una noche antes de la Navidad, la magia estaba en pleno apogeo. Sin embargo, un hechizo misterioso envolvió la sala, dejando a los elfos perplejos.

En el centro, una imagen encantada revelaba caracteres antiguos y extraños que formaban una frase crucial.

<br />

<img src="rooms/1/acertijo.png" style="max-width: 500px; width: 100%; margin: auto;" />

<br />

Cada equipo se encontró frente al enigma, centrados en descifrar letra por letra de esta codificación mágica. Entre juguetes y luces centelleantes, los equipos se embarcaron en una búsqueda para desentrañar el mensaje secreto que guardaba la clave para deshacer el hechizo.

<br />

<img src="rooms/1/cifrado.png" style="max-width: 500px; width: 100%; margin: auto;" />

<br />

La colaboración y la astucia eran su única esperanza para traer de vuelta la magia navideña.
`
      },
      {
        id: 2,
        name: 'La Travesía de los Magos',
        response: {
          value: ['vela', 'la vela', 'una vela', 'velas', 'las velas']
        },
        statement: `
En la víspera de Navidad, Santa Claus se enfrenta a un problema inusual: una estrella mágica que ilumina su camino hacia las chimeneas ha desaparecido misteriosamente. Los equipos, ahora convertidos en ayudantes especiales de Santa, ingresan a la Sala de las Estrellas, una habitación encantada llena de constelaciones brillantes y adornos resplandecientes. 

<br />

Cada equipo descubre un rompecabezas astrológico único que revela **un acertijo secreto**, oculta entre las estrellas. La respuesta al enigma celestial será la llave para recuperar la estrella perdida y restaurar la magia de la Nochebuena. 

<br />

<img src="rooms/2/acertijo.jpg" style="max-width: 500px; width: 100%; margin: auto;" />

<br />

Con ingenio y colaboración, los equipos deben descifrar las pistas estelares y descubrir el mensaje oculto para cumplir con la misión y devolver el brillo a la noche estrellada.


<br />

**¡Que comience la búsqueda de la estrella perdida en este escape room navideño lleno de misterio y encanto!**
`
      },
      {
        id: 3,
        name: 'El Misterio de la Carta Navideña',
        response: {
          value: 'familia'
        },
        statement: `
En la víspera de Navidad, Santa Claus descubre con alarma que la carta esencial con la lista de regalos ha desaparecido misteriosamente. Anticipando el caos, envía a sus elfos más hábiles a diferentes partes del Polo Norte para recuperarla. Sin embargo, cada equipo se enfrenta a la desafortunada situación de encontrar una réplica de la carta resguardada bajo llave en un cofre.

<br />

Debajo del cofre, se ve una carta que contiene un mensaje navideño y un código cifrado extraño, parece ser un mensaje oculto, los equipos deberán descifrar la carta descubriendo la palabra oculta que revela la llave del cofre y garantizar el éxito de la entrega de regalos.

<br />
<img src="rooms/3/acertijo.png" style="max-width: 500px; width: 100%; margin: auto;" />
<p style="text-align:center;font-style: italic;">Carta del cofre</p>

<br />
<img src="rooms/3/cifrado.png" style="max-width: 500px; width: 100%; margin: auto;" />
<p style="text-align:center;font-style: italic;">Mensaje oculto</p>
<br />

La carrera contra el tiempo y el deseo de un feliz amanecer navideño motivan a los equipos a descifrar la palabra oculta y proseguir con su misión.
`
      },
      {
        id: 4,
        name: 'La Fiesta Secreta de Santa',
        response: {
          value: '16 julio',
          type: 'select',
          options: [
            '15 mayo',
            '16 mayo',
            '19 mayo',
            '17 junio',
            '18 junio',
            '14 julio',
            '16 julio',
            '14 agosto',
            '15 agosto',
            '17 agosto'
          ]
        },
        statement: `
En el Polo Norte, Santa Claus organiza una fiesta sorpresa para celebrar el éxito del taller de juguetes. Sin embargo, la entrada a la sala de la fiesta está protegida por un enigma misterioso.

Cada equipo debe descifrar la **fecha exacta** del evento entre varias opciones, lo único que se sabe es un comentario de que Juan conoce el mes y Laura conoce el día, y de una conversación corta que tuvieron en un pasillo.

<br />

### **Conversación:**
---
**Juan:** Yo no sé cuando es la fiesta, ***pero sé que tu tampoco***

**Laura:** Yo no lo sabía, pero ahora sí

**Juan:** Vale, entonces yo ahora lo sé
---

<br />

Trabajando juntos, los equipos deben descifrar las claves proporcionadas por Juan y Laura para determinar la fecha precisa de la fiesta y así desbloquear la puerta de la celebración secreta de Santa. 

<br />
<img src="rooms/4/acertijo.png" style="max-width: 500px; width: 100%; margin: auto;" />
<br />

**¡Que comience la búsqueda del día y el mes perfectos para la Fiesta Secreta de Santa!**
`
      }
    ]
  }
]
