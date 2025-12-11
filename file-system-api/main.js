async function getFile(){
    console.log('get file')
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    console.log('file ', file)
    return file;
}

async function checkOrCreateDir(){
    const dirName = "directoryToGetName";

    const currentDirHandle = await window.showDirectoryPicker()

    // assuming we have a directory handle: 'currentDirHandle'
    const subDir = await currentDirHandle.getDirectoryHandle(dirName, {
    create: true,
    });

    console.log('subDir', subDir)
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('find-file').addEventListener('click', getFile)
    document.getElementById('check-or-create-dir').addEventListener('click', checkOrCreateDir)
})