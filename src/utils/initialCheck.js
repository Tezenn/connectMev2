const check = async function() {
  console.log('trying to check token');
  if (this.props.store.currentUser.token) {
    console.log('token found');
    await fetch('http://localhost:3009/check', {
      headers: {
        authorization: 'bearer ' + this.props.store.currentUser.token
      }
    })
      .then(res => res.json())
      .then(res => this.props.login(res));
    this.setState({ tokenFound: true });
  } else {
    console.log('before clearing lets check store', this.props.store);
    console.log('token not found so i am clearing');
    this.setState({ tokenFound: false });
    this.props.clear();
  }
};

export default check;
