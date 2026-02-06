import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Copy, MonitorUp, StopCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import socket from "../socket";
import Toast from "../components/ui/Toast";

/* ICE Config */
const iceConfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
};

export default function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);

  const [isSharing, setIsSharing] = useState(false);
  const [status, setStatus] = useState("Waiting for peer...");
  const [showToast, setShowToast] = useState(false);

  /* -------------------- */
  /* Create Peer */
  /* -------------------- */
  const getPeer = () => {
    if (peerRef.current) return peerRef.current;

    const peer = new RTCPeerConnection(iceConfig);

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("signal", {
          roomId,
          signal: { candidate: e.candidate },
        });
      }
    };

    peer.ontrack = (e) => {
      videoRef.current.srcObject = e.streams[0];
      setStatus("Connected");
    };

    peerRef.current = peer;
    return peer;
  };

  /* -------------------- */
  /* Socket Signaling */
  /* -------------------- */
  useEffect(() => {
    socket.emit("join-room", roomId);

    const handleSignal = async (signal) => {
      const peer = getPeer();

      try {
        // OFFER
        if (signal.offer) {
          if (peer.signalingState !== "stable") return;

          await peer.setRemoteDescription(
            new RTCSessionDescription(signal.offer)
          );

          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);

          socket.emit("signal", {
            roomId,
            signal: { answer },
          });
        }

        // ANSWER
        if (signal.answer) {
          await peer.setRemoteDescription(
            new RTCSessionDescription(signal.answer)
          );
        }

        // ICE Candidate
        if (signal.candidate) {
          await peer.addIceCandidate(
            new RTCIceCandidate(signal.candidate)
          );
        }
      } catch (err) {
        console.error("Signal Error:", err);
      }
    };

    // Late Join → Send Offer again
    const handlePeerJoined = async () => {
      if (!isSharing) return;

      const peer = getPeer();

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      socket.emit("signal", {
        roomId,
        signal: { offer },
      });
    };

    socket.on("signal", handleSignal);
    socket.on("peer-joined", handlePeerJoined);

    return () => {
      socket.off("signal", handleSignal);
      socket.off("peer-joined", handlePeerJoined);

      peerRef.current?.close();
    };
  }, [roomId, isSharing]);

  /* -------------------- */
  /* Start Sharing */
  /* -------------------- */
  const startShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      // Local Preview
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;

      const peer = getPeer();

      // Replace tracks instead of duplicate
      stream.getTracks().forEach((track) => {
        const sender = peer
          .getSenders()
          .find((s) => s.track?.kind === track.kind);

        if (sender) {
          sender.replaceTrack(track);
        } else {
          peer.addTrack(track, stream);
        }
      });

      // Create Offer
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      socket.emit("signal", {
        roomId,
        signal: { offer },
      });

      setIsSharing(true);
      setStatus("Live");

      // Auto stop if user ends sharing
      stream.getVideoTracks()[0].onended = stopShare;
    } catch (err) {
      console.error("Error starting share:", err);
    }
  };

  /* -------------------- */
  /* Stop Sharing */
  /* -------------------- */
  const stopShare = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());

    peerRef.current?.close();
    peerRef.current = null;

    videoRef.current.srcObject = null;

    setIsSharing(false);
    setStatus("Stopped");
  };

  /* -------------------- */
  /* Leave Room */
  /* -------------------- */
  const leaveRoom = () => {
    stopShare();
    navigate("/");
  };

  /* -------------------- */
  /* Copy Link */
  /* -------------------- */
  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <motion.div
      className="min-h-screen bg-background text-white flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Toast */}
      <Toast
        message="Link copied to clipboard"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Status */}
      <div className="absolute top-8 z-10">
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
          <span className="text-xs font-semibold uppercase text-gray-300">
            {status}
          </span>
        </div>
      </div>

      {/* Video */}
      <div className="w-full max-w-6xl px-6">
        <div className="aspect-video rounded-3xl bg-surface/40 border border-white/5 overflow-hidden shadow-2xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-10 z-50">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-surface/80 border border-white/10 backdrop-blur-xl shadow-2xl">
          {!isSharing ? (
            <button
              onClick={startShare}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary font-bold"
            >
              <MonitorUp className="w-4 h-4" />
              Share Screen
            </button>
          ) : (
            <button
              onClick={stopShare}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-400"
            >
              <StopCircle className="w-4 h-4" />
              Stop Sharing
            </button>
          )}

          <button
            onClick={copyLink}
            className="w-12 h-12 rounded-xl hover:bg-white/5 flex items-center justify-center"
          >
            <Copy className="w-5 h-5" />
          </button>

          <button
            onClick={leaveRoom}
            className="w-12 h-12 rounded-xl hover:bg-red-500/10 text-red-400 flex items-center justify-center"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
