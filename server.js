const server = require("ws").Server;
const log4js = require("log4js");
const ws = new server({ port: 23010 });

// logger settings
log4js.configure({
  appenders: {
    out: { type: "stdout" },
    file: { type: "file", filename: `./logs/${getLogFileName()}.log` },
  },
  categories: {
    default: { appenders: ["file"], level: "all" },
  },
});
const logger = log4js.getLogger();

// Server start.
console.log("Start logging server");

ws.on("connection", (socket) => {
  socket.on("message", (ms) => {
    logger.info(ms);
  });
});

function getLogFileName() {
  let now = new Date();
  return (
    "richDesktopExperiment_" +
    `${now.getFullYear()}` +
    "-" +
    `${now.getMonth()}` +
    1 +
    "-" +
    `${now.getDate()}` +
    "_" +
    `${now.getMinutes()}` +
    "-" +
    `${now.getSeconds()}`
  );
}
