const ProgressBar = ({
  progress,
  duration,
}: {
  progress: number;
  duration: number;
}) => {
  return (
    <div
      className={
        'h-2 w-[60%] shadow-(--shadow-basic) bg-(--grey-700) rounded-md mx-0 my-4'
      }
    >
      <div
        className={
          'h-full bg-(--grey-200) rounded-md text-right transition-[width 1s ease-in-out]'
        }
        style={{ width: `${Math.round((progress / duration) * 100)}%` }}
      >
        <span
          role="progressbar"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round((progress / duration) * 100)}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
