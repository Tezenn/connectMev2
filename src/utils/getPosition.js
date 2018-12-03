const getCurrentPosition = async function() {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      this.props.setLocation(position);
    });
  } else console.log('Geolocation unavailable in your browser');
  return;
};

export default getCurrentPosition;
