export function bindMethods(component, names) {
  if(_.isString(names)) {
    names = [names];
  }
  names.forEach((name) =>
      component[name] = component[name].bind(component)
  );
}
