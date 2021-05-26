// JavaScript source code

const input = document.createElement('input')

const button = document.createElement('button')

const div = document.createElement('div')
document.body.append(div)

const div2 = document.createElement('div2')
document.body.append(div2)

const titulo = document.createTextNode("Uchat")
const tituloo = document.createElement('h4')
tituloo.append(titulo)
div.append(tituloo)

button.append('Send')
div2.append(button)
div2.append(input)

const style = document.createElement('style');
style.innerHTML = `

    h4{
    font-size: 50px;
    text-align:center;
    color:green;
}

    div{
    overflow:auto;
    background:skyblue;
    height:90%;
}
    div2{
    position:absolute;
    overflow:auto;
    height:10%;
    width:99%;
    bottom:00px;
    border: 3px solid #555;
    background: #428bca;
    z-index: 1;
}
   button{
    position:absolute;
	width:60px;
	height:60px;
	bottom:2px;
	right:60px;
	background-color:#0C9;
	color:#FFF;
	border-radius:50px;
	text-align:center;
    z-index: 2;
}

   input{
    position:absolute;
	width:80%;
	height:50%;
	bottom:10px;
	right: 180px;
	text-align:left;
    z-index: 2;
}

li{
    display:block;
    max-width:50%; 
    max-height:50%;
    word-break:break-all; 
    background: #F0FFFF;
    border-radius: 25px;
}
ul{
    
    list-style-type: none;
    word-break:break-all;

}
h1{
    font-size: 15px;
    position: relative;
    left:30px;
}
h2{
    font-size: 20px;
    position: relative;
}
h3{
    font-size: 10px;
    position: relative;
    right:-20px;
    color:gray;
    
    
}

img{
    width:100px;
    height:100px;}
  `;
document.body.appendChild(style);
var fecha = new Date()

//location.reload()

/**window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        rectangulo.style.display = 'none'
        input.style.display = 'none'

    }
    else {
        rectangulo.style.display = 'block'
        input.style.display = 'block'
    }
};*/

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        if (input.value.length <= 140) {
            fetch('http://ubeje.xyz:3000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender: "Gabriel",
                    message: input.value,
                    date: fecha.toLocaleString(),
                })
            })
            input.value = ('')
        }
        else {
            alert("Hay más de 140 caracteres")

        }

    }

})

button.addEventListener('click', () => {
    if (input.value.length <= 140) {
        fetch('http://ubeje.xyz:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: "Gabriel",
                message: input.value,
                date: fecha.toLocaleString(),
            })
        })
        input.value = ('')
    }
    else {
        alert("Hay más de 140 caracteres")

    }

})

const listaDeMensajes = document.createElement('ul')
div.append(listaDeMensajes)
listaDeMensajes.id = 'lista'

function autorefresh() {
    fetch('http://ubeje.xyz:3000/messages').then((r) => {
        return r.json()
    }).then((j) => {
        j.forEach((mensaje) => {
            if (mensaje.id > (document.getElementById("lista").getElementsByTagName('li').length)) {
                const unMensaje = document.createElement('li')
                const h1 = document.createElement('h1')
                const h2 = document.createElement('h2')
                const h3 = document.createElement('h3')

                h1.append(mensaje.sender)
                h2.append(mensaje.message)
                h3.append(mensaje.date)



                if (/.jpg/.test(mensaje.message) || /.gif/.test(mensaje.message) || /.svg/.test(mensaje.message) || /.png/.test(mensaje.message)) {
                    const img = document.createElement('img')
                    img.src = mensaje.message
                    unMensaje.append(h1)
                    unMensaje.append(img)
                    unMensaje.append(h3)


                }
                else {
                    unMensaje.append(h1)
                    unMensaje.append(h2)
                    unMensaje.append(h3)

                }

                listaDeMensajes.append(unMensaje)
            }
        })
    })
}

autorefresh()
setInterval(() => autorefresh(), 3000)

