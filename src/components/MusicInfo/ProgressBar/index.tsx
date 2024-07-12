import classNames from 'classnames';
import './progress-bar.scss';

const ProgressBar = ({
  progress,
  duration,
}: {
  progress: number;
  duration: number;
}) => {
  return (
    <div className={classNames('progress-bar')}>
      <div
        className={classNames('filt')}
        style={{ width: `${Math.round((progress / duration) * 100)}%` }}
      >
        <span
          role="progressbar"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round((progress / duration) * 100)}
        ></span>
      </div>
    </div>
  );
};

export default ProgressBar;
