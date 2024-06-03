import io from "socket.io-client";
import axioKit from "./axioKit";
import handlePagination from "./pagination";
import fullName from "./fullName";
import calculateDiff from "./calculateDiff";
import Male from "../../assets/male.jpg";
import Female from "../../assets/female.jpg";
import isJpegOrJpgFile from "./isJpegOrJpgFile";
import fullAddress from "./fullAddress";
import bulkPayload from "./bulkPayload";
import globalSearch from "./globalSearch";
import useCountdown from "./useCountdown";
import taskBadge from "./taskBadge";

const ENDPOINT = "http://localhost:5001";
// const ENDPOINT = window.location.origin;
const socket = io.connect(ENDPOINT);

const PresetImage = (gender) => {
  if (gender) return Male;

  return Female;
};

export {
  PresetImage,
  ENDPOINT,
  axioKit,
  socket,
  handlePagination,
  fullName,
  calculateDiff,
  isJpegOrJpgFile,
  fullAddress,
  bulkPayload,
  globalSearch,
  useCountdown,
  taskBadge,
};
