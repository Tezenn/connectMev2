const getCurrentPosition = async function() {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      this.props.setLocation(position);
      fetch('http://localhost:3009/closeUsers', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          coords: [position.coords.latitude, position.coords.longitude]
        })
      })
        .then(res => res.json())
        .then(res => this.props.loadCloseUsers(res));
    });
  } else console.log('Geolocation unavailable in your browser');
  return;
};

export default getCurrentPosition;
