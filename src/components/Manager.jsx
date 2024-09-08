import React, { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaEdit, FaCopy, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editId, setEditId] = useState(null); // track which password is being edited
  const [visiblePasswords, setVisiblePasswords] = useState({}); // track visibility of each password

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.jpg";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      if (editId) {
        // Update the password array with the edited values
        const updatedPasswords = passwordArray.map((item) =>
          item.id === editId ? { ...item, ...form } : item
        );
        setPasswordArray(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        setEditId(null); // Reset edit mode after saving
      } else {
        // Add a new password
        const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
        setPasswordArray(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      }
      setForm({ site: "", username: "", password: "" });
    } else {
      toast(`Username, Password not saved!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const deletePassword = (id) => {
    let c = confirm("Do You want to delete this password?");
    if (c) {
      const updatedPasswords = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      toast(`Password deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast(`${label} copied to clipboard!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm(passwordToEdit);
    setEditId(id); // Set the id to identify which password is being edited
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[90px]"></div>
      </div>
      <div className="p-4 md:p-8 lg:p-16 xl:p-24 mx-auto max-w-screen-lg">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Bhool
          <span className="text-green-700">JAO/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager!
        </p>
        <div className="text-black flex flex-col p-4 gap-6 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full md:w-1/2">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eye.jpg"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex gap-2 justify-center items-center bg-green-600 rounded-full px-4 py-2 hover:bg-green-500 w-fit border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/khheayfj.json"
              trigger="hover"
              colors="primary:#000000,secondary:#000000"
            ></lord-icon>
            {editId ? "Save Changes" : "Add Password"} {/* Dynamic label */}
          </button>
        </div>
        <div className="passwords mt-8">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full rounded-md overflow-hidden">
                <thead className=" bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {item.site}
                          </a>
                          <FaCopy
                            className="cursor-pointer text-gray-500 hover:text-blue-600"
                            onClick={() =>
                              copyToClipboard(item.site, "Site link")
                            }
                            title="Copy site link"
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex items-center justify-center gap-2">
                          {item.username}
                          <FaCopy
                            className="cursor-pointer text-gray-500 hover:text-blue-600"
                            onClick={() =>
                              copyToClipboard(item.username, "Username")
                            }
                            title="Copy Username"
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex items-center justify-center gap-2">
                          {visiblePasswords[item.id]
                            ? item.password
                            : "••••••••"}
                          <button
                            onClick={() => togglePasswordVisibility(item.id)}
                            className="text-gray-500 hover:text-blue-600"
                          >
                            {visiblePasswords[item.id] ? (
                              <FaEyeSlash />
                            ) : (
                              <FaEye />
                            )}
                          </button>
                          <FaCopy
                            className="cursor-pointer text-gray-500 hover:text-blue-600"
                            onClick={() =>
                              copyToClipboard(item.password, "Password")
                            }
                            title="Copy Password"
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex gap-2 justify-center items-center">
                          <button
                            onClick={() => editPassword(item.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEdit size={20} />
                          </button>
                          <button
                            onClick={() => deletePassword(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
