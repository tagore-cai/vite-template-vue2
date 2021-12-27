const fileNameRE = /^\.\/([^\s]+)\.ts$/;
export function importAll(modulesContext: any): ImportAllResult[] {
  return Object.keys(modulesContext).map((modulesPath: string) => {
    const moduleName = (modulesPath.match(fileNameRE) as RegExpMatchArray)[1];
    return {
      moduleName,
      camelModuleName: moduleName.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : '')),
      module: modulesContext[modulesPath].default,
    };
  });
}
