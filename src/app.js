import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewrouters from './routes/api/view.routers.js'
import { Server } from 'socket.io';

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use('/', viewrouters);

const httpServer = app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
)

const io = new Server(httpServer);

io.on('connection',socket=>{
    console.log('Cliente conectadodd');

    socket.on('conexion',data=>{
     //    console.log(`soy el dato ${data}`)
     //   io.emit("messageLogs",{products})
    })
})
