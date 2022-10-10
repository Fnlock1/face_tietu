// ref https://github.com/WebDevSimplified/Face-Detection-JavaScript.git
const video = document.getElementById('video')  // video element
 
Promise.all([  //全部完成後才執行
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}


video.addEventListener('play', () => {   

      let img = new Image();
      img.src = "./100.jfif";



  const canvas = faceapi.createCanvasFromMedia(video)  //创建画布
  document.body.append(canvas)  //添加到body
  const displaySize = { width: video.width, height: video.height } //获取视频的宽高
  faceapi.matchDimensions(canvas, displaySize)  //设置画布的宽高
  setInterval(async () => {    //每隔一段时间检测一次
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()  //检测人脸
    const resizedDetections = faceapi.resizeResults(detections, displaySize) // 调整检测结果的大小
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)  //清空画布
    // faceapi.draw.drawDetections(canvas, resizedDetections)  // 画出人脸框
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)  // 画出人脸特征点
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)  // 画出人脸表情


    //画布上放图片
let ctx = canvas.getContext("2d");
    ctx.drawImage(img, resizedDetections[0].alignedRect._box._x-40, resizedDetections[0].alignedRect._box._y-60);
  }, 100)
}

)