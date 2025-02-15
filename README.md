# A fork of https://terryky.github.io/tfjs_webgl_app with some added FaceSwap sugar for videos:
## https://j.mp/facemesh
1. option to switch between camera and video
2. video rewind button
3. output can be recorded* (video input will be recorded from beginning to end)
4. respect PNG mask transparency
5. allow white/black/green/blue background
6. mask can be removed
7. both image masks and videos can be applied via:
   1. upload buttons
   2. drag and drop file from computer
   3. drag and drop file/HTMLelement/link from web (depending on server CORS)

known issues:
1. recording the video in firefox will kill audio output until a new video is loaded (https://bugzilla-dev.allizom.org/show_bug.cgi?id=1178751)
2. video playback is badly disrupted in recent versions of Firefox (https://github.com/tensorflow/tfjs/issues/5947)

# tfjs_webgl_app
WebGL visualization apps using TensorFlow.js

## Handpose
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/handpose).<br>
[<img src="handpose/handpose.gif" width=244>](https://eyaler.github.io/tfjs_webgl_app/handpose)

## 3D Pose estimation
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/pose_estimation_3d).<br>
[<img src="pose_estimation_3d/pose_estimation_3d.gif" width=400>](https://eyaler.github.io/tfjs_webgl_app/pose_estimation_3d)

## FaceSwap (face-landmarks-detection)
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/face_landmark).<br>
[<img src="face_landmark/facemesh.gif" width=400>](https://eyaler.github.io/tfjs_webgl_app/face_landmark)

## U^2-Net portrait drawing
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/face_portrait).(not stable)<br>
[<img src="face_portrait/face_portrait.gif" width=400>](https://eyaler.github.io/tfjs_webgl_app/face_portrait)

## Blazepose (upper_body)
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/blazepose).<br>
[<img src="blazepose/blazepose.gif" width=300>](https://eyaler.github.io/tfjs_webgl_app/blazepose)

## Blazepose (full_body)
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/blazepose_fullbody).<br>
[<img src="blazepose_fullbody/blazepose_fullbody.gif" width=300>](https://eyaler.github.io/tfjs_webgl_app/blazepose_fullbody)

## Face Segmentation (BiseNetv2)
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/face_segmentation).<br>
[<img src="face_segmentation/face_segmentation.gif" width=300>](https://eyaler.github.io/tfjs_webgl_app/face_segmentation)

## Depth Estimation (DenseDepth)
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/dense_depth).<br>
[<img src="dense_depth/dense_depth.gif" width=300>](https://eyaler.github.io/tfjs_webgl_app/dense_depth)

## Higher Accuracy Face Detection (DBFace)
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/dbface).<br>
[<img src="dbface/dbface.gif" width=300>](https://eyaler.github.io/tfjs_webgl_app/dbface)

## Age and Gender estimation
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/face_inspector).<br>
[<img src="face_inspector/face_inspector.gif" width=300>](https://eyaler.github.io/tfjs_webgl_app/face_inspector)

## Classification
Live demo is [here](https://eyaler.github.io/tfjs_webgl_app/classification).<br>
[<img src="classification/classification.gif" width=300>](https://eyaler.github.io/tfjs_webgl_app/classification)


# Acknowledgements
- https://github.com/tensorflow/tfjs-models
- https://github.com/google/mediapipe
- https://github.com/PINTO0309/PINTO_model_zoo/tree/master/061_U-2-Net/20_portrait_model
- https://github.com/openvinotoolkit/open_model_zoo/tree/master/demos/python_demos/human_pose_estimation_3d_demo
- https://github.com/MaybeShewill-CV/bisenetv2-tensorflow
- https://github.com/ialhashim/DenseDepth
- https://github.com/dlunion/DBFace
- https://github.com/yu4u/age-gender-estimation
- https://github.com/PINTO0309/PINTO_model_zoo
