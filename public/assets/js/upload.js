// XHR
function startUploadUsingXHR() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    var chunkSize = 1024 * 1024;
    var totalChunks = Math.ceil(file.size / chunkSize);
    var currentChunk = 1;

    function uploadChunk() {
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        formData.append('file', file.slice((currentChunk - 1) * chunkSize, currentChunk * chunkSize));
        formData.append('chunkNumber', currentChunk);
        formData.append('totalChunks', totalChunks);
        formData.append('fileName', file.name);

        xhr.open('POST', '/upload', true);

        xhr.upload.addEventListener('progress', function (event) {
            if (event.lengthComputable) {
                var progress = Math.round((event.loaded / event.total) * 100);
                updateProgressBar(progress);
            }
        });

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var progress = Math.ceil((currentChunk / totalChunks) * 100);
                    updateProgressBar(progress);
                    if (currentChunk < totalChunks) {
                        currentChunk++;
                        uploadChunk();
                    } else {
                        updateProgressBar(100);
                    }
                } else {
                    console.error('Upload failed. Status:', xhr.status);
                }
            }
        };
        xhr.send(formData);
    }
    uploadChunk();
}

// fetch
function startUploadUsingFetch() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    var chunkSize = 1024 * 1024;
    var totalChunks = Math.ceil(file.size / chunkSize);
    var currentChunk = 1;

    function uploadChunk() {
        var formData = new FormData();
        formData.append('file', file.slice((currentChunk - 1) * chunkSize, currentChunk * chunkSize));
        formData.append('chunkNumber', currentChunk);
        formData.append('totalChunks', totalChunks);
        formData.append('fileName', file.name);

        // Create a Fetch request
        fetch('/upload', {
                method: 'POST',
                body: formData,
                onProgress: function (event) {
                    if (event.lengthComputable) {
                        var progress = Math.round((event.loaded / event.total) * 100);
                        updateProgressBar(progress);
                    }
                }
            })
            .then(function (response) {
                if (!response.ok) {
                    console.error('Upload failed. Status:', response.status);
                    return Promise.reject('Upload failed');
                }
                var progress = Math.ceil((currentChunk / totalChunks) * 100);
                updateProgressBar(progress);

                if (currentChunk < totalChunks) {
                    currentChunk++;
                    uploadChunk();
                } else {
                    updateProgressBar(100);
                }
            })
            .catch(function (error) {
                console.error('Upload failed:', error);
            });
    }
    uploadChunk();
}

// using axios
function startUpload() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    var chunkSize = 1024 * 1024; // 1 MB chunks (adjust as needed)
    var totalChunks = Math.ceil(file.size / chunkSize);
    var currentChunk = 1;

    // Function to handle each chunk upload
    function uploadChunk() {
        var formData = new FormData();
        formData.append('file', file.slice((currentChunk - 1) * chunkSize, currentChunk * chunkSize));
        formData.append('chunkNumber', currentChunk);
        formData.append('totalChunks', totalChunks);
        formData.append('fileName', file.name);

        axios.post('/upload', formData, {
                onUploadProgress: function (progressEvent) {
                    var progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    updateProgressBar(progress);
                }
            })
            .then(function (response) {
                // Update progress or handle success
                var progress = Math.ceil((currentChunk / totalChunks) * 100);
                updateProgressBar(progress);

                if (currentChunk < totalChunks) {
                    // Continue to the next chunk
                    currentChunk++;
                    uploadChunk();
                } else {
                    updateProgressBar(100);
                }
            })
            .catch(function (error) {
                console.error('Upload failed:', error);
            });
    }

    // Start the upload process
    uploadChunk();
}

function updateProgressBar(progress) {
    var progressElement = document.getElementById('progress');
    if (progressElement.classList.contains('d-none')) {
        progressElement.classList.remove('d-none');
    }
    var progressBar = progressElement.querySelector('.progress-bar');
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
    progressBar.innerText = progress + '%';
}
