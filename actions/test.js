module.exports = (send) => {
  //doAyncStuff.then(() => {
      console.log('coucou')
      const options = {
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
      send("Heyyah !", options)
  //})
}