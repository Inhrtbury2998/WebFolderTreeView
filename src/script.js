document.addEventListener("DOMContentLoaded", function() {
    const folderUpload = document.getElementById('folder-upload');
    const folderContainer = document.getElementById('folder-container');

    folderUpload.addEventListener('change', function(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.webkitRelativePath.split('/').length === 1) {
                // It's a root level file
                const fileElement = document.createElement('div');
                fileElement.classList.add('file');
                fileElement.textContent = file.name;
                folderContainer.appendChild(fileElement);
            } else {
                // It's a file in a subfolder
                let folderPath = file.webkitRelativePath.split('/');
                let currentFolder = folderContainer;
                for (let j = 0; j < folderPath.length - 1; j++) {
                    let folderName = folderPath[j];
                    let subFolder = currentFolder.querySelector(`.folder[data-folder-name="${folderName}"]`);
                    if (!subFolder) {
                        subFolder = document.createElement('div');
                        subFolder.classList.add('folder');
                        subFolder.setAttribute('data-folder-name', folderName);
                        subFolder.textContent = folderName;
                        subFolder.innerHTML += '<div class="folder-content"></div>';
                        currentFolder.appendChild(subFolder);
                    }
                    currentFolder = subFolder.querySelector('.folder-content');
                }
                const fileElement = document.createElement('div');
                fileElement.classList.add('file');
                fileElement.textContent = folderPath[folderPath.length - 1];
                currentFolder.appendChild(fileElement);
            }
        }
      clickAddEventListener();
    });
  function clickAddEventListener(){
    const folders = document.querySelectorAll('.folder');
    folders.forEach(folder => {
        folder.addEventListener('click', function(event) {
            event.stopPropagation(); 
            const folderContent = this.querySelector('.folder-content');
            if (folderContent.style.display === 'none' || folderContent.style.display === '') {
                folderContent.style.display = 'block';
            } else {
                folderContent.style.display = 'none';
            }
        });
    });
  }
});