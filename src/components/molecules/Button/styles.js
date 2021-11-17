const styles = {
  bgColor: disabled =>
    disabled ? ['#bdc3c7', '#8e9eab'] : ['#464CE0', '#6877F4'],
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'rgba(81, 90, 230, 0.3)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 14,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
};

export default styles;
