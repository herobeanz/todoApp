import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success(`Task ${task.title} deleted successfully`);
      handleTaskChanged();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  const updateTask = async () => {
    if (!updateTaskTitle.trim()) {
      toast.error('Task title is required');
      setUpdateTaskTitle(task.title || "");
      setIsEditting(false);
      return;
    }

    if (updateTaskTitle.trim() === task.title) {
      setIsEditting(false);
      return;
    }

    try {
      await api.put(`/tasks/${task._id}`, { title: updateTaskTitle.trim() });
      toast.success(`Task updated successfully`);
      handleTaskChanged();
      setIsEditting(false);
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Error updating task');
      setUpdateTaskTitle(task.title || "");
      setIsEditting(false);
    }
  };

  const handleEdit = () => {
    setIsEditting(true);
    setUpdateTaskTitle(task.title || "");
  };

  const handleCancel = () => {
    setIsEditting(false);
    setUpdateTaskTitle(task.title || "");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      updateTask();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const toggleTaskComplete = async () => {
    const newStatus = task.status === "completed" ? "active" : "completed";
    const completedAt = newStatus === "completed" ? new Date().toISOString() : null;

    try {
      await api.put(`/tasks/${task._id}`, { 
        status: newStatus,
        completedAt: completedAt
      });
      toast.success(
        newStatus === "completed" 
          ? `Task "${task.title}" marked as completed` 
          : `Task "${task.title}" marked as active`
      );
      handleTaskChanged();
    } catch (error) {
      console.error('Error toggling task status:', error);
      toast.error('Error updating task status');
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex gap-4 items-center">
        {/* Circle button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskComplete}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* Display or edit title */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="What needs to be done?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={updateTask}
              autoFocus
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          {/* Created date & completed date */}
          <div className="flex gap-2 items-center mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Edit and delete buttons */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* Edit button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={handleEdit}
            disabled={isEditting}
          >
            <SquarePen className="size-4" />
          </Button>

          {/* Delete button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={deleteTask}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard