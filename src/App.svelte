<script lang="ts">
  import dayjs from "dayjs"
  import duration from "dayjs/plugin/duration"
  import Worker from "./worker?worker"
  dayjs.extend(duration)

  let status = "init"
  const text = {
    init: {
      title: "Dual Timer",
      btn: "일하기",
    },
    work: {
      title: "일하는 중...",
      btn: "쉬기",
    },
    rest: {
      title: "쉬는 중...",
      btn: "일하기",
    },
  }

  const timer = new Worker()
  let work = dayjs.duration(600, "minutes")
  let rest = dayjs.duration(240, "minutes")

  timer.onmessage = () => {
    if (status === "work") {
      work = work.subtract(1, "second")
    } else if (status === "rest") {
      rest = rest.subtract(1, "second")
    }
  }

  const dispTime = (t: duration.Duration) => {
    if (t.get("hours") === 0) {
      return t.format("mm분 ss초")
    } else {
      return t.format("HH시간 mm분 ss초")
    }
  }

  const handleClick = () => {
    if (status === "") {
      timer.postMessage("start")
      status = "rest"
    } else if (status === "work") {
      timer.postMessage("restart")
      status = "rest"
    } else {
      timer.postMessage("restart")
      status = "work"
    }
  }
</script>

<main>
  <h1 class={`title ${status}`}>{text[status].title}</h1>
  <p class={status === "work" ? "active" : ""}>공부 시간: {dispTime(work)}</p>
  <p class={status === "rest" ? "active" : ""}>휴식 시간: {dispTime(rest)}</p>
  <button class={`btn ${status}`} on:click={handleClick}>
    {text[status].btn}
  </button>
  <footer>© 2022 <a href="https://github.com/hatoba29">hatoba29</a></footer>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    &.work {
      color: #e06c75;
    }

    &.rest {
      color: #61afef;
    }
  }

  p {
    color: #626d80;
    font-size: 22px;
    font-weight: bold;

    &.active {
      color: #dcdfe4;
    }
  }

  .btn {
    width: 280px;
    height: 60px;
    margin-top: 22px;
    border: none;
    cursor: pointer;

    background-color: #e06c75;
    color: white;
    font-size: 22px;
    font-weight: bold;

    &.work {
      background-color: #61afef;
    }
    &.rest {
      background-color: #e06c75;
    }
  }

  footer {
    margin-top: 16px;
    color: #626d80;

    a {
      color: #98c379;
    }
  }
</style>
