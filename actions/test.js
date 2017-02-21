const customResponseHandler = (bp, event, text, options) => {
  let sender, sendintTo
  if (event.platform === 'facebook') {
    sender = bp.messenger
    sendingTo = event.user.id
  } else if (event.platform === 'discord') {
    sender = bp.discord
    sendingTo = event.channel.id
  }
  sender.sendText(sendingTo, text, options)
}

module.exports = (bp, rs, event) => {
  //doAyncStuff.then(() => {
      options = {
          quick_replies: [
            {
              content_type :"TEXT",
              title: "Next please",
              payload: "Next please"
            },
            {
              content_type :"TEXT",
              title: "Previous please",
              payload: "Previous please"
            }
          ]
        }
      customResponseHandler(bp, event, "Heyyah !", options)
  //})
}