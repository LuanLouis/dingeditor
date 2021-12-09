export default function selectFile(acceptTypes?: string) {
  const promise = new Promise((resolve) => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('multiple', 'true');
    fileInput.setAttribute('accept', acceptTypes || '*');
    fileInput.click();
    fileInput.onchange = () => {
      const { files } = fileInput;
      resolve(Array.from(files));
    };
  });
  return promise;
}