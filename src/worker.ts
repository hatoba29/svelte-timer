let timerID: NodeJS.Timer

onmessage = (msg: MessageEvent<string>) => {
  const { data } = msg

  if (data === "start") {
    timerID = setInterval(() => postMessage(null), 1000)
  } else if (data === "restart") {
    clearInterval(timerID)
    timerID = setInterval(() => postMessage(null), 1000)
  } else {
    console.error("undefined method")
  }
}

export {}
