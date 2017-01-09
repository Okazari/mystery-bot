var socket = io()

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('chat-form')
  var chat = document.getElementById('chat')
  form.addEventListener('submit', function(event){
    event.preventDefault()
    socket.emit('chat message', { message: event.target.message.value })
    var newdiv = document.createElement('div')
    newdiv.innerText = "Moi : " + event.target.message.value
    chat.appendChild(newdiv)
    event.target.message.value = ""
  })

  socket.on('chat response', function(response) {
    var newdiv = document.createElement('div')
    newdiv.innerText = "Mystery bot : " + response.message
    chat.appendChild(newdiv)
  })

})