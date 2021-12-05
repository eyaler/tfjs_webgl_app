/* ------------------------------------------------ *
 * The MIT License (MIT)
 * Copyright (c) 2020 terryky1220@gmail.com
 * ------------------------------------------------ */


GLUtil.create_texture = function (gl)
{
    let texid = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texid);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    return texid;
}

GLUtil.create_2d_texture = function (gl, imgbuf, width, height)
{
    let texid = GLUtil.create_texture (gl);
    gl.bindTexture (gl.TEXTURE_2D, texid);
    gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, width, height,
                                  0, gl.RGBA, gl.UNSIGNED_BYTE, imgbuf);
    return texid;
}


/* ---------------------------------------------------------------- *
 *  Create Image Texture
 * ---------------------------------------------------------------- */
GLUtil.create_image_texture = function (gl, url)
{
    let texid = GLUtil.create_texture (gl);
    let teximage = new Image();
    teximage.crossOrigin = "anonymous";
    teximage.onload = function ()
    {
        gl.bindTexture(gl.TEXTURE_2D, texid);
        gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, teximage);
        gl.generateMipmap (gl.TEXTURE_2D);
    }
    teximage.src = url;

    return texid;
}

GLUtil.create_image_texture2 = function (gl, url)
{
    let image_tex = {};
    image_tex.ready = false;
    let texid = GLUtil.create_texture (gl);
    let teximage = new Image();
    teximage.crossOrigin = "anonymous";

    teximage.onload = function ()
    {
        gl.bindTexture(gl.TEXTURE_2D, texid);
        gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, teximage);
        gl.generateMipmap (gl.TEXTURE_2D);
        image_tex.ready = true;
    }
    teximage.src = url;

    image_tex.texid = texid;
    image_tex.image = teximage;
    return image_tex;
}

GLUtil.create_image_texture_from_file = function (gl, url)
{
    let image_tex = {};
    image_tex.ready = false;
    let texid = GLUtil.create_texture (gl);
    let teximage = new Image();
    let reader = new FileReader();

    teximage.onload = function ()
    {
        gl.bindTexture(gl.TEXTURE_2D, texid);
        gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, teximage);
        gl.generateMipmap (gl.TEXTURE_2D);
        image_tex.ready = true;
    }

    reader.onload = function (event)
    {
        let src = event.target.result;
        teximage.src = src;
    }
    reader.readAsDataURL(url);

    image_tex.texid = texid;
    image_tex.image = teximage;
    return image_tex;
}

GLUtil.is_image_texture_ready = function (image_tex)
{
    return image_tex.ready;
}

/* ---------------------------------------------------------------- *
 *  Create Video Texture
 * ---------------------------------------------------------------- */
GLUtil.create_video_texture = function (gl, url, muted=false)
{
    let video_tex = {};
    video_tex.ready = false;
    video_tex.texid = GLUtil.create_texture (gl);

    let video = document.createElement('video');
    video.autoplay = true;
    video.muted    = muted;
    video.loop     = true;
    video.crossOrigin = "anonymous";

    video.src = url;

    // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_textures_in_WebGL
    // Waiting for these 2 events ensures
    // there is data in the video

    var playing = false;
    var timeupdate = false;

    video.addEventListener('playing', function() {
       playing = true;
       checkReady();
    }, true);

    video.addEventListener('timeupdate', function() {
       timeupdate = true;
       checkReady();
    }, true);

    function checkReady() {
        ready = playing && timeupdate);
    }

    video_tex.video = video;
    video.play();
    return video_tex;
}

GLUtil.restart_video_texture = function (video_tex)
{
    if (GLUtil.is_camvid_ready(video_tex)) {video_tex.video.currentTime = 0;}
}


GLUtil.stop_video = function (video_tex)
{
    try
    {
        video_tex.video.pause();
        video_tex.video.src='';
        video_tex.ready = false;
    }
    catch(e){
        //console.log(e);
    }
}


// camera and video:
GLUtil.is_camvid_ready = function (camvid_tex)
{
    return camvid_tex.ready;
}

GLUtil.get_resolution = function (camvid_tex)
{
    let width  = 0;
    let height = 0;
    if (GLUtil.is_camvid_ready(camvid_tex))
    {
        width  = tex.video.videoWidth;
        height = tex.video.videoHeight;
    }
    return {
        w: width,
        h: height,
    };
}

GLUtil.update_camvid_texture = function (gl, camvid_tex)
{
    if (GLUtil.is_camvid_ready(camvid_tex))
    {
        gl.bindTexture(gl.TEXTURE_2D, camvid_tex.texid);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, camvid_tex.video);
    }
}

/* ---------------------------------------------------------------- *
 *  Create Web Camera Texture
 * ---------------------------------------------------------------- */
GLUtil.create_camera_texture = function (gl)
{
    let camera_tex = {};
    camera_tex.ready = false;
    camera_tex.texid = GLUtil.create_texture (gl);

    let video = document.createElement('video');
    video.autoplay = true;
    video.loop     = true;
    video.muted    = true;

    navigator.mediaDevices = navigator.mediaDevices ||
                             navigator.mozGetUserMedia
                             navigator.webkitGetUserMedia;
    if (!navigator.mediaDevices)
    {
        alert('not supported navigator.mediaDevices');
        return camera_tex;
    }

    function on_camera_ready (stream)
    {
        video.onloadedmetadata = (event) => {camera_tex.ready = true;};
        video.srcObject        = stream;
        video.play();
    }

    function on_camera_failed (err)
    {
        alert('failed to initialize a camera');
        return camera_tex;
    }

    const constraints = {
        audio : true,
        video: {
            width:  {ideal: 640},
            height: {ideal: 480}
        }
    };

    navigator.mediaDevices.getUserMedia (constraints).then (on_camera_ready).catch(on_camera_failed);

    camera_tex.video = video;
    return camera_tex;
}


GLUtil.stop_camera = function (camera_tex)
{
    try
    {
        camera_tex.video.srcObject.getTracks().forEach(track => track.stop());
        camera_tex.video.srcObject='';
        camera_tex.ready = false;
    }
    catch(e){
        //console.log(e);
    }
}

