import {  Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import {  TaskStatus } from "@prisma/client";
import React from "react";
import { truncateText } from "@/lib/utils";
import { statusMap } from "@/components/tables/TaskTables/columns";
import { useModal as ModalStore } from "@/hooks/useModalStore";
import { TaskType } from "@/actions/getTaskById";
import useTaskStore from "@/store/TaskState";

const getListData = (value: Dayjs, tasks: TaskType[]) => {
    let listData = tasks
        .filter(
            (task) =>
                dayjs(task?.start).isSame(value, "day") ||
                dayjs(task?.end).isSame(value, "day")
        )
        .map((task) => ({
            type: task?.status, // assuming priority can be 'warning', 'success', etc.
            content: `${task?.name}`,
            id: task?.id
        }));

    return listData || [];
};

const getMonthData = (value: Dayjs, tasks: TaskType[]) => {
    let monthData = tasks.filter(
        (task) =>
            dayjs(task?.start).isSame(value, "month") ||
            dayjs(task?.end).isSame(value, "month")
    ).length;

    return monthData || 0;
};

const CalenderPage = () => {

    const { tasks } = useTaskStore()

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
        //@eslint-disable-next-line
        const { onOpen } = ModalStore() //NOTE: changed the name for useModal to ModalStore, because of eslint react hook rules.
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <div onClick={() => onOpen("taskDetails", { taskId: item.id })} key={index} className={`my-1.5 py-0.5 px-3 rounded-sm ${statusMap[item.type as TaskStatus].color} w-10/12 mx-auto text-white font-light flex items-center justify-center gap-1`}>
                        <p className="text-xs">
                            {truncateText(item.content, 25)}
                        </p>
                    </div>
                ))}
            </ul>
        );
    };
    const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
        if (info.type === "date") return dateCellRender(current);
        if (info.type === "month") return monthCellRender(current);
        return info.originNode;
    };

    return <section className="md:w-[97%] mx-auto">
        <Calendar cellRender={cellRender} />
    </section>
};

export default CalenderPage;
