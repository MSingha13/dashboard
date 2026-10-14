import React from 'react';
import { Task } from '../types';

interface AssigneeBarChartProps {
  tasks: Task[];
  onSelectAssignee?: (name: string) => void;
}

export const AssigneeBarChart: React.FC<AssigneeBarChartProps> = ({
  tasks,
  onSelectAssignee,
}) => {
  const assignees = [
    { name: 'นาย A', color: '#2563EB', defaultCount: 18 },
    { name: 'นาย B', color: '#16A34A', defaultCount: 24 },
    { name: 'นางสาว C', color: '#F59E0B', defaultCount: 16 },
    { name: 'นาย D', color: '#8B5CF6', defaultCount: 12 },
    { name: 'นางสาว E', color: '#14B8A6', defaultCount: 8 },
  ];

  const data = assignees.map((person) => {
    const userTasks = tasks.filter((t) => t.assignee === person.name);
    return {
      ...person,
      count: userTasks.length > 0 ? userTasks.length : person.defaultCount,
    };
  });

  const maxVal = 30; // matches reference chart max scale 30

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          งานแยกตามผู้รับผิดชอบ
        </h3>
        <span className="text-xs text-slate-400 font-medium">5 คน</span>
      </div>

      <div className="relative pt-4 pb-1 flex-1 flex flex-col justify-end">
        {/* Y-axis ticks line & labels */}
        <div className="absolute inset-x-0 inset-y-4 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-5 text-right">30</span>
            <div className="flex-1 border-b border-dashed border-slate-100" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 text-right">20</span>
            <div className="flex-1 border-b border-dashed border-slate-100" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 text-right">10</span>
            <div className="flex-1 border-b border-dashed border-slate-100" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 text-right">0</span>
            <div className="flex-1 border-b border-slate-200" />
          </div>
        </div>

        {/* Bars Container */}
        <div className="ml-7 grid grid-cols-5 gap-2 sm:gap-3 items-end h-40 pt-4 z-10">
          {data.map((item, idx) => {
            const heightPercent = Math.min(100, (item.count / maxVal) * 100);
            return (
              <div
                key={idx}
                onClick={() => onSelectAssignee?.(item.name)}
                className="flex flex-col items-center justify-end h-full group cursor-pointer"
              >
                {/* Count number label above bar */}
                <span className="text-xs font-mono font-semibold text-slate-700 mb-1 group-hover:text-slate-900 transition-colors">
                  {item.count}
                </span>

                {/* Vertical Bar */}
                <div className="w-full max-w-[36px] bg-slate-100 rounded-t-md overflow-hidden flex items-end h-full">
                  <div
                    className="w-full rounded-t-md transition-all duration-500 group-hover:brightness-95"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                {/* Assignee Name below bar */}
                <span className="text-[11px] font-medium text-slate-600 mt-2 truncate w-full text-center group-hover:text-slate-900 transition-colors">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
