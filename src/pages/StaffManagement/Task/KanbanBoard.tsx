import {
  CalendarOutlined,
  CheckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge, Button } from "antd";

import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";

import React, { useMemo, useState } from "react";
import { PlusIcon } from "~/icons";
import { Task } from "~/type";
// SVG icon for GripVertical replacement
const GripVerticalSVG = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

interface KanbanBoardProps {
  tasks: (Task & { assignedToName?: string })[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onTaskReorder?: (
    taskId: string,
    newIndex: number,
    columnId: Task["status"]
  ) => void;
}

interface DragData {
  type: "task";
  task: Task & { assignedToName?: string };
}

const columns: { id: Task["status"]; title: string; color: string }[] = [
  { id: "New", title: "New", color: "bg-blue-50 border-blue-200" },
  {
    id: "In Progress",
    title: "In Progress",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: "Completed",
    title: "Completed",
    color: "bg-green-50 border-green-200",
  },
];

// Sortable Task Card Component
const SortableTaskCard: React.FC<{
  task: Task & { assignedToName?: string };
  isSelected: boolean;
  onSelect: (taskId: string, isMultiSelect: boolean) => void;
  selectedCount: number;
}> = ({ task, isSelected, onSelect, selectedCount }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    } as DragData,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      onSelect(task.id, true);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative bg-white rounded-lg border border-gray-200 p-4 shadow-sm
        hover:shadow-md transition-all duration-200 ease-out cursor-pointer
        ${isDragging ? "opacity-50" : ""}
        ${isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""}
      `}
      onClick={handleCardClick}
      role="listitem"
      aria-grabbed={isDragging}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onSelect(task.id, e.ctrlKey || e.metaKey);
        }
      }}
    >
      {/* Multi-select indicator */}
      {selectedCount > 1 && isSelected && (
        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
          {selectedCount}
        </div>
      )}

      {/* Selection checkbox */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(task.id, false);
          }}
          className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-blue-500"
          aria-label="Select task"
        >
          {isSelected && <CheckOutlined className="w-3 h-3 text-blue-600" />}
        </button>
      </div>

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
        aria-label="Drag to reorder"
      >
        <GripVerticalSVG />
      </div>

      <div className="pr-8">
        <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
          {task.title}
        </h4>

        <p className="text-xs text-gray-600 mb-3 line-clamp-3">
          {task.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-500">
            <UserOutlined className="w-3 h-3 mr-1" />
            <span className="truncate">{task.assignedToName}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs">
              <CalendarOutlined className="w-3 h-3 mr-1 text-gray-400" />
              <Badge>{moment(new Date(task.dueDate)).format("MMM dd")}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Drag Overlay Component
const TaskDragOverlay: React.FC<{
  task: Task & { assignedToName?: string };
  selectedCount: number;
}> = ({ task, selectedCount }) => {
  return (
    <div className="bg-white rounded-lg border-2 border-blue-300 p-4 shadow-2xl transform rotate-3 scale-105 opacity-95">
      {selectedCount > 1 && (
        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
          {selectedCount}
        </div>
      )}

      <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
        {selectedCount > 1 ? `${selectedCount} tasks selected` : task.title}
      </h4>

      {selectedCount === 1 && (
        <>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center text-xs text-gray-500">
              <UserOutlined className="w-3 h-3 mr-1" />
              <span className="truncate">{task.assignedToName}</span>
            </div>

            <div className="flex items-center text-xs">
              <CalendarOutlined className="w-3 h-3 mr-1 text-gray-400" />
              <Badge>{moment(new Date(task.dueDate)).format("MMM dd")}</Badge>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Droppable Column Component
const DroppableColumn: React.FC<{
  column: (typeof columns)[0];
  tasks: (Task & { assignedToName?: string })[];
  selectedTasks: Set<string>;
  onSelectTask: (taskId: string, isMultiSelect: boolean) => void;
  onAddTask: (columnId: Task["status"]) => void;
}> = ({ column, tasks, selectedTasks, onSelectTask, onAddTask }) => {
  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { isOver, setNodeRef: setDroppableRef } = useDroppable({
    id: `column-${column.id}`,
    data: {
      type: "column",
      status: column.id,
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`
        bg-white rounded-xl border-2 overflow-hidden transition-all duration-200
        ${column.color}
        ${isOver ? "ring-2 ring-blue-400 ring-opacity-50 bg-blue-50" : ""}
      `}
      role="list"
      aria-label={`${column.title} tasks`}
    >
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{column.title}</h3>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Quick Add Button */}
      <div className="px-4 pt-4">
        <Button
          //   variant="ghost"
          //   size="sm"
          onClick={() => onAddTask(column.id)}
          className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          //   leftIcon={<Plus className="w-4 h-4" />}
        >
          Add task
        </Button>
      </div>

      {/* Tasks */}
      <div ref={setDroppableRef} className="p-4 pt-2 min-h-[400px]">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map((task) => (
              <SortableTaskCard
                key={task.id}
                task={task}
                isSelected={selectedTasks.has(task.id)}
                onSelect={onSelectTask}
                selectedCount={selectedTasks.size}
              />
            ))}
          </div>
        </SortableContext>

        {/* Empty state */}
        {tasks.length === 0 && (
          <div
            className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
            ${
              isOver
                ? "border-blue-400 bg-blue-50 text-blue-600"
                : "border-gray-200 text-gray-500"
            }
          `}
          >
            <PlusIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              {isOver ? "Drop tasks here" : "Drop tasks here or add a new one"}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onStatusChange,
  onTaskReorder,
}) => {
  const [activeTask, setActiveTask] = useState<
    (Task & { assignedToName?: string }) | null
  >(null);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleSelectTask = (taskId: string, isMultiSelect: boolean) => {
    setSelectedTasks((prev) => {
      const newSelected = new Set(prev);

      if (isMultiSelect) {
        if (newSelected.has(taskId)) {
          newSelected.delete(taskId);
        } else {
          newSelected.add(taskId);
        }
      } else {
        if (newSelected.has(taskId) && newSelected.size === 1) {
          newSelected.clear();
        } else {
          newSelected.clear();
          newSelected.add(taskId);
        }
      }

      return newSelected;
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);

      // If dragging a task that's not selected, select it
      if (!selectedTasks.has(task.id)) {
        setSelectedTasks(new Set([task.id]));
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);

    // Handle dropping on column (empty area)
    if (over.data.current?.type === "column") {
      const newStatus = over.data.current.status as Task["status"];
      if (activeTask && activeTask.status !== newStatus) {
        onStatusChange(activeTask.id, newStatus);
      }
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    // Moving between columns
    if (overTask && activeTask.status !== overTask.status) {
      onStatusChange(activeTask.id, overTask.status);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);

    // Handle dropping on column (empty area)
    if (over.data.current?.type === "column") {
      const newStatus = over.data.current.status as Task["status"];
      if (activeTask && activeTask.status !== newStatus) {
        onStatusChange(activeTask.id, newStatus);
      }
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask || !overTask) return;

    // Handle reordering within the same column
    if (activeTask.status === overTask.status && onTaskReorder) {
      const columnTasks = getTasksByStatus(activeTask.status);
      const activeIndex = columnTasks.findIndex((t) => t.id === activeId);
      const overIndex = columnTasks.findIndex((t) => t.id === overId);

      if (activeIndex !== overIndex) {
        onTaskReorder(activeTask.id, overIndex, activeTask.status);
      }
    }
  };

  const handleAddTask = (columnId: Task["status"]) => {
    // This would typically open a modal or form to create a new task
    console.log("Add task to column:", columnId);
  };

  // Clear selection when clicking outside
  const handleBoardClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedTasks(new Set());
    }
  };

  return (
    <div
      className="w-full overflow-x-auto pb-4"
      onClick={handleBoardClick}
      role="application"
      aria-label="Kanban board"
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[800px]">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);

            return (
              <DroppableColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                selectedTasks={selectedTasks}
                onSelectTask={handleSelectTask}
                onAddTask={handleAddTask}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeTask && (
            <TaskDragOverlay
              task={activeTask}
              selectedCount={selectedTasks.size}
            />
          )}
        </DragOverlay>
      </DndContext>

      {/* Selection info */}
      <AnimatePresence>
        {selectedTasks.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">
                {selectedTasks.size} task{selectedTasks.size > 1 ? "s" : ""}{" "}
                selected
              </span>
              <button
                onClick={() => setSelectedTasks(new Set())}
                className="text-blue-200 hover:text-white text-sm"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KanbanBoard;
