<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    </head>
    <body class="antialiased">
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>Upload File In Chunks</h4>
                        </div>
                        <div class="card-body">
                            <form id="uploadForm" action="javascript:void(0);" method="POST" enctype="multipart/form-data">
                                @csrf
                                <div class="form-group mb-4">
                                    <label for=""></label>
                                    <input type="file" name="file" id="fileInput" class="form-control">
                                </div>
                                <div class="form-group mb-4">
                                    <button class="btn btn-md btn-primary" onclick="startUpload()">
                                        Submit
                                    </button>
                                </div>
                            </form>
                            <div class="progress d-none" id="progress">
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/bootstrap.bundle.min.js"></script>
        <!-- disable if you want to use other methods not axios -->
        <script src="assets/js/axios.min.js"></script>
        <script src="assets/js/upload.js"></script>
    </body>
</html>
