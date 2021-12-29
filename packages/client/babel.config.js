module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: ["react-native-web", [
    "rename-jsx-attribute",
    {
      "attributes": {
        "onPress": "onClick",
        "onPressIn": "onMouseDown",
        "onPressOut": "onMouseUp",
        "onStartShouldSetResponder": "onFocus",
        "onResponderTerminationRequest": null,
        "onResponderGrant": null,
        "onResponderMove": "onMouseMove",
        "onResponderRelease": "onMouseUp",
        "onResponderTerminate": "onBlur",
      }
    }
  ]],
};
