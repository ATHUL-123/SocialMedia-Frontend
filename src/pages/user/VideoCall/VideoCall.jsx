import React from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function VideoCall() {
    const navigate = useNavigate()
    const {user} =useSelector((state)=>state.auth)
    const { roomId } = useParams();
    const handleLeaveRoom= ()=>{
      
    
        navigate('/chat');
      }
    const myMeeting = async (element) => {
        // generate Kit Token
        const appID = 1397681211;
        const serverSecret = "f88ac0a36d6a24ce1cd8c1019c585f4c";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,user._id,user.userName)
         // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container:element,
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton:true,
            showPreJoinView: false ,
            turnOnCameraWhenJoining: true,
            turnOnMicrophoneWhenJoining: false,
            showLeaveRoomConfirmDialog: false,
            onLeaveRoom: handleLeaveRoom,
            onUserLeave: handleLeaveRoom,
  
        })
    }

    return (
        <div>
            <div ref={myMeeting} />
        </div>
    );
}

export default VideoCall;
