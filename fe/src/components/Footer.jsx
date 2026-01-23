import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 Great! You've completed {completedTasksCount} task{completedTasksCount !== 1 ? 's' : ''}
                {activeTasksCount > 0 &&
                  `, only ${activeTasksCount} more to go. Keep it up!`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Start working on {activeTasksCount} task{activeTasksCount !== 1 ? 's' : ''}!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;