import numeral = require("numeral");
import * as React from "react";
import { MdCropSquare } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import Button from "../component/Button";
import { ITask } from "../domain/task";
import * as notification from "../infra/notification";
import * as tasks from "../state/tasks";
import * as timer from "../state/timer";

import "./style/Timer.css";

const workSeconds = 25 * 60;
const restSeconds = 5 * 60;

const TimerButton = styled(Button)`
  padding: 0.5em 2em;

  > svg {
    font-size: 2.5em;
  }
`;

interface IProps
  extends Partial<tasks.IActionCreators & timer.IActionCreators> {
  currentTask: ITask;
}

interface IState {
  rest: boolean;
  seconds: number;
}

@connect(
  null,
  { ...tasks.actionCreators, ...timer.actionCreators }
)
export default class extends React.Component<IProps, IState> {
  public state: IState = { rest: false, seconds: workSeconds };
  private timer: NodeJS.Timer;

  public componentDidMount() {
    this.timer = setInterval(
      () => this.setState({ seconds: Math.max(this.state.seconds - 1, 0) }),
      1000
    );
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public componentDidUpdate(_, { seconds }: IState) {
    if (seconds !== 0 && this.state.seconds === 0) {
      this.props.playAlarm();
      notification.notify(
        this.state.rest ? "Break finished." : "1 pomodoro finished."
      );

      if (!this.state.rest) {
        this.saveSpentTime();
        this.setState({ rest: true, seconds: restSeconds });
      }
    }
  }

  public render() {
    const { rest, seconds } = this.state;

    return (
      <div className="Timer" data-rest={rest}>
        <div className="time" data-rest={rest}>
          <div className="minutes">{Math.floor(seconds / 60)}</div>
          <div className="seconds">{numeral(seconds % 60).format("00")}</div>
        </div>
        <TimerButton
          onClick={() => {
            if (!rest) {
              this.saveSpentTime();
            }

            this.props.toggleTimer();
          }}
        >
          <MdCropSquare />
        </TimerButton>
      </div>
    );
  }

  private saveSpentTime = () => {
    const { currentTask, modifyTask } = this.props;

    modifyTask({
      ...currentTask,
      spentSeconds: currentTask.spentSeconds + workSeconds - this.state.seconds
    });
  };
}
