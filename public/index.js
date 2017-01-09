var socket = io()

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('chat-form')
  var chat = document.getElementById('chat')
  form.addEventListener('submit', function(event){
    event.preventDefault()
    socket.emit('chat message', { message: event.target.message.value })
    var container = document.createElement('div')
    var newdiv = document.createElement('span')
    container.className = 'message-container'
    newdiv.className = 'message me'
    newdiv.innerText = event.target.message.value
    container.appendChild(newdiv)
    chat.appendChild(container)
    event.target.message.value = ""
  })

  socket.on('chat response', function(response) {
    var container = document.createElement('div')
    var newdiv = document.createElement('span')
    container.className = 'message-container bot-container'
    newdiv.className = 'message bot'
    newdiv.innerText = response.message
    container.appendChild(newdiv)
    chat.appendChild(container)
  })

})