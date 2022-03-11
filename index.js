<!DOCTYPE html>
<html>
<head>
    <style>
        #v1, #c1, #c2 { display: none }
    </style>
</head>
<body>
<video id="v1" width="320" height="240" autoplay></video>
<canvas id="c1" width="320" height="240"></canvas>
<canvas id="c2" width="320" height="240"></canvas>
<div id="opentok-publishers"></div>
<div id="opentok-subscribers"></div>
<script src="https://static.opentok.com/v2/js/opentok.min.js"></script>
<script>
    const sessionId = '2_MX40NzIwMzYzNH5-MTYxOTA0MTE4NTIwN352dWtWeEZVYzUxZy8yYUVmMnNodUo4TzZ-fg'
    const apiKey = '47203634'
    const token = 'T1==cGFydG5lcl9pZD00NzIwMzYzNCZzaWc9YWUyNGRjZGIzYTI5YzQ5YjZiNWIyMjExMWYwZGJjNGZmYTM1MzU2NjpzZXNzaW9uX2lkPTJfTVg0ME56SXdNell6Tkg1LU1UWXhPVEEwTVRFNE5USXdOMzUyZFd0V2VFWlZZelV4Wnk4eVlVVm1Nbk5vZFVvNFR6Wi1mZyZjcmVhdGVfdGltZT0xNjE5MDQxMjI1Jm5vbmNlPTAuOTY1ODE2NTMxNTgyNDI1NCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjE5MDQ0ODI0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'

    const v1 = document.getElementById('v1')
    const c1 = document.getElementById('c1')
    const c2 = document.getElementById('c2')
    const c1Ctx = c1.getContext('2d')
    const c2Ctx = c2.getContext('2d')

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { v1.srcObject = stream })

    v1.addEventListener('play', () => {
        setInterval(addText, 0)
        //setInterval(addImage, 0)
    })

    function addText() {
        const overlayImg = new Image()
        overlayImg.src = 'vonage.png'
        // User Video
        c1Ctx.drawImage(v1, 0, 0, 320, 240)

        // Overlay Image
        c1Ctx.drawImage(overlayImg, 10, 10, 35, 30) // x, y of top-left, width, height

        // User Video
        c1Ctx.drawImage(v1, 0, 0, 320, 240)

        // Rectangle
        c1Ctx.beginPath();
        c1Ctx.fillStyle = "#584fa8";
        c1Ctx.rect(0, 190, 155, 40); // x, y of top-left, width, height
        c1Ctx.fill();

        // Text
        c1Ctx.font = "20px Monospace";
        c1Ctx.fillStyle = "white";
        c1Ctx.fillText('Cory Althoff', 10, 215); // x, y of top-left

    }


    function addImage() {
        //const overlayImg = new Image()
        //overlayImg.src = 'vonage.png'
        // User Video
        //c2Ctx.drawImage(v1, 0, 0, 320, 240)

        // Overlay Image
       // c2Ctx.drawImage(overlayImg, 10, 10, 35, 30) // x, y of top-left, width, height
    }

    function streamVideo(context){
        // Initialize session
        const session = OT.initSession(apiKey, sessionId)

        // Create publisher
        const publisher = OT.initPublisher("opentok-publishers", {
            videoSource: c1.captureStream().getVideoTracks()[0],
            width: 320,
            height: 240
        })

        // Once connected to session, publish the publisher
        session.connect(token, () => {
            session.publish(publisher)
        })

        // Show other users' streams
        session.on('streamCreated', event => {
            session.subscribe(event.stream, "opentok-subscribers")
        })

    }

    streamVideo(c1)

</script>
</body>
</html>
