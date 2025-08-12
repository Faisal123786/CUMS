"use client";
import InputField from "@/app/components/UI/InputField";
import React, { useEffect, useState } from "react";
import { GiVillage } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { FaRegEye, FaRegSave } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getAllEmployee } from "@/app/services/employeeService";

const defaultColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Staff Name" },
  { key: "role", label: "Role" },
  { key: "email", label: "Username" },
  { key: "password", label: "Password" },
  { key: "actions", label: "Actions" },
];

function Page() {
  const [employees, setEmployees] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});
  const [editedData, setEditedData] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(
    defaultColumns.map((col) => col.key)
  );
  const [columnOrder, setColumnOrder] = useState(defaultColumns);
  const [showColumnControls, setShowColumnControls] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();
    const name = employee?.name?.toLowerCase() || "";
    const role = employee?.role?.toLowerCase() || "";
    const email = employee?.email?.toLowerCase() || "";
    const idStr = employee?.id ? employee.id.toString() : "";
    return (
      name.includes(search) ||
      role.includes(search) ||
      email.includes(search) ||
      idStr.includes(search)
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const resp = await getAllEmployee();
        const data = resp?.data;
        console.log(data);
        setEmployees(data || []);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchAllEmployees();
  }, []);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleInputChange = (id, key, value) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  };

  const handleSave = (id) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, ...editedData[id] } : emp
    );
    setEmployees(updated);
    setEditedData((prev) => {
      const { [id]: removed, ...rest } = prev;
      return rest;
    });
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(columnOrder);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setColumnOrder(reordered);
  };

  return (
    <div className="p-4">
      <div>
        <h2 className=" font-bold text-2xl text-text">Manage Employees</h2>
        <p>Here you can manage all employee credentials.</p>
      </div>

      <div>
        <div className="mt-3 w-full">
          <div className=" rounded-lg py-4 bg-white relative">
            <InputField
              name="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 border border-text px-2"
              placeholder="Search Employee"
              label="Search Employee*"
              labelClassName="text-white bg-background"
            />
            <div className="flex justify-between mb-4 flex-wrap gap-4">
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Drag to Reorder Columns
                </label>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="columns" direction="horizontal">
                    {(provided) => (
                      <div
                        className="flex flex-wrap gap-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {columnOrder.map((col, index) => (
                          <Draggable
                            key={String(col.key)}
                            draggableId={String(col.key)}
                            index={index}
                          >
                            {(provided) => (
                              <span
                                className="px-3 py-1 bg-background/20 text-sm rounded cursor-move"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {col.label}
                              </span>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>

              <div className="self-end">
                <button
                  onClick={() => setShowColumnControls((prev) => !prev)}
                  className="text-sm font-semibold underline text-text"
                >
                  {showColumnControls ? "Hide Columns ▲" : "Show Columns ▼"}
                </button>
              </div>
            </div>

            {showColumnControls && (
              <div className="absolute right-4 top-16 z-50 w-[250px] bg-white border shadow-lg rounded-md p-3">
                <h3 className="font-semibold text-sm mb-2">Toggle Columns</h3>
                <div className="space-y-2 max-h-[300px] overflow-auto">
                  {defaultColumns.map((col) => (
                    <label
                      key={col.key}
                      className="flex justify-between items-center text-sm"
                    >
                      {col.label}
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(col.key)}
                        onChange={() => handleToggleColumn(col.key)}
                        className="w-4 h-4 accent-text"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="relative overflow-x-auto mt-6">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                  <tr>
                    {columnOrder
                      .filter((col) => visibleColumns.includes(col.key))
                      .map((col) => (
                        <th
                          key={col.key}
                          className="px-6 py-3 whitespace-nowrap"
                        >
                          {col.label}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.length > 0 ? (
                    currentEmployees.map((employee) => (
                      <tr key={employee.id} className="bg-white border-b">
                        {columnOrder.map((col) => {
                          if (!visibleColumns.includes(col.key)) return null;
                          switch (col.key) {
                            case "id":
                              return (
                                <td key="id" className="px-6 py-4">
                                  {employee.id}
                                </td>
                              );
                            case "name":
                              return (
                                <td
                                  key="name"
                                  className="px-6 py-4 font-semibold"
                                >
                                  {employee.name}
                                </td>
                              );
                            case "role":
                              return (
                                <td key="role" className="px-6 py-4">
                                  {employee.role}
                                </td>
                              );
                            case "email":
                              return (
                                <td key="email" className="px-6 py-4">
                                  <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                                    <MdOutlineMailOutline className="text-text" />
                                    <input
                                      type="text"
                                      value={
                                        editedData[employee.id]?.email ??
                                        employee.email
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          employee.id,
                                          "email",
                                          e.target.value
                                        )
                                      }
                                      className="outline-none bg-transparent w-full"
                                    />
                                  </div>
                                </td>
                              );
                            case "password":
                              return (
                                <td key="password" className="px-6 py-4">
                                  <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                                    <BiSolidLockAlt className="text-text" />
                                    <input
                                      type={
                                        showPasswords[employee.id]
                                          ? "text"
                                          : "password"
                                      }
                                      value={
                                        editedData[employee.id]?.password ??
                                        employee.password
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          employee.id,
                                          "password",
                                          e.target.value
                                        )
                                      }
                                      className="outline-none bg-transparent w-full"
                                    />
                                    <FaRegEye
                                      className="cursor-pointer"
                                      onClick={() =>
                                        togglePasswordVisibility(employee.id)
                                      }
                                    />
                                  </div>
                                </td>
                              );
                            case "actions":
                              return (
                                <td
                                  key="actions"
                                  className="px-6 py-4 flex gap-3"
                                >
                                  <FaRegSave
                                    className="text-gray-700 cursor-pointer"
                                    title="Save"
                                    onClick={() => handleSave(employee.id)}
                                  />
                                  <FiSend
                                    className="text-gray-700 cursor-pointer"
                                    title="Send"
                                    onClick={() => alert("Send clicked")}
                                  />
                                </td>
                              );
                            default:
                              return null;
                          }
                        })}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={visibleColumns.length}
                        className="text-center py-6 text-gray-400"
                      >
                        No record found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-2">
                <p className="text-sm text-gray-500">
                  Showing {employees.length === 0 ? 0 : startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredEmployees.length)} of{" "}
                  {filteredEmployees.length} entries
                </p>
                <div className="flex gap-2 items-center">
                  <button
                    className={`text-sm ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600"
                    }`}
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 bg-text text-white text-sm rounded">
                    {currentPage}
                  </span>
                  <button
                    className={`text-sm ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600"
                    }`}
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
