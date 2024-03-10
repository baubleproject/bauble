import { Badge, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Task } from "@prisma/client";
import React from "react";

interface CalendarPageProps {
  tasks: Task[];
}

const getListData = (value: Dayjs, tasks: Task[]) => {
  let listData = tasks
    .filter(
      (task) =>
        dayjs(task.start).isSame(value, "day") ||
        dayjs(task.end).isSame(value, "day")
    )
    .map((task) => ({
      type: task.priority, // assuming priority can be 'warning', 'success', etc.
      content: `${task.name}`,
    }));

  return listData || [];
};

const getMonthData = (value: Dayjs, tasks: Task[]) => {
  let monthData = tasks.filter(
    (task) =>
      dayjs(task.start).isSame(value, "month") ||
      dayjs(task.end).isSame(value, "month")
  ).length;

  return monthData || 0;
};

const CalenderPage = ({ tasks }: CalendarPageProps) => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value, tasks);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        {/*  <span>Backlog number</span> */}
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value, tasks);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              status={
                item.type as
                  | "success"
                  | "error"
                  | "default"
                  | "processing"
                  | "warning"
              }
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default CalenderPage;
