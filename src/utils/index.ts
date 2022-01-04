const fileNameRE = /^\.\/([^\s]+)\.ts$/;

function getFileName(str: string) {
  let idx = str.lastIndexOf('/');
  idx = idx > -1 ? idx : str.lastIndexOf('\\');
  if (idx < 0) return str;
  return str.substring(idx + 1);
}

export function importAll(modulesContext: any): ImportItem[] {
  return Object.keys(modulesContext).map((modulesPath: string) => {
    const moduleName = (modulesPath.match(fileNameRE) as RegExpMatchArray)[1];
    const fileName = getFileName(modulesPath)
      .replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/\..*/, '');

    return {
      fileName,
      moduleName,
      camelModuleName: moduleName.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : '')),
      module: modulesContext[modulesPath].default,
    };
  });
}
